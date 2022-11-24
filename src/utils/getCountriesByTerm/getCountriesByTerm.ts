import type Country from "models/country";

const getCountriesByTerm = (countries: Country[], term: string) => {
  return [...countries].filter((country) => country.name.toLowerCase().includes(term));
};

export default getCountriesByTerm;
