import { Icon, HStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const SocialIcons = () => {
  const bg = useColorModeValue("white", "gray.900");
  const color = useColorModeValue("primary.800", "white");
  const boxSize = 6;
  return (
    <HStack background={bg}>
      <Icon as={FaInstagram} color={color} background={bg} boxSize={boxSize} />
      <Icon as={FaGithub} color={color} background={bg} boxSize={boxSize} />
      <Icon as={FaLinkedin} color={color} background={bg} boxSize={boxSize} />
      <Icon as={FaEnvelope} color={color} background={bg} boxSize={boxSize} />
      <Icon as={FaPhone} color={color} background={bg} boxSize={boxSize} />
    </HStack>
  );
};

export default SocialIcons;
