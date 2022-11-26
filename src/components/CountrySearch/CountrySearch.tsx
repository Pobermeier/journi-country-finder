import { useMemo, useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { type CountryClient } from "models/country";
import SuggestionList from "components/SuggestionList";
import { getCountriesBySearchTerm } from "services/countries";

const QUERY_DEBOUNCE_MS = 300;
const FALLBACK_LAT = 48.2;
const FALLBACK_LNG = 16.3667;

const CountrySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryClient | null>(null);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      getCountriesBySearchTerm({ lat: FALLBACK_LAT, lng: FALLBACK_LNG, term: searchTerm }),
    enabled: false,
    initialData: () => ({ success: false, data: [] }),
  });

  const debounceGetCountries = useMemo(
    () =>
      debounce(() => {
        refetch();
        setIsDebouncing(false);
      }, QUERY_DEBOUNCE_MS),
    [refetch],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    setIsDebouncing(true);
    debounceGetCountries();
    setIsSuggestionsOpen(true);
  };

  const isDropdownRendered =
    !!searchTerm &&
    data.success &&
    data.data.length > 0 &&
    isSuggestionsOpen &&
    !isDebouncing &&
    !isFetching;

  return (
    <>
      <Combobox as="div" value={selectedCountry} onChange={setSelectedCountry}>
        <Combobox.Label className="block text-sm font-medium text-gray-700">
          Choose Country
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={handleChange}
            placeholder="Enter country name..."
            displayValue={(country: CountryClient) => country?.name}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>
          {isDropdownRendered && <SuggestionList suggestions={data.data as CountryClient[]} />}
        </div>
      </Combobox>
      {selectedCountry && <div>Selected Country: {selectedCountry.name}</div>}
    </>
  );
};

export default CountrySearch;
