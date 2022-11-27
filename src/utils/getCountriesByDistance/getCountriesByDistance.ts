import { type Country } from "models/country";
import getDistance from "utils/getDistance";

/**
 * Returns an array of countries sorted by distance to the user's position.
 * @param countries an array of countries
 * @param userLat the latitude of a user's location in degrees
 * @param userLng the longitude of a user's location in degrees
 * @returns an array of countries sorted by distance to the user's position ascending
 */
const getCountriesByDistanceToUser = (countries: Country[], userLat: number, userLng: number) => {
  return [...countries].sort((firstCountry, secondCountry) => {
    const firstCountryDistance = getDistance(userLat, userLng, firstCountry.lat, firstCountry.lng);
    const secondCountryDistance = getDistance(
      userLat,
      userLng,
      secondCountry.lat,
      secondCountry.lng,
    );

    return firstCountryDistance - secondCountryDistance;
  });
};

export default getCountriesByDistanceToUser;
