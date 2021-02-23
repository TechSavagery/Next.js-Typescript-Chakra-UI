import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import PublicLayout from "../components/layouts/PublicLayout";
import PostsGrid from "../components/ui/grids/PostsGrid";
import DefaultBreadcrumb from "../components/ui/widgets/navigation/breadCrumbs/DefaultBreadcrumb";
import { Crumb } from "../interfaces";

type Props = {
  crumbs: Crumb[];
};

function PostsPage(props: Props) {
  const bg = useColorModeValue("white", "#171923");
  let { crumbs } = props;
  const Homecrumb = {
    title: "Home",
    link: "/",
  };
  const Postscrumb = {
    title: "Posts",
    link: "#",
  };
  crumbs = [];
  crumbs.push(Homecrumb, Postscrumb);

  const PostGridProp = {
    creatorId: null,
  };

  return (
    <PublicLayout title="Posts | Next.js + TypeScript + ChakraUI">
      <DefaultBreadcrumb crumbs={crumbs} />
      <Flex
        w={["100%", "100%", "100%", "100%"]}
        direction={["column", "column", "row", "column"]}
        bg={bg}
        boxShadow="md"
        rounded="lg"
        p="4"
        align="center"
        m="2.5px"
      >
        <PostsGrid {...PostGridProp} />
      </Flex>
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

export default PostsPage;
