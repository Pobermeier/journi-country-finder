import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CountryDetails from "./CountryDetails";

describe("<CountryDetails />", () => {
  const testCountry = {
    flag_png: "123test",
    gdp_md_est: 21810,
    iso_a3: "ALB",
    name: "Albania",
    pop_est: 3639453,
    sovereignt: "Albania",
    type: "Dependency",
    lat: 50.43285860555667,
    lng: 22.524537743199165,
  } as const;

  const testCountry2 = {
    flag_png: "123test",
    gdp_md_est: 575.3,
    iso_a3: "ASM",
    name: "American Samoa",
    pop_est: 65628,
    sovereignt: "United States of America",
    type: "Dependency",
    lat: -16.098695491545,
    lng: -190.0174108329825,
  } as const;

  it("renders correctly if country is NOT a sovereign country", () => {
    render(<CountryDetails country={testCountry} />);

    expect(screen.getByText(testCountry.name)).toBeInTheDocument();
    expect(screen.getByText(testCountry.type)).toBeInTheDocument();
    expect(screen.getByText(testCountry.pop_est.toLocaleString())).toBeInTheDocument();
    expect(screen.getByText(`${testCountry.lat.toFixed(2)}°`)).toBeInTheDocument();
    expect(screen.getByText(`${testCountry.lng.toFixed(2)}°`)).toBeInTheDocument();
  });

  it("renders correctly if country is a sovereign country", () => {
    render(<CountryDetails country={testCountry2} />);

    expect(screen.getByText(testCountry2.sovereignt)).toBeInTheDocument();
    expect(screen.getByText(testCountry2.type)).toBeInTheDocument();
    expect(screen.getByText(testCountry2.pop_est.toLocaleString())).toBeInTheDocument();
    expect(screen.getByText(`${testCountry2.lat.toFixed(2)}°`)).toBeInTheDocument();
    expect(screen.getByText(`${testCountry2.lng.toFixed(2)}°`)).toBeInTheDocument();
  });
});
