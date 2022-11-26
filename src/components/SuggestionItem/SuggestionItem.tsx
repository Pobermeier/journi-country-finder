import Image from "next/image";
import clsx from "clsx";
import { Combobox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import type Country from "models/country";

type SuggestionItemProps = {
  suggestion: Country;
};

const SuggestionItem = ({ suggestion }: SuggestionItemProps) => {
  const { flag_png, name, iso_a3, pop_est } = suggestion;

  return (
    <Combobox.Option
      key={`${iso_a3}_${pop_est}`}
      value={suggestion}
      className={({ active }) =>
        clsx(
          "relative cursor-default select-none py-2 pl-3 pr-9",
          active ? "bg-indigo-600 text-white" : "text-gray-900",
        )
      }
    >
      {({ active, selected }) => (
        <>
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

          {selected && (
            <span
              className={clsx(
                "absolute inset-y-0 right-0 flex items-center pr-4",
                active ? "text-white" : "text-indigo-600",
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
        </>
      )}
    </Combobox.Option>
  );
};

export default SuggestionItem;
