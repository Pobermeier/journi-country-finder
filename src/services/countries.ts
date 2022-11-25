import { GetCountriesRequestBody, GetCountriesResponseData } from "pages/api/countries";

export const getCountriesBySearchTerm = async (data: GetCountriesRequestBody) => {
  const res = await fetch("/api/countries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Network error occured!");
  }

  const resData = (await res.json()) as GetCountriesResponseData;

  return resData;
};
