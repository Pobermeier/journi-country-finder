import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "layouts/MainLayout";
import "styles/globals.css";

const queryClient = new QueryClient();

const defaultPageTitle = "🥇 Journi • Country Search Coding Challenge";
const defaultPageDescription = "A simple country finder app";

const App = ({ Component, pageProps }: AppProps) => {
  const { title, description } = Component as any;

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout
        pageDescription={description ?? defaultPageDescription}
        pageTitle={title ?? defaultPageTitle}
      >
        <Component {...pageProps} />
      </MainLayout>
    </QueryClientProvider>
  );
};

export default App;
