
# Journi Country Finder

This project was created as part of the Journi coding challenge in November 2022.

The app takes into consideration the current location of the user, and shows results sorted by distance to the country the user is currently located in. 
The current location is determined via a call to a third-party geolocation service and the country suggestions are fetched from a Next.js API-route ("/api/countries") via a POST-request.

On the frontend-side the user gets presented with a search input which he can use to search for any country name.
If a user selects one of the suggested countries he gets shown some interesting facts about it.


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

## Demo

In case there is an issue with running the app locally there is a live demo available [here](https://journi-country-finder.vercel.app/).


## Screenshot

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


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

Request body params (JSON):
| Value | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `lat`      | `number` | **Required**. The latitude of the user's current location |
| `lng`      | `number` | **Required**. The longitude of the user's current location |
| `term`      | `string` | **Optional**. An optional search term for the country name |
