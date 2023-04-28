import React, { ReactElement, ReactNode } from "react";
import "@/styles/globals.css";
import "@/public/fonts/font.css";

import type { AppProps } from "next/app";
import { NextPage } from "next";
import Head from "next/head";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return getLayout(
    <>
      <Head>
        <title>5WoonWan</title>
        <meta name="description" content="Manage your exercise" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

// layout
// Cart.getLayout = function getLayout(page: React.ReactNode) {
//   return <Layout>{page}</Layout>;
// };
