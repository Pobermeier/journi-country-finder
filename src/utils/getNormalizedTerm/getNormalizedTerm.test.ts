import getNormalizedTerm from "./getNormalizedTerm";

describe("getNormalizedTerm", () => {
  it("returns correctly normalized string", () => {
    const testTerm = "   ThisShouldBeMoreThanFiftySixCharactersToTestTrimming123456   ";
    const expectedTerm = "thisshouldbemorethanfiftysixcharacterstotesttrimming1234";

    expect(getNormalizedTerm(testTerm)).toBe(expectedTerm);
  });
});
