import { useColorModeValue } from "@chakra-ui/react";
import React from "react";
import PublicLayout from "../components/layouts/PublicLayout";
import DefaultBreadcrumb from "../components/ui/widgets/navigation/breadCrumbs/DefaultBreadcrumb";
import { Crumb } from "../interfaces";

type Props = {
  crumbs: Crumb[];
};

function PricingPage(props: Props) {
  const bg = useColorModeValue("white", "#171923");
  let { crumbs } = props;
  const Homecrumb = {
    title: "Home",
    link: "/",
  };
  const Pricingcrumb = {
    title: "Pricing",
    link: "#",
  };
  crumbs = [];
  crumbs.push(Homecrumb, Pricingcrumb);

  return (
    <PublicLayout title="Pricing | Next.js + TypeScript + Chakra UI">
      <DefaultBreadcrumb crumbs={crumbs} />
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
          background: ${bg};
        }
      `}</style>
    </PublicLayout>
  );
}

export default PricingPage;
