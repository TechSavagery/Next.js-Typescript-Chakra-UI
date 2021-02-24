import * as React from "react";
import { Post } from "../../../interfaces";
import { Box, Button, Grid, useColorModeValue } from "@chakra-ui/react";
import { usePosts } from "../../../hooks/posts";
import PostCard from "../cards/PostCard";

type Props = {
  creatorId: any;
};

const PostsGrid = ({ creatorId }: Props) => {
  const { data, error, size, setSize } = usePosts({ creatorId });
  const bg = useColorModeValue("white", "gray.900");
  const color = useColorModeValue("gray.900", "white");

  const posts = data ? data.reduce((acc, val) => [...acc, ...val], []) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 12);

  return (
    <Box alignContent="center">
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={6}
      >
        {posts.map((post: Post) => (
          <PostCard key={post._id + 1000} data={post} />
        ))}
      </Grid>
      <Box></Box>
      <Button
        display="flex"
        justify-content="center"
        align-items="center"
        type="button"
        color={color}
        bg={bg}
        onClick={() => setSize(size + 1)}
        disabled={isReachingEnd || isLoadingMore}
      >
        {isLoadingMore ? ". . ." : "load more"}
      </Button>
    </Box>
  );
};

export default PostsGrid;
