import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from "react";
import { Combobox } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { type Country } from "models/country";
import SuggestionList from "components/CountrySearch/components/SuggestionList";
import SearchInput from "./components/SearchInput";
import { getCountriesBySearchTerm, getUserPosition } from "services/countries";

const QUERY_DEBOUNCE_MS = 300;
// Fallback coordinates (Vienna)
const FALLBACK_LAT = 48.2;
const FALLBACK_LNG = 16.3667;

type CountrySearchProps = {
  selectedCountry: Country | null;
  onCountrySelect: Dispatch<SetStateAction<Country | null>>;
};

const CountrySearch = ({ onCountrySelect, selectedCountry }: CountrySearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

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

  const updateSearchTerm = useCallback(
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
    onCountrySelect(null);
  };

  const isSuggestionsDropdownOpen =
    !!searchTerm && countriesData?.success && countriesData?.data.length > 0;

  const hasNoResults = !!searchTerm && countriesData?.success && countriesData?.data.length === 0;

  return (
    <>
      <Combobox
        as="div"
        className="relative mt-1 w-full sm:w-80"
        value={selectedCountry}
        onChange={onCountrySelect}
      >
        <SearchInput
          isErrorIconVisible={isError}
          isLoadingIndicatorVisible={isFetching}
          isResetBtnVisible={!!searchTerm && !isFetching}
          onChange={updateSearchTerm}
          onResetBtnClick={resetSearch}
        />
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
    </>
  );
};

export default CountrySearch;
