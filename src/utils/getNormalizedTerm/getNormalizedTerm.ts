/**
 * Returns a normalized version of a string by trimming any leading or trailing whitespace,
 * making it lowercase and optionally cropping it to a specified character count.
 * @param term a string that needs to be normalized
 * @returns normalized version of the provided string
 */
const getNormalizedTerm = (term: string, maxChars?: number) =>
  term
    ?.toLowerCase()
    .trim()
    .slice(0, maxChars ?? term.length);

export default getNormalizedTerm;
