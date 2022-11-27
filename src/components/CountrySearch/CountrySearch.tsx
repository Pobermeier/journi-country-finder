import { useCallback, useMemo, useState } from "react";
import { Combobox } from "@headlessui/react";
import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import clsx from "clsx";
import { type Country } from "models/country";
import SuggestionList from "components/CountrySearch/components/SuggestionList";
import CountryDetails from "components/CountryDetails";
import Loading from "components/Loading";
import { getCountriesBySearchTerm, getUserPosition } from "services/countries";

const QUERY_DEBOUNCE_MS = 300;
// Fallback coordinates (Vienna)
const FALLBACK_LAT = 48.2;
const FALLBACK_LNG = 16.3667;

const CountrySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const { data: geoData } = useQuery({
    queryKey: ["location"],
    queryFn: getUserPosition,
    staleTime: Infinity,
    retry: false,
  });

  const {
    data: countriesData,
    isFetching,
    refetch: fetchCountries,
    isError,
    error,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: () => {
      // in case the rate limiting of the Geolocation API hits, use hardcoded fallback values
      const lat = geoData?.lat ?? FALLBACK_LAT;
      const lng = geoData?.lon ?? FALLBACK_LNG;

      return getCountriesBySearchTerm({ lat, lng, term: searchTerm });
    },
    enabled: false,
    retry: false,
  });

  // debounce user input, so we do not hit the api on each keystroke
  const debounceGetCountries = useMemo(
    () =>
      debounce(() => {
        fetchCountries();
      }, QUERY_DEBOUNCE_MS),
    [fetchCountries],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTerm = e.target.value;
      setSearchTerm(newTerm);

      if (!newTerm) return;

      debounceGetCountries();
    },
    [debounceGetCountries],
  );

  const resetSearch = () => {
    setSearchTerm("");
    setSelectedCountry(null);
  };

  const isSuggestionsDropdownOpen =
    !!searchTerm && countriesData?.success && countriesData?.data.length > 0;

  const isResetBtnVisible = !!searchTerm && !isFetching;

  const hasNoResults = !!searchTerm && countriesData?.success && countriesData?.data.length === 0;

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
          displayValue={(country: Country) => country?.name}
        />
        {isResetBtnVisible && (
          <button
            className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
            onClick={resetSearch}
          >
            <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
        )}

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          {isError && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
          {isFetching && <Loading className="h-5 w-5" />}
        </div>

        {isSuggestionsDropdownOpen && (
          <SuggestionList suggestions={countriesData.data as Country[]} />
        )}
      </Combobox>
      {hasNoResults && (
        <p className="mt-2 text-sm text-gray-600" role="alert">
          No results found!
        </p>
      )}
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
