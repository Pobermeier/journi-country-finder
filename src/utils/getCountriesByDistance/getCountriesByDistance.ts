import type Country from "models/country";
import getDistance from "utils/getDistance";

const getCountriesByDistanceToUser = (countries: Country[], userLat: number, userLng: number) => {
  return [...countries].sort((country1, country2) => {
    const country1Distance = getDistance(userLat, userLng, country1.lat, country1.lng);
    const country2Distance = getDistance(userLat, userLng, country2.lat, country2.lng);

    return country1Distance - country2Distance;
  });
};

export default getCountriesByDistanceToUser;
