import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import type Country from "models/country";
import SuggestionList from "components/SuggestionList";
import { getCountriesBySearchTerm } from "services/countries";

const QUERY_DEBOUNCE_MS = 300;
const MIN_CHAR_LENGTH = 2;

const CountrySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const inputWrapperRef = useRef<HTMLInputElement | null>(null);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountriesBySearchTerm({ lat: 49, lng: 12, term: searchTerm }),
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

    if (searchTerm.length < MIN_CHAR_LENGTH) return;

    setIsDebouncing(true);
    debounceGetCountries();
    setIsSuggestionsOpen(true);
  };

  const updateSelectedCountry = useCallback(
    (country: Country) => {
      setSelectedCountry(country);
      setIsSuggestionsOpen(false);
      setSearchTerm(country.name);
    },
    [setSelectedCountry, setIsSuggestionsOpen, setSearchTerm],
  );

  const isDropdownRendered =
    searchTerm.length >= MIN_CHAR_LENGTH &&
    data.success &&
    data.data.length > 0 &&
    isSuggestionsOpen &&
    !isDebouncing &&
    !isFetching;

  const isDropdownBtnDisabled = isFetching && !data.success && !data.data.length;

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!inputWrapperRef.current?.parentElement?.contains(event.target as Node)) {
        setIsSuggestionsOpen(false);
      }
    },
    [setIsSuggestionsOpen, inputWrapperRef],
  );

  const closeSuggestions = useCallback(() => {
    setIsSuggestionsOpen(false);
  }, [setIsSuggestionsOpen]);

  useEffect(() => {
    isDropdownRendered && document.body.addEventListener("click", handleClickOutside, false);

    return () => {
      document.body.removeEventListener("click", handleClickOutside, false);
    };
  }, [isDropdownRendered, handleClickOutside]);

  const searchLabelId = "choose-country-lbl";
  const listId = "countrySuggestionsList";

  return (
    <>
      <div>
        <label id={searchLabelId} className="block text-sm font-medium text-gray-700">
          Choose Country
        </label>
        <div className="relative mt-1">
          <input
            aria-controls={listId}
            aria-expanded={isDropdownRendered}
            autoComplete="off"
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            inputMode="search"
            onChange={handleChange}
            placeholder="Enter country name..."
            ref={inputWrapperRef}
            role="combobox"
            type="text"
            value={searchTerm}
          />
          <button
            aria-labelledby={searchLabelId}
            disabled={isDropdownBtnDisabled}
            className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
            onClick={() => {
              setIsSuggestionsOpen((isOpen) => !isOpen);
              refetch();
            }}
            tabIndex={-1}
          >
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
          {isDropdownRendered && (
            <SuggestionList
              ariaLabeledBy={searchLabelId}
              id={listId}
              onSelectSuggestion={updateSelectedCountry}
              selectedCountry={selectedCountry}
              suggestions={data.data as Country[]}
            />
          )}
        </div>
      </div>
      {selectedCountry && <div>Selected Country: {selectedCountry.name}</div>}
    </>
  );
};

export default CountrySearch;
