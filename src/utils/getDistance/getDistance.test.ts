import getDistance from "./getDistance";

describe("getDistance", () => {
  const testLat1 = 50.43285860555667;
  const testLat2 = 84.514421145024;
  const testLng1 = 22.524537743199165;
  const testLng2 = 22.267866580830002;

  it("returns 0 if the latitude/longitude of two locations is identical", () => {
    const expectedDistance = 0;

    expect(getDistance(testLat1, testLng1, testLat1, testLng1)).toBe(expectedDistance);
  });

  it("returns correct distance if the latitude/longitude of two locations is identical", () => {
    const expectedDistance = 3789.7037931019026;

    expect(getDistance(testLat1, testLng1, testLat2, testLng2)).toBe(expectedDistance);
  });
});
