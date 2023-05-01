import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CMD8 AI Rank</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
