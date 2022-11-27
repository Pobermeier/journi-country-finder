import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "./SearchInput";

jest.mock("@headlessui/react", () => ({
  Combobox: {
    Input: (props: any) => <input {...props} />,
  },
}));

const mockOnChangeCallback = jest.fn();
const mockOnResetCallback = jest.fn();

const noop = () => {};

describe("<SearchInput />", () => {
  it("renders correctly with all icons invisible", () => {
    render(
      <SearchInput
        isErrorIconVisible={false}
        isLoadingIndicatorVisible={false}
        isResetBtnVisible={false}
        onChange={noop}
        onResetBtnClick={noop}
      />,
    );

    expect(screen.queryByTitle("Reset")).not.toBeInTheDocument();
    expect(screen.queryByTitle("Error")).not.toBeInTheDocument();
    expect(document.querySelector(".loading")).not.toBeInTheDocument();
  });

  it("renders correctly with all icons visible", () => {
    render(
      <SearchInput
        isErrorIconVisible={true}
        isLoadingIndicatorVisible={true}
        isResetBtnVisible={true}
        onChange={noop}
        onResetBtnClick={noop}
      />,
    );

    expect(screen.getByTitle("Reset")).toBeInTheDocument();
    expect(screen.getByTitle("Error")).toBeInTheDocument();
    expect(document.querySelector(".loading")).toBeInTheDocument();
  });

  it("correctly calls callbacks if component is interacted with", () => {
    render(
      <SearchInput
        isErrorIconVisible={false}
        isLoadingIndicatorVisible={false}
        isResetBtnVisible={true}
        onChange={mockOnChangeCallback}
        onResetBtnClick={mockOnResetCallback}
      />,
    );

    const input = screen.getByPlaceholderText("Enter a country name...");
    const resetBtn = screen.getByTitle("Reset");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(resetBtn);

    expect(mockOnChangeCallback).toBeCalledTimes(1);
    expect(mockOnResetCallback).toBeCalledTimes(1);
  });
});
