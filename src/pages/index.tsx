import Head from "next/head";

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>🥇 Journi • Country Finder</title>
        <meta name="description" content="A simple country finder app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </div>
  );
};

export default HomePage;
