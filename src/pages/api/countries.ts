import type { NextApiRequest, NextApiResponse } from "next";
import type Country from "models/country";
import countries from "db/countries-metadata.json";
import getCountriesByDistance from "utils/getCountriesByDistance";
import getCountriesByTerm from "utils/getCountriesByTerm";

type CountriesResponseData = {
  success: boolean;
  data: string | Country[];
};

type CountriesRequestBody = {
  lat?: number;
  lng?: number;
  term?: string;
};

export default function countriesHandler(
  { method, body }: NextApiRequest,
  res: NextApiResponse<CountriesResponseData>,
) {
  if (method !== "GET") {
    return res
      .status(405)
      .json({ success: false, data: `Method ${method} is not supported by this route!` });
  }

  const { lat, lng, term } = body as CountriesRequestBody;

  if (typeof lat == "undefined" || typeof lng == "undefined") {
    return res.status(400).json({
      success: false,
      data: "Please provide values for both latitude (lat) & longitude (lng) as part of your request!",
    });
  }

  const countriesByDistance = getCountriesByDistance(countries, lat, lng);

  const normalizedTerm = term?.toLowerCase().trim() ?? "";

  if (!normalizedTerm) {
    return res.status(200).json({ success: true, data: countriesByDistance });
  }

  const countriesByTerm = getCountriesByTerm(countriesByDistance, normalizedTerm);

  res.status(200).json({ success: true, data: countriesByTerm });
}
