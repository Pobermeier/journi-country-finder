import { type Country } from "models/country";

/**
 * Given an array of countries and a search term, this function returns an array of countries whose name start
 * with the provided search term
 * @param countries an array of countries
 * @param term a provided search term
 * @returns countries filtered by search term
 */
const getCountriesByTerm = (countries: Country[], term: string) => {
  return [...countries].filter((country) => country.name.toLowerCase().startsWith(term));
};

export default getCountriesByTerm;
