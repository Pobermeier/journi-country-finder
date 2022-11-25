import { GetCountriesRequestBody, GetCountriesResponseData } from "pages/api/countries";

export const getCountriesBySearchTerm = async (data: GetCountriesRequestBody) => {
  const res = await fetch("/api/countries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = (await res.json()) as GetCountriesResponseData;

  return resData;
};
