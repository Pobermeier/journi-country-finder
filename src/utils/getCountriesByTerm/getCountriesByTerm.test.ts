import getCountriesByTerm from "./getCountriesByTerm";
import countries from "db/countries-metadata.json";
import expectedCountries from "./getCountriesByTerm.mock.json";

describe("getCountriesByTerm", () => {
  it("returns correctly filtered countries", () => {
    const testTerm = "aust";

    expect(getCountriesByTerm(countries, testTerm)).toStrictEqual(expectedCountries);
  });
});
