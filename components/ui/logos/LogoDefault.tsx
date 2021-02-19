import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

type LogoProps = {
  w: string;
  color: string[];
};

export default function DefaultLogo(props: LogoProps) {
  const bg = useColorModeValue("white", "gray.900");
  const color = useColorModeValue("primary.800", "white");
  return (
    <Box {...props}>
      <Text background={bg} color={color} fontSize="xl" fontWeight="bold">
        Tech Savagery
      </Text>
    </Box>
  );
}
