import { type CountryClient } from "models/country";

const getCountriesByTerm = (countries: CountryClient[], term: string) => {
  return [...countries].filter((country) => country.name.toLowerCase().includes(term));
};

export default getCountriesByTerm;
