import React from "react";
import { Box, Flex, Button, useColorModeValue } from "@chakra-ui/react";
import LogoDefault from "../../../ui/logos/LogoDefault";
import ThemeSelector from "../../../ui/toggles/ThemeSelector";
import RightSideMenu from "../../../ui/menus/RightSideMenu";
import MenuItems from "../../../ui/menus/MenuItems";

export default function PublicHeader() {
  const [show] = React.useState(false);
  const bg = useColorModeValue("white", "gray.900");
  const color = useColorModeValue("gray.900", "white");

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={0}
      p={6}
      bg={bg}
      color={color}
      borderTop="6px solid #0911DD"
    >
      <Flex align="center">
        <LogoDefault
          w="200px"
          color={["white", "white", "primary.500", "primary.500"]}
        />
      </Flex>

      <Box display={{ base: "block", md: "none" }}>
        {!show ? <RightSideMenu /> : null}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <ThemeSelector />
          <MenuItems to="/">Home</MenuItems>
          <MenuItems to="/about">About </MenuItems>
          <MenuItems to="/features">Features </MenuItems>
          <MenuItems to="/pricing">Pricing </MenuItems>
          <MenuItems to="/users">Users </MenuItems>
          <MenuItems to="/api/users">Users API </MenuItems>
          <MenuItems to="/signup" isLast>
            <Button
              variant="outline"
              size="sm"
              rounded="md"
              color={["primary.500", "primary.500", "white", "white"]}
              bg={["white", "white", "primary.500", "primary.500"]}
              _hover={{
                bg: [
                  "primary.100",
                  "primary.100",
                  "primary.600",
                  "primary.600",
                ],
              }}
            >
              Create Account
            </Button>
          </MenuItems>
        </Flex>
      </Box>
    </Flex>
  );
}
