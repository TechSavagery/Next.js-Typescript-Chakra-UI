import React, { ReactNode } from "react";
import Head from "next/head";
import SimpleFooter from "../sections/footers/SimpleFooter";
import UserHeader from "../sections/heros/headers/UserHeader";

type Props = {
  children?: ReactNode;
  title?: string;
};

export default function UserLayout({
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
      <UserHeader />
      {children}
      <SimpleFooter />
    </div>
  );
}
