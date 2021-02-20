import React, { useState, useEffect } from "react";
import Router from "next/router";
import { useCurrentUser } from "../hooks/user";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Crumb } from "../interfaces";
import { FaRegEnvelope, FaLock } from "react-icons/fa";
import PublicLayout from "../components/layouts/PublicLayout";
import DefaultBreadcrumb from "../components/ui/widgets/navigation/breadCrumbs/DefaultBreadcrumb";

type Props = {
  crumbs: Crumb[];
};

const SignInPage = (props: Props) => {
  const [user, { mutate }] = useCurrentUser();
  const [, setErrorMsg] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.replace("/account");
  }, [user]);

  const bg = useColorModeValue("white", "#171923");
  const color = useColorModeValue("#171923", "white");

  let { crumbs } = props;
  const Homecrumb = {
    title: "Home",
    link: "/",
  };
  const Signincrumb = {
    title: "SignIn",
    link: "#",
  };
  crumbs = [];
  crumbs.push(Homecrumb, Signincrumb);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg("Incorrect username or password. Try again!");
    }
  };

  return (
    <PublicLayout title="SignIn | Next.js + TypeScript + Chakra UI">
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
        <Box width={{ base: "100%", md: "700px" }} bg={bg} rounded="xl" p={5}>
          <Heading color={color} marginBottom="1.5rem">
            Login
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} marginBottom="1rem">
              <FormControl>
                <FormLabel color={color} htmlFor="email">
                  Email Address
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    children={<Icon as={FaRegEnvelope} color={color} />}
                  />
                  <Input
                    focusBorderColor="main.500"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                    color={color}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <Stack justifyContent="space-between" isInline>
                  <FormLabel color={color} htmlFor="password">
                    Password
                  </FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement
                    children={<Icon as={FaLock} color={color} />}
                  />
                  <Input
                    focusBorderColor="main.500"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    color={color}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
            <Stack marginBottom="1rem">
              <Button
                type="submit"
                isLoading={isSubmitting}
                loadingText="Please wait.."
                variant="outline"
                colorScheme="main"
                color={color}
              >
                Sign In
              </Button>
            </Stack>
          </form>
          <Divider marginBottom="1rem" />
          <Stack>
            <Text color={color} textAlign="center" fontWeight="500">
              Dont have an account?
            </Text>
            <Link href="/signup">
              <Button
                width="100%"
                color={color}
                colorScheme="main"
                variant="outline"
              >
                Create Account
              </Button>
            </Link>
          </Stack>
        </Box>
      </Flex>
    </PublicLayout>
  );
};
export default SignInPage;
