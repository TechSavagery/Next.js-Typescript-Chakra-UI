import { Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import SocialIcons from "../../ui/widgets/SocialIcons";

const FooterSimple = () => {
  const bg = useColorModeValue("white", "gray.900");

  return (
    <Stack
      align="center"
      background={bg}
      position="relative"
      bottom="0"
      left="0"
      right="0"
      p="25px"
    >
      <SocialIcons />
    </Stack>
  );
};

export default FooterSimple;
