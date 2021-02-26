import { GetStaticProps, GetStaticPaths } from "next";
import { Crumb, User } from "../../interfaces";
import Layout from "../../components/Layout";
import {
  Box,
  useColorModeValue,
  Flex,
  Avatar,
  List,
  ListIcon,
  ListItem,
  Tag,
  Link,
  Button,
} from "@chakra-ui/react";
import { useCurrentUser } from "../../hooks/user";
import React from "react";
import DefaultBreadcrumb from "../../components/ui/widgets/navigation/breadCrumbs/DefaultBreadcrumb";
import PublicLayout from "../../components/layouts/PublicLayout";
import { CheckCircleIcon, EmailIcon } from "@chakra-ui/icons";
import AddPostForm from "../../components/ui/forms/AddPostForm";
import PostsGrid from "../../components/ui/grids/PostsGrid";

type Props = {
  user?: User;
  errors?: string;
  crumbs: Crumb[];
};

const ProfilePage = ({ user, errors, crumbs }: Props) => {
  const [userData] = useCurrentUser();
  const bg = useColorModeValue("white", "#171923");
  const color = useColorModeValue("#171923", "white");

  const [] = useCurrentUser();

  const Dashboardcrumb = {
    title: "Dashboard",
    link: "/",
  };
  const Accountcrumb = {
    title: "Account",
    link: "#",
  };
  crumbs = [];
  crumbs.push(Dashboardcrumb, Accountcrumb);
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }
  const PostGridProp = {
    creatorId: user?._id,
  };

  return (
    <PublicLayout title={`${user?.name} | Next.js + TypeScript + ChakraUI`}>
      <DefaultBreadcrumb crumbs={crumbs} />
      <Flex
        w={["100%", "100%", "100%", "100%"]}
        direction={["column", "column", "row", "column"]}
        bg={bg}
        boxShadow="unset"
        rounded="lg"
        align="center"
      >
        <Box
          w={["100%", "100%", "100%", "75%"]}
          display="flex"
          alignItems="center"
          marginBottom="4"
        >
          <Avatar
            size="2xl"
            name={user?.name}
            src="https://placeimg.com/256/256/people/grayscale"
            marginLeft={["1", "1", "1", "8"]}
          />
          <Flex>
            <List spacing={1} marginLeft={["1", "1", "1", "8"]}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color={color} bg={bg} />
                <Tag>{user?.name}</Tag>
              </ListItem>
              <ListItem>
                <ListIcon as={EmailIcon} color={color} bg={bg} />
                <Tag>{user?.email}</Tag>
              </ListItem>
              {user?._id == userData?._id && (
                <ListItem>
                  <Link href="/account">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </Link>
                </ListItem>
              )}
            </List>
          </Flex>
        </Box>
        {user?._id == userData?._id && <AddPostForm />}
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
};

export default ProfilePage;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users

  const res = await fetch("http://localhost:3000/api/users");
  const users = await res.json();
  const paths = users.map((user: any) => ({
    params: { id: user._id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    console.log(id);
    let user;
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { user } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
