import { parsePostcode } from '../../../lib/postcode.js';
import { lookupPostcode } from '../../../lib/postcodeLookup.js';
import { assessCoverage, isListedDistrict, SERVICE_RADIUS_MILES } from '../../../lib/coverage.js';

export const dynamic = 'force-dynamic';

const CACHEABLE = 'public, s-maxage=3600, stale-while-revalidate=86400';
const NOT_CACHEABLE = 'no-store';

const respond = (body, status, cacheControl) =>
  Response.json(body, { status, headers: { 'Cache-Control': cacheControl } });

/**
 * GET /api/availability?postcode=GU11%203HY
 *
 * `status` is one of:
 *   invalid     - not a UK postcode (HTTP 400)
 *   unverified  - valid format but the postcode could not be located
 *   covered     - inside the service area. This is coverage only: whether a fitter is free is
 *                 confirmed by the team, and the response says so.
 *   outside     - located, but beyond the service area
 *   unavailable - the lookup service failed or timed out (HTTP 503)
 */
export async function GET(request) {
  const raw = new URL(request.url).searchParams.get('postcode') ?? '';
  const parsed = parsePostcode(raw);

  if (!parsed) {
    return respond(
      { status: 'invalid', message: 'Enter a valid UK postcode, for example GU11 3HY or GU11.' },
      400,
      NOT_CACHEABLE
    );
  }

  const base = { postcode: parsed.normalized, kind: parsed.kind, outcode: parsed.outcode };
  const lookup = await lookupPostcode(parsed);

  if (!lookup.ok && lookup.reason === 'not_found') {
    return respond(
      {
        ...base,
        status: 'unverified',
        message: "We couldn't locate that postcode. Check it for typos, or continue and give us your street address.",
      },
      200,
      CACHEABLE
    );
  }

  if (!lookup.ok) {
    // The lookup service is down. A district on our own operational list can still be answered.
    if (isListedDistrict(parsed.outcode)) {
      return respond(
        {
          ...base,
          status: 'covered',
          verifiedAgainst: 'district-list',
          message: `${parsed.outcode} is on our list of covered areas.`,
        },
        200,
        NOT_CACHEABLE
      );
    }
    return respond(
      {
        ...base,
        status: 'unavailable',
        reason: lookup.reason,
        message: 'Our postcode checker is temporarily unavailable.',
      },
      503,
      NOT_CACHEABLE
    );
  }

  const coverage = assessCoverage({ outcode: parsed.outcode, lat: lookup.lat, lng: lookup.lng });

  return respond(
    {
      ...base,
      status: coverage.status,
      approximate: lookup.approximate,
      coords: { lat: lookup.lat, lng: lookup.lng },
      distanceMiles: coverage.distanceMiles,
      serviceRadiusMiles: SERVICE_RADIUS_MILES,
      area: { district: lookup.district, region: lookup.region },
    },
    200,
    CACHEABLE
  );
}
