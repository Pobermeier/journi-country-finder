import type Country from "models/country";
import SuggestionItem from "components/SuggestionItem";

type SuggestionListProps = {
  ariaLabeledBy: string;
  id: string;
  suggestions: Country[];
  selectedCountry: Country | null;
  onSelectSuggestion: (country: Country) => void;
};

const SuggestionList = ({
  ariaLabeledBy,
  id,
  onSelectSuggestion,
  selectedCountry,
  suggestions,
}: SuggestionListProps) => {
  return (
    <ul
      aria-activedescendant={
        selectedCountry
          ? `suggestion_${selectedCountry.iso_a3}_${selectedCountry.pop_est}`
          : undefined
      }
      aria-labelledby={ariaLabeledBy}
      id={id}
      className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      role="listbox"
    >
      {suggestions.map((suggestion) => (
        <SuggestionItem
          key={`${suggestion.iso_a3}_${suggestion.pop_est}`}
          onSelectSuggestion={onSelectSuggestion}
          suggestion={suggestion}
        />
      ))}
    </ul>
  );
};

export default SuggestionList;
