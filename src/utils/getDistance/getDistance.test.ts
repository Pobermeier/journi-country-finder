import getDistance from "./getDistance";

describe("getDistance", () => {
  // Vienna
  const testLat1 = 48.210033;
  const testLng1 = 16.363449;
  // Italy
  const testLat2 = 41.87194;
  const testLng2 = 12.5674;
  // Australia
  const testLat3 = -31.21759246133962;
  const testLng3 = 151.1243932822211;

  it("returns 0 if the latitude/longitude of two locations is identical", () => {
    const expectedDistance = 0;

    expect(getDistance(testLat1, testLng1, testLat1, testLng1)).toBe(expectedDistance);
  });

  it("returns correct distance if the latitude/longitude of two locations is different", () => {
    // Expected distance between Vienna and Italy
    const expectedDistance1 = 765.0288354944954;
    // Expected distance between Vienna and Australia
    const expectedDistance2 = 15786.832538988703;

    expect(getDistance(testLat1, testLng1, testLat2, testLng2)).toBe(expectedDistance1);
    expect(getDistance(testLat1, testLng1, testLat3, testLng3)).toBe(expectedDistance2);
  });
});
