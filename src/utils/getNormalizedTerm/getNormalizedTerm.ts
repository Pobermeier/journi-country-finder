// longest country name is 56 characters long
export const MAX_CHARS = 56;

const getNormalizedTerm = (term: string) => term?.toLowerCase().trim().slice(0, MAX_CHARS);

export default getNormalizedTerm;
