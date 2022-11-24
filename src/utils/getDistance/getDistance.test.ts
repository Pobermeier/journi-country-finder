import getDistance from "./getDistance";

describe("getDistance", () => {
  const testLat1 = 48.210033;
  const testLng1 = 16.363449;
  const testLat2 = 60.30516811641584;
  const testLng2 = 15.439302452417918;
  const testLat3 = -31.21759246133962;
  const testLng3 = 151.1243932822211;

  it("returns 0 if the latitude/longitude of two locations is identical", () => {
    const expectedDistance = 0;

    expect(getDistance(testLat1, testLng1, testLat1, testLng1)).toBe(expectedDistance);
  });

  it("returns correct distance if the latitude/longitude of two locations is different", () => {
    const expectedDistance1 = 1346.2226737000303;
    const expectedDistance2 = 15786.832538988703;

    expect(getDistance(testLat1, testLng1, testLat2, testLng2)).toBe(expectedDistance1);
    expect(getDistance(testLat1, testLng1, testLat3, testLng3)).toBe(expectedDistance2);
  });
});
