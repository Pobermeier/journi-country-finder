const EARTH_RADIUS_METRES = 6371e3;

/**
 * This function uses the ‘haversine’ formula to calculate the great-circle distance between two points.
 * That is, the shortest distance over the earth’s surface – giving an ‘as-the-crow-flies’ distance between the points
 * https://en.wikipedia.org/wiki/Haversine_formula
 * @param lat1 latitude of location 1 in degrees
 * @param lng1 longitude of location 1 in degrees
 * @param lat2 latitude of location 2 in degrees
 * @param lng2 longitude of location 2 in degrees
 * @returns distance in kilometres
 */
const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  if (lat1 === lat2 && lng1 === lng2) return 0;

  // convert latitudes from degrees to radiants
  const radLat1 = (lat1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  // compute difference between latitudes & longitudes in radiants
  const diffRadLat = ((lat2 - lat1) * Math.PI) / 180;
  const diffRadLng = ((lng2 - lng1) * Math.PI) / 180;

  // compute square of half the chord length between the given points
  const halvedChordLengthSquared =
    Math.sin(diffRadLat / 2) * Math.sin(diffRadLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(diffRadLng / 2) * Math.sin(diffRadLng / 2);
  // compute angular distance in radians
  const angRadDistance =
    2 * Math.atan2(Math.sqrt(halvedChordLengthSquared), Math.sqrt(1 - halvedChordLengthSquared));

  const distanceInMetres = EARTH_RADIUS_METRES * angRadDistance;

  return distanceInMetres / 1000;
};

export default getDistance;
