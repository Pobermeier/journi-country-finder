import { GetCountriesRequestBody, GetCountriesResponseData } from "pages/api/countries";

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

    throw new Error(
      "A network error occured! Please try again later or check your internet connection",
    );
  }

  return resData;
};
