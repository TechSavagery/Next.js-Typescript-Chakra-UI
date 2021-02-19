import React, { ReactNode } from "react";
import Head from "next/head";
import PublicHeader from "../sections/heros/headers/PublicHeader";
import SimpleFooter from "../sections/footers/SimpleFooter";

type Props = {
  children?: ReactNode;
  title?: string;
};

export default function Layout({
  children,
  title = "This is the default title",
}: Props) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <PublicHeader />
      {children}
      <SimpleFooter />
    </div>
  );
}
