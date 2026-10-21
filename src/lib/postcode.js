// UK postcode parsing shared by the browser forms and the API routes.
// Relative imports only: this file is also loaded by plain Node in the tests.

const OUTCODE_PATTERN = /^[A-Z]{1,2}\d[A-Z\d]?$/;
const FULL_PATTERN = /^([A-Z]{1,2}\d[A-Z\d]?)(\d[A-Z]{2})$/;

/**
 * Normalises whitespace and case, and classifies the input.
 * Returns null when the input is not a plausible UK postcode.
 *   "gu11 3hy"  -> { kind: 'full',    outcode: 'GU11', normalized: 'GU11 3HY' }
 *   " gu11 "    -> { kind: 'outcode', outcode: 'GU11', normalized: 'GU11' }
 */
export const parsePostcode = (input) => {
  if (typeof input !== 'string') return null;

  const compact = input.toUpperCase().replace(/\s+/g, '');
  if (compact.length < 2 || compact.length > 7) return null;

  const full = FULL_PATTERN.exec(compact);
  if (full) {
    return { kind: 'full', outcode: full[1], incode: full[2], normalized: `${full[1]} ${full[2]}` };
  }

  if (OUTCODE_PATTERN.test(compact)) {
    return { kind: 'outcode', outcode: compact, normalized: compact };
  }

  return null;
};

export const isFullPostcode = (input) => parsePostcode(input)?.kind === 'full';
