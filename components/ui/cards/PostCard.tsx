import React from "react";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Badge, Image, useColorModeValue, Text } from "@chakra-ui/react";
import { Post, User } from "../../../interfaces";
import { useUser } from "../../../hooks/user";
import { postImages } from "../../../lib/postImages";

type Props = {
  data: Post;
};

function PostCard(props: Props) {
  const { _id, creatorId, content } = props.data;

  const bg = useColorModeValue("white", "gray.900");
  const color = useColorModeValue("gray.900", "white");
  const user: User = useUser(creatorId);

  return (
    <Box
      as="button"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bg}
      color={color}
      id={_id}
    >
      <Image
        src={postImages?.[Math.floor(Math.random() * postImages.length) + 0]}
        alt="tech placeholder images in greyscale"
      />

      <Box bg={bg} color={color} p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color={color}
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
            bg={bg}
          >
            {content.length * 10} followers &bull; {content.length * 5}{" "}
            following
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
          textAlign="left"
        >
          Billy
        </Box>

        <Box textAlign="left">
          <Box as="span" bg={bg} color={color} fontSize="sm">
            <Text color={color} isTruncated noOfLines={[2, 3, 5]}>
              {content}
            </Text>
          </Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={
                  i < Math.floor(Math.random() * 5) + 4
                    ? "primary.500"
                    : "gray.300"
                }
              />
            ))}
          <Box as="span" ml="2" bg={bg} color={color} fontSize="sm">
            {content.split(" ").length} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PostCard;
