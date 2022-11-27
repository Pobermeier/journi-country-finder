/* eslint-disable react/display-name */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MainLayout from "./MainLayout";

jest.mock("components/Footer/Footer", () => () => <div>Header</div>);

jest.mock("components/Navbar/Navbar", () => () => <div>Footer</div>);

describe("<MainLayout />", () => {
  it("renders correctly with required props provided", () => {
    const testProps = {
      pageTitle: "Test Title",
      pageDescription: "Test Description",
    };

    render(<MainLayout {...testProps}>children</MainLayout>);

    expect(screen.getByText("children")).toBeInTheDocument();
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
