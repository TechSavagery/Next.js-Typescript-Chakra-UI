import { useColorModeValue } from "@chakra-ui/react";
import React from "react";
import PublicLayout from "../components/layouts/PublicLayout";
import AboutHeroDefaultProps from "../components/sections/heros/AboutHeroDefault";
import DefaultBreadcrumb from "../components/ui/widgets/navigation/breadCrumbs/DefaultBreadcrumb";
import { Crumb } from "../interfaces";

type Props = {
  crumbs: Crumb[];
};

function AboutPage(props: Props) {
  const bg = useColorModeValue("white", "#171923");
  let { crumbs } = props;
  const Homecrumb = {
    title: "Home",
    link: "/",
  };
  const Aboutcrumb = {
    title: "About",
    link: "#",
  };
  crumbs = [];
  crumbs.push(Homecrumb, Aboutcrumb);

  return (
    <PublicLayout title="About | Next.js + TypeScript + Chakra UI">
      <DefaultBreadcrumb crumbs={crumbs} />
      <AboutHeroDefaultProps
        headerText="Our Story"
        subHeaderText="We develop web services for the digital economy to solve business needs and deliver value.
        
        Our mission is to ignite the ferocious appetite for tech within people of all backgrounds and skill levels through fresh and relatable content and services, and empower them leverage technology to make the world a better place."
        heroImageUrl="http://adigaskell.org/wp-content/uploads/2019/04/young-people-work.jpg"
      />
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

export default AboutPage;
