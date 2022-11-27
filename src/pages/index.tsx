import { useState } from "react";
import { type Country } from "models/country";
import CountryDetails from "components/CountryDetails";
import CountrySearch from "components/CountrySearch";

const HomePage = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  return (
    <>
      <div className="mb-8 md:mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Country Finder
        </h2>
        <p className="mt-5 text-lg text-gray-500">
          Search and select a country to learn some interesting facts about it!
        </p>
      </div>

      <CountrySearch selectedCountry={selectedCountry} onCountrySelect={setSelectedCountry} />
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </>
  );
};

export default HomePage;
