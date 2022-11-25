import type { NextApiRequest, NextApiResponse } from "next";
import type Country from "models/country";
import countries from "db/countries-metadata.json";
import getCountriesByDistance from "utils/getCountriesByDistance";
import getCountriesByTerm from "utils/getCountriesByTerm";
import getNormalizedTerm from "utils/getNormalizedTerm";

type CountriesResponseData = {
  success: boolean;
  data: string | Country[];
};

type CountriesRequestBody = {
  lat?: number;
  lng?: number;
  term?: string;
};

const MAX_DEGREES_LAT = 90;
const MAX_DEGREES_LNG = 180;

const countriesCache: Record<string, Country[]> = {};

export default function countriesHandler(
  { method, body }: NextApiRequest,
  res: NextApiResponse<CountriesResponseData>,
) {
  if (method !== "GET") {
    return res
      .status(405)
      .json({ success: false, data: `Method ${method} is not supported by this route!` });
  }

  const { lat, lng, term = "" } = body as CountriesRequestBody;

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

  const cacheKeyToCheck = `${lat + lng}`;

  const countriesByDistance =
    countriesCache[cacheKeyToCheck] ?? getCountriesByDistance(countries, lat, lng, countriesCache);

  const normalizedTerm = getNormalizedTerm(term);

  if (!normalizedTerm) {
    return res.status(200).json({ success: true, data: countriesByDistance });
  }

  const countriesByTerm = getCountriesByTerm(countriesByDistance, normalizedTerm);

  res.status(200).json({ success: true, data: countriesByTerm });
}
