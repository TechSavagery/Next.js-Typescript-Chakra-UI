import PublicLayout from "../components/layouts/PublicLayout";
import "focus-visible/dist/focus-visible";
import HomeHeroDefault from "../components/sections/heros/HomeHeroDefault";
import { useColorModeValue } from "@chakra-ui/react";
import React from "react";

function IndexPage() {
  const bg = useColorModeValue("white", "#171923");

  return (
    <div>
      <PublicLayout title="Home | Next.js + TypeScript + Chakra-Ui">
        <HomeHeroDefault
          title="React landing page with Chakra UI"
          subtitle="This is the subheader section where you describe the basic benefits of your product"
          image="/tech-savagery-home-hero-1.jpg"
          ctaLink="https://techsavagery.net"
          ctaText="Create your account now"
        />
      </PublicLayout>
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
    </div>
  );
}

export default IndexPage;
