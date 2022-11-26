import CountrySearch from "components/CountrySearch";

const HomePage = () => {
  return (
    <>
      <div className="mb-8 md:mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Country Finder
        </h2>
        <p className="mt-5 text-lg text-gray-500">
          Search for a country to learn some interesting facts about it!
        </p>
      </div>

      <CountrySearch />
    </>
  );
};

export default HomePage;
