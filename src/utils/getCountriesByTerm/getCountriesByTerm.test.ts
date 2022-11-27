import { type Country } from "models/country";
import getCountriesByTerm from "./getCountriesByTerm";
import countries from "db/countries-metadata.json";
import expectedCountries from "./getCountriesByTerm.mock.json";

const testCountries = countries as Country[];

describe("getCountriesByTerm", () => {
  it("returns correctly filtered countries", () => {
    const testTerm = "aust";

    expect(getCountriesByTerm(testCountries, testTerm)).toStrictEqual(expectedCountries);
  });
});
