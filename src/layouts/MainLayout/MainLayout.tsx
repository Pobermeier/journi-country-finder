import Head from "next/head";
import Footer from "components/Footer";
import Navbar from "components/Navbar";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Head>
        <title>🥇 Journi • Country Search Coding Challenge</title>
        <meta name="description" content="A simple country finder app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen flex flex-col">
        <Navbar />
        <main className="w-full mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
