// Server-side postcode geocoding via postcodes.io (free, no key).

const POSTCODES_IO = 'https://api.postcodes.io';

const first = (value) => (Array.isArray(value) ? value[0] : value);

/**
 * @param {{ kind: 'full' | 'outcode', outcode: string, normalized: string }} parsed
 * @returns {Promise<
 *   | { ok: true, lat: number, lng: number, district: string | null, region: string | null, approximate: boolean }
 *   | { ok: false, reason: 'not_found' | 'timeout' | 'unavailable' }
 * >}
 */
export const lookupPostcode = async (parsed, { timeoutMs = 6000, fetchImpl = globalThis.fetch } = {}) => {
  const path =
    parsed.kind === 'full'
      ? `/postcodes/${encodeURIComponent(parsed.normalized)}`
      : `/outcodes/${encodeURIComponent(parsed.outcode)}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(`${POSTCODES_IO}${path}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    if (response.status === 404) return { ok: false, reason: 'not_found' };
    if (!response.ok) return { ok: false, reason: 'unavailable' };

    const body = await response.json();
    const result = body?.result;
    if (!result || typeof result.latitude !== 'number' || typeof result.longitude !== 'number') {
      return { ok: false, reason: 'not_found' };
    }

    return {
      ok: true,
      lat: result.latitude,
      lng: result.longitude,
      district: first(result.admin_district) ?? null,
      region: result.region ?? first(result.country) ?? null,
      approximate: parsed.kind === 'outcode',
    };
  } catch (error) {
    return { ok: false, reason: error?.name === 'AbortError' ? 'timeout' : 'unavailable' };
  } finally {
    clearTimeout(timer);
  }
};
