import type { NextApiRequest, NextApiResponse } from "next";
import { type Country, type CountryRaw } from "models/country";
import countries from "db/countries-metadata.json";
import getCountriesByDistance from "utils/getCountriesByDistance";
import getCountriesByTerm from "utils/getCountriesByTerm";
import getNormalizedTerm from "utils/getNormalizedTerm";
import { Cache, getCache, setCache } from "utils/caching";

const MAX_DEGREES_LAT = 90;
const MAX_DEGREES_LNG = 180;
// longest country name is 56 characters long
const MAX_CHARS = 56;

export type GetCountriesResponseData = {
  success: boolean;
  data: string | Country[];
};

export type GetCountriesRequestBody = {
  lat: number;
  lng: number;
  term: string;
};

// Initially create a new data array when server starts
// so we only send the data the client requires over the wire
const countriesClient: Country[] = (countries as CountryRaw[]).map((country) => ({
  flag_png: country.flag_png,
  gdp_md_est: country.gdp_md_est,
  iso_a3: country.iso_a3,
  name: country.name,
  pop_est: country.pop_est,
  sovereignt: country.sovereignt,
  type: country.type,
  lat: country.lat,
  lng: country.lng,
}));

const cache: Cache<Country[]> = {};

export default function countriesHandler(
  { method, body }: NextApiRequest,
  res: NextApiResponse<GetCountriesResponseData>,
) {
  if (method !== "POST") {
    return res
      .status(405)
      .json({ success: false, data: `Method ${method} is not supported by this route!` });
  }

  const { lat, lng, term = "" } = body as Partial<GetCountriesRequestBody>;

  if (
    typeof lat !== "number" ||
    typeof lng !== "number" ||
    Math.abs(lat) > MAX_DEGREES_LAT ||
    Math.abs(lng) > MAX_DEGREES_LNG
  ) {
    return res.status(400).json({
      success: false,
      data: `Please provide valid numeric values for both latitude (lat) & longitude (lng) as part of your request!
      Values may range from -90 to 90 degrees for lat and -180 to 180 degrees for lng.`,
    });
  }

  const cacheKey = `${lat + lng}`;

  // Sorted lists get cached using the users-latitude & longitude as the cache-key to avoid unnecessary computations
  // This is just to show the concept, in practice there is not enough data to see any real difference in response times
  const countriesByDistance =
    getCache<Country[]>(cacheKey, cache) ??
    setCache<Country[]>(getCountriesByDistance(countriesClient, lat, lng), cacheKey, cache);

  const normalizedTerm = getNormalizedTerm(term, MAX_CHARS);

  if (!normalizedTerm) {
    return res.status(200).json({ success: true, data: countriesByDistance });
  }

  const countriesByTerm = getCountriesByTerm(countriesByDistance, normalizedTerm);

  res.status(200).json({ success: true, data: countriesByTerm });
}
