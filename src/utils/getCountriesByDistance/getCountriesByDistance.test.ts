import getCountriesByDistanceToUser from "./getCountriesByDistance";
import countries from "db/countries-metadata.json";
import expectedCountries from "./getCountriesByDistance.mock.json";

describe("getCountriesByDistance", () => {
  it("returns correctly sorted countries", () => {
    // Vienna
    const testLat1 = 48.210033;
    const testLng1 = 16.363449;

    expect(getCountriesByDistanceToUser(countries, testLat1, testLng1)).toStrictEqual(
      expectedCountries,
    );
  });
});
