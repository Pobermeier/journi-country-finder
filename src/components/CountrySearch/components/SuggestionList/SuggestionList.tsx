import { Combobox } from "@headlessui/react";
import { type Country } from "models/country";
import SuggestionItem from "components/CountrySearch/components/SuggestionItem";

type SuggestionListProps = {
  suggestions: Country[];
};

const SuggestionList = ({ suggestions }: SuggestionListProps) => {
  return (
    <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {suggestions.map((suggestion) => (
        <SuggestionItem
          key={`${suggestion.iso_a3}_${suggestion.pop_est}`}
          suggestion={suggestion}
        />
      ))}
    </Combobox.Options>
  );
};

export default SuggestionList;
