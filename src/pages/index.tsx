import Head from "next/head";
import CountrySearch from "components/CountrySearch";

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>🥇 Journi • Country Search Coding Challenge</title>
        <meta name="description" content="A simple country finder app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CountrySearch />
      </main>
    </div>
  );
};

export default HomePage;
