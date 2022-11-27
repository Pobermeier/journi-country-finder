import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CountryStat from "./CountryStat";

describe("<CountryStat />", () => {
  it("renders correctly", () => {
    const testProps = {
      title: "Test Title",
      content: "Test Content",
    };

    render(<CountryStat {...testProps} />);

    expect(screen.getByText(testProps.title)).toBeInTheDocument();
    expect(screen.getByText(testProps.content)).toBeInTheDocument();
  });
});
