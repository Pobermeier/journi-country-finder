import getNormalizedTerm from "./getNormalizedTerm";

describe("getNormalizedTerm", () => {
  it("returns correctly normalized string if maxTerm is NOT specified", () => {
    const testTerm = "   ThisShouldBeMoreThanFiftySixCharactersToTestTrimming123456   ";
    const expectedTerm = "thisshouldbemorethanfiftysixcharacterstotesttrimming123456";

    expect(getNormalizedTerm(testTerm)).toBe(expectedTerm);
  });

  it("returns correctly normalized string if maxTerm is specified", () => {
    const testTerm = "   ThisShouldBeMoreThanFiftySixCharactersToTestTrimming123456   ";
    const testMaxChars = 12;
    const expectedTerm = "thisshouldbe";

    expect(getNormalizedTerm(testTerm, testMaxChars)).toBe(expectedTerm);
  });
});
