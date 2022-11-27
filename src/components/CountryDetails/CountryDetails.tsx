import Image from "next/image";
import { type Country } from "models/country";
import CountryStat from "components/CountryDetails/components/CountryStat";

const ONE_MILLION = 1000000;

type CountryDetailsProps = {
  country: Country;
};

const CountryDetails = ({ country }: CountryDetailsProps) => {
  const { flag_png, name, iso_a3, sovereignt, type, pop_est, gdp_md_est, lat, lng } = country;

  const gdpPerCapitaUsd = ((gdp_md_est * ONE_MILLION) / pop_est).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });

  const isSovereignCountry = type === "Sovereign country" || type === "Country";
  const population = pop_est.toLocaleString();
  const latitude = `${lat.toFixed(2)}°`;
  const longitude = `${lng.toFixed(2)}°`;

  return (
    <div className="mx-auto max-w-7xl py-8 sm:py-12 lg:py-16">
      <div className="flex items-center">
        <Image
          alt={name}
          className="h-12 w-12 mr-6 flex-shrink-0 rounded-full border border-gray-400 "
          height={48}
          role="presentation"
          src={`data:image/png;base64,${flag_png}`}
          width={48}
        />
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {name} ({iso_a3})
        </h3>
      </div>
      <div className="mt-8 overflow-hidden">
        <dl className="-mx-8 -mt-8 flex flex-wrap">
          <CountryStat title="Type" content={type} />
          {!isSovereignCountry && <CountryStat title="Sovereignity" content={sovereignt} />}
          <CountryStat title="Population (Est.)" content={population} />
          <CountryStat title="GDP per capita (Est.)" content={gdpPerCapitaUsd} />
          <CountryStat title="Latitude" content={latitude} />
          <CountryStat title="Longitude" content={longitude} />
        </dl>
      </div>
    </div>
  );
};

export default CountryDetails;
