import { GetCountriesRequestBody, GetCountriesResponseData } from "pages/api/countries";

type GeolocationApiResponse = {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
};

const NETWORK_ERR_MSG =
  "A network error occured! Please try again later or check your internet connection";

export const getCountriesBySearchTerm = async (data: GetCountriesRequestBody) => {
  const res = await fetch("/api/countries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = (await res.json()) as GetCountriesResponseData;

  if (!res.ok) {
    if (!resData.success) {
      throw new Error(resData.data as string);
    }

    throw new Error(NETWORK_ERR_MSG);
  }

  return resData;
};

export const getUserPosition = async () => {
  const res = await fetch("http://ip-api.com/json");
  const resData = (await res.json()) as GeolocationApiResponse;

  if (!res.ok) {
    throw new Error(NETWORK_ERR_MSG);
  }

  return resData;
};
