import { useState } from "react";
import Image from "next/image";
import type Country from "models/country";

type SuggestionItemProps = {
  onSelectSuggestion: (country: Country) => void;
  suggestion: Country;
};

const SuggestionItem = ({ onSelectSuggestion, suggestion }: SuggestionItemProps) => {
  const { flag_png, name, iso_a3, pop_est } = suggestion;

  const [isSelected, setIsSelected] = useState(false);

  return (
    <li
      aria-selected={isSelected}
      className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
      id={`suggestion_${iso_a3}_${pop_est}`}
      onClick={() => onSelectSuggestion(suggestion)}
      onBlur={() => setIsSelected(false)}
      onFocus={() => setIsSelected(true)}
      role="option"
    >
      <div className="flex items-center">
        <Image
          alt={name}
          className="h-6 w-6 flex-shrink-0 rounded-full"
          height={24}
          role="presentation"
          src={`data:image/png;base64,${flag_png}`}
          width={24}
        />
        <span className="ml-3 truncate">{name}</span>
      </div>
    </li>
  );
};

export default SuggestionItem;
