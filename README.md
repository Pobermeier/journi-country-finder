
# Journi Country Finder

This project was created as part of the Journi coding challenge in November 2022.

The app takes into consideration the current location of the user, and shows results sorted by distance to the country the user is currently located in. The user's current location is determined via a call to a third-party geolocation service and the country suggestions are fetched from an internal Next.js API-route ("/api/countries") via a POST-request.

On the frontend-side the user gets presented with a search input which he can use to search for any country name. If a user selects one of the suggested countries he gets shown some interesting facts about it.

## Remarks

- Instead of fetching the current position from the Geolocation API on the server-side I've moved this functionality to the client. I've understood from the project requirements that this is a valid alternative. The position gets fetched once on the first page load (after that it will be cached by react-query until the next page load) and will be passed to the backend as part of any search requests. Should the API rate limit of the Geo-API be reached (25 calls per minute from one IP) I use hardcoded values as a fallback.
- I've implemented the API-endpoint as a POST-request, as in a real world scenario I would consider the user's location as privacy-sensitive information that should not be "leaked" inside of query-params.
- I wanted to have for the search input a fully accessible component (screen reader accessible + proper keyboard usage) to provide the best possible user experience. As implementing all of these features would not fit into the given timeframe I've opted for a third party (headless UI) component to implement an accessible Combobox-pattern. I've added addtional features on top like showing any errors to the user, a notification for the user if there are no results found and a loading-indicator during data-fetching. Also the user input is getting debounced for 300ms so that the backend does not get hit on every keystroke. 
- For implementing the data-fetching logic I've opted to use react-query over the plain fetch-API. It might not be necessary for a project of this size, but it provides a great developer experience for fetching and caching data plus handling any errors.
- Finally, on the backend side I've implemented a simple form of in-memory caching. As the amount of data is quite low it does not really make a difference in reducing the latency here but this is merely just to demonstrate the general concept in a simplified manner.
-  As this seems to be the most widely used UX pattern for country search, I've implemented the search such that only matches that include the search-term at the start are returned.

## Getting Started

Clone the project

```bash
  git clone https://github.com/Pobermeier/journi-country-finder.git
```

Go to the project directory

```bash
  cd journi-country-finder
```

Install dependencies

```bash
  npm install
  # or
  yarn
```

Start the server

```bash
  npm run dev
  # or
  yarn dev
```

Open [http://localhost:4442](http://localhost:4442) with your browser to see the result.

## Running Tests

Unit- & Component-tests can be run locally with

```bash
  npm run test
  # or
  yarn test
```

## Demo

In case there is an issue with running the app locally there is a live demo available [here](https://journi-country-finder.vercel.app/).

## Screenshot

![image](https://user-images.githubusercontent.com/19672749/204149314-72c3f8a4-9a80-4fba-8880-1a301e59949b.png)

## Tech Stack

**Client:** Next.js, React, TailwindCSS, React Query, TypeScript

**Server:** Next.js API routes, TypeScript

**Tooling:** Jest, React Testing Library, Prettier, ESLint


## API Reference

#### Get country suggestions

```http
POST /api/countries
```
Takes the latitude & longitude (required) of the user's current location and an optional search term.

If the search term is omitted the endpoint returns all countries sorted by distance from the user's current location in ascending order.

If a search term is provided the endpoint returns all countries whose name start with the provided term in the same order as explained above.

__Available body params (JSON):__
| Value | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `lat`      | `number` | **Required**. The latitude of the user's current location |
| `lng`      | `number` | **Required**. The longitude of the user's current location |
| `term`      | `string` | **Optional**. An optional search term for the country name |
