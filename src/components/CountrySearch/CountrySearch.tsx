import { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import { Combobox } from "@headlessui/react";
import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { type CountryClient } from "models/country";
import SuggestionList from "components/SuggestionList";
import { getCountriesBySearchTerm } from "services/countries";
import CountryDetails from "components/CountryDetails";

const QUERY_DEBOUNCE_MS = 300;
const FALLBACK_LAT = 48.2;
const FALLBACK_LNG = 16.3667;

const CountrySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryClient | null>(null);

  const { data, isFetching, refetch, isError, error } = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      getCountriesBySearchTerm({ lat: FALLBACK_LAT, lng: FALLBACK_LNG, term: searchTerm }),
    enabled: false,
    retry: false,
  });

  // debounce user input, so we do not hit the api on each keystroke
  const debounceGetCountries = useMemo(
    () =>
      debounce(() => {
        refetch();
        setIsDebouncing(false);
      }, QUERY_DEBOUNCE_MS),
    [refetch],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);

      setIsDebouncing(true);
      debounceGetCountries();
      setIsSuggestionsOpen(true);
    },
    [debounceGetCountries],
  );
  const isDropdownRendered =
    !!searchTerm &&
    data?.success &&
    data?.data.length > 0 &&
    isSuggestionsOpen &&
    !isDebouncing &&
    !isFetching;

  const resetSearch = () => {
    setSearchTerm("");
    setSelectedCountry(null);
  };

  return (
    <>
      <Combobox
        as="div"
        className="relative mt-1 w-full sm:w-80"
        value={selectedCountry}
        onChange={setSelectedCountry}
      >
        <Combobox.Input
          aria-label="Choose Country"
          autoComplete="off"
          className={clsx(
            "w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm",
            isError
              ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-sky-500 focus:ring-sky-500",
          )}
          onChange={handleChange}
          placeholder="Enter a country name..."
          displayValue={(country: CountryClient) => country?.name}
        />
        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
            onClick={resetSearch}
          >
            <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
        )}
        {isError && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
        {isDropdownRendered && <SuggestionList suggestions={data.data as CountryClient[]} />}
      </Combobox>
      {isError && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {(error as Error).message}
        </p>
      )}
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </>
  );
};

export default CountrySearch;
