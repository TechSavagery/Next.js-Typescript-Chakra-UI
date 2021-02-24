import React, { useState, useEffect, useRef } from "react";
import { useCurrentUser } from "../hooks/user";
import {
  Flex,
  Box,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Button,
  Divider,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FaAlignLeft, FaIdCard, FaUserAlt } from "react-icons/fa";
import Router from "next/router";
import { Crumb } from "../interfaces";
import DefaultBreadcrumb from "../components/ui/widgets/navigation/breadCrumbs/DefaultBreadcrumb";
import UserLayout from "../components/layouts/UserLayout";

type Props = {
  crumbs: Crumb[];
};

const AccountSettings = () => {
  const [user, { mutate }] = useCurrentUser();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const nameRef = useRef<any>();
  const bioRef = useRef<any>();
  const profilePictureRef = useRef<any>();
  const [msg, setMsg] = useState({ message: "", isError: false });
  const toast = useToast();
  const bg = useColorModeValue("white", "#171923");
  const color = useColorModeValue("#171923", "white");

  useEffect(() => {
    if (!user) Router.replace("/signin");
    nameRef.current!.value = user?.name;
    bioRef.current!.value = user?.bio;
  }, [user]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (isUpdatingProfile) return;
    setIsUpdatingProfile(true);
    const formData = new FormData();
    if (profilePictureRef?.current?.files[0]) {
      formData.append("profilePicture", profilePictureRef.current.files[0]);
    }
    formData.append("name", nameRef?.current?.value);
    formData.append("bio", bioRef?.current?.value);
    const res = await fetch("/api/user", {
      method: "PATCH",
      body: formData,
    });
    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });
      setMsg({ message: "Profile updated", isError: false });
      setMsg({ message: "", isError: false });
    } else {
      setMsg({ message: await res.text(), isError: true });
      setMsg({ message: "", isError: false });
    }
    setIsUpdatingProfile(false);
  };

  const handleSubmitPasswordChange = async (e: any) => {
    e.preventDefault();
    if (isUpdatingPassword) return;
    setIsUpdatingPassword(true);
    const body = {
      oldPassword: e.currentTarget.oldPassword.value,
      newPassword: e.currentTarget.newPassword.value,
    };
    e.currentTarget.oldPassword.value = "";
    e.currentTarget.newPassword.value = "";

    const res = await fetch("/api/user/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      setMsg({ message: "Password updated", isError: false });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
    setIsUpdatingPassword(false);
  };

  const sendVerificationEmail = async () => {
    const res = await fetch("/api/user/email/verify", {
      method: "POST",
    });
    if (res.status === 200) {
      setMsg({
        message: "An email has been sent to your mailbox",
        isError: false,
      });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  };

  return (
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
          Account Info
        </Heading>
        <Heading as="h3" color={color} marginBottom="1.5rem">
          Edit Profile
        </Heading>
        {msg.message
          ? toast({
              title: "Notification",
              description: msg.message,
              status: msg.isError ? "warning" : "success",
              duration: 5000,
              isClosable: true,
            })
          : null}
        <form onSubmit={handleSubmit}>
          {!user?.emailVerified ? (
            <Button
              width="100%"
              color={color}
              colorScheme="main"
              variant="outline"
              onClick={sendVerificationEmail}
            >
              Verify Email
            </Button>
          ) : null}
          <Stack spacing={4} marginBottom="1rem">
            <FormControl>
              <FormLabel color={color} htmlFor="name">
                Name
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  children={<Icon as={FaUserAlt} color={color} />}
                />
                <Input
                  focusBorderColor="main.500"
                  type="text"
                  name="name"
                  id="name"
                  placeholder={user?.name}
                  color={color}
                  ref={nameRef}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <Stack justifyContent="space-between" isInline>
                <FormLabel color={color} htmlFor="bio">
                  Bio
                </FormLabel>
              </Stack>
              <InputGroup>
                <InputLeftElement
                  children={<Icon as={FaAlignLeft} color={color} />}
                />
                <Input
                  focusBorderColor="main.500"
                  name="bio"
                  id="bio"
                  type="text"
                  placeholder={user?.bio}
                  color={color}
                  ref={bioRef}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <Stack justifyContent="space-between" isInline>
                <FormLabel color={color} htmlFor="avatar">
                  Profile
                </FormLabel>
              </Stack>
              <InputGroup>
                <InputLeftElement
                  children={<Icon as={FaIdCard} color={color} />}
                />
                <Input
                  focusBorderColor="main.500"
                  name="avatar"
                  id="avatar"
                  type="file"
                  placeholder={user?.bio}
                  color={color}
                  ref={profilePictureRef}
                  accept="image/png, image/jpeg"
                />
              </InputGroup>
            </FormControl>
          </Stack>
          <Stack marginBottom="1rem">
            <Button
              type="submit"
              isLoading={isUpdatingProfile}
              disabled={isUpdatingProfile}
              loadingText="Please wait.."
              variant="outline"
              colorScheme="main"
              color={color}
            >
              Save
            </Button>
          </Stack>
        </form>
        <Divider marginBottom="1rem" />
        <Heading as="h3" color={color} marginBottom="1.5rem">
          Credentials
        </Heading>
        <form onSubmit={handleSubmitPasswordChange}>
          <Stack marginBottom="1.5rem">
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  children={<Icon as={FaIdCard} color={color} />}
                />
                <Input
                  color={color}
                  type="password"
                  name="oldPassword"
                  id="oldpassword"
                  placeholder="Old Password"
                  required
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  children={<Icon as={FaIdCard} color={color} />}
                />
                <Input
                  color={color}
                  type="password"
                  name="newPassword"
                  id="newpassword"
                  placeholder="New Password"
                  required
                />
              </InputGroup>
            </FormControl>
          </Stack>
          <Stack marginBottom="1rem">
            <Button
              type="submit"
              isLoading={isUpdatingPassword}
              disabled={isUpdatingPassword}
              loadingText="Please wait.."
              variant="outline"
              colorScheme="main"
              color={color}
            >
              Update Password
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};
const AccountPage = (props: Props) => {
  const [] = useCurrentUser();
  const bg = useColorModeValue("white", "#171923");
  const [] = useCurrentUser();

  let { crumbs } = props;
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
  //if (!user) router.replace("/signin");

  const title = `Account :  | Next.js + TypeScript + Chakra UI`;

  return (
    <UserLayout title={title}>
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
      <AccountSettings />
    </UserLayout>
  );
};
export default AccountPage;
