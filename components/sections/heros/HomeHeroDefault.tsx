import {
  Flex,
  Stack,
  Heading,
  Button,
  Box,
  Link,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

type HomeHero1Props = {
  title: string;
  subtitle: string;
  image: string;
  ctaLink: string;
  ctaText: string;
};

export default function HomeHero1(props: HomeHero1Props) {
  const { title, subtitle, image, ctaLink, ctaText } = props;
  const bg = useColorModeValue("white", "gray.900");
  const color = useColorModeValue("primary.800", "white");

  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="nowrap"
      minH="70vh"
      px={8}
      mb={0}
      background={bg}
    >
      <Stack
        spacing={4}
        w={{ base: "80%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        -
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color={color}
          textAlign={["center", "center", "left", "left"]}
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          size="md"
          color={color}
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          {subtitle}
        </Heading>
        <Link href={ctaLink}>
          <Button
            colorScheme="primary"
            borderRadius="8px"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
          >
            {ctaText}
          </Button>
        </Link>
        <Text
          fontSize="xs"
          mt={2}
          textAlign="center"
          color={color}
          opacity="0.6"
        >
          No credit card required.
        </Text>
      </Stack>
      <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        <Image src={image} size="100%" rounded="1rem" shadow="2xl" />
      </Box>
    </Flex>
  );
}
