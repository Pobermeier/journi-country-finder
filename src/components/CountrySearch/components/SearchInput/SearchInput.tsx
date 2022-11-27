import React from "react";
import { Combobox } from "@headlessui/react";
import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { type Country } from "models/country";
import Loading from "components/Loading";

type SearchInputProps = {
  isErrorIconVisible: boolean;
  isLoadingIndicatorVisible: boolean;
  isResetBtnVisible: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetBtnClick: () => void;
};

const SearchInput = ({
  isErrorIconVisible,
  isLoadingIndicatorVisible,
  isResetBtnVisible,
  onChange,
  onResetBtnClick,
}: SearchInputProps) => {
  return (
    <>
      <Combobox.Input
        aria-label="Choose Country"
        autoComplete="off"
        className={clsx(
          "w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm",
          isErrorIconVisible
            ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-sky-500 focus:ring-sky-500",
        )}
        onChange={onChange}
        placeholder="Enter a country name..."
        displayValue={(country: Country) => country?.name}
      />
      {isResetBtnVisible && (
        <button
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
          onClick={onResetBtnClick}
        >
          <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" title="Reset" />
        </button>
      )}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        {isErrorIconVisible && (
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
            title="Error"
          />
        )}
        {isLoadingIndicatorVisible && <Loading className="h-5 w-5" />}
      </div>
    </>
  );
};

export default SearchInput;
