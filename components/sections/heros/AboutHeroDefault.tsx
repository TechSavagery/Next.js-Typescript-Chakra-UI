import {
  Flex,
  Heading,
  Box,
  Link,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

type PressLinkProps = {
  src: string;
  alt: string;
};

type AboutHeroDefaultProps = {
  headerText: string;
  subHeaderText: string;
  heroImageUrl: string;
};

function PressLink({ src, alt }: PressLinkProps) {
  const bg = useColorModeValue("white", "gray.900");
  const color = useColorModeValue("gray.900", "white");
  return (
    <Link
      opacity={0.5}
      color={color}
      bg={bg}
      mr={["0", "16px"]}
      _hover={{ opacity: 1 }}
    >
      <Box
        as="img"
        alt={alt}
        src={src}
        width="auto"
        height={["15px", "20px"]}
        color={color}
        bg={bg}
      />
    </Link>
  );
}

export default function AboutHeroDefaultProps({
  headerText,
  subHeaderText,
  heroImageUrl,
}: AboutHeroDefaultProps) {
  const bg = useColorModeValue("white", "gray.900");
  const color = useColorModeValue("gray.900", "white");
  return (
    <Flex
      margin="0 auto"
      maxWidth="1310px"
      mt={["0", "70px", "70px", "150px"]}
      py="50px"
      color={color}
      bg={bg}
    >
      <Flex
        px="20px"
        width={["100%", "50%"]}
        flexDirection="column"
        alignItems="flex-start"
        color={color}
        bg={bg}
      >
        <Heading
          my="32px"
          fontSize={["3rem", "3.5rem"]}
          textAlign={["center", "left"]}
          color={color}
          bg={bg}
        >
          {headerText}
        </Heading>
        <Box
          as="p"
          mb="16px"
          color={color}
          bg={bg}
          fontSize="1.2rem"
          maxWidth={["100%", "80%"]}
          textAlign={["center", "left"]}
        >
          {subHeaderText}
        </Box>
        <Flex
          width="100%"
          alignItems="center"
          justifyContent={["center", "unset"]}
        >
          <Link>
            <Box width="148px" height="80px" mr="8px">
              <img
                alt="play-store"
                style={{ height: "100%" }}
                src="https://yj083.csb.app/static/img/play-store.svg"
                color={color}
              />
            </Box>
          </Link>
          <Link>
            <Box width="148px" height="80px">
              <img
                alt="app-store"
                color={color}
                style={{ height: "100%" }}
                src="https://yj083.csb.app/static/img/app-store.svg"
              />
            </Box>
          </Link>
        </Flex>

        <Flex
          alignItems="center"
          mt={["80px", "auto"]}
          justifyContent="space-between"
          width={["100%", "100%", "100%", "65%"]}
          color={color}
          bg={bg}
        >
          <PressLink
            alt="press-yc"
            src="https://cowrywise.com/images/press/yc-dark.png"
          />
          <PressLink
            alt="press-tg"
            src="https://cowrywise.com/images/press/tg-dark.png"
          />
          <PressLink
            alt="press-tc"
            src="https://cowrywise.com/images/press/tc-dark.png"
          />
        </Flex>
      </Flex>

      <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        <Image src={heroImageUrl} size="100%" rounded="1rem" shadow="2xl" />
      </Box>
    </Flex>
  );
}
