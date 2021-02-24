import {
  Box,
  Button,
  Flex,
  FormControl,
  InputGroup,
  Stack,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

const AddPostForm = () => {
  const [msg, setMsg] = useState({ message: "", isError: false });
  const [isSubmitting, setSubmitting] = useState(false);
  const bg = useColorModeValue("white", "gray.900");
  const color = useColorModeValue("primary.800", "white");
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    const body = {
      content: e.currentTarget.content.value,
    };
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      setMsg({ message: "Post Created!", isError: false });
      setMsg({ message: "", isError: false });
    } else if (res.status == 401) {
      setMsg({ message: "Account Creation Required", isError: true });
      setMsg({ message: "", isError: false });
    } else {
      setMsg({ message: "Error Creating Post", isError: true });
      setMsg({ message: "", isError: false });
    }
    setSubmitting(false);
    e.target.reset();
  };

  return (
    <Flex
      w={["100%", "100%", "100%", "100%"]}
      direction={["column", "column", "row", "column"]}
      bg={bg}
      boxShadow="unset"
      rounded="lg"
      align="center"
    >
      {msg.message
        ? toast({
            title: "Notification",
            description: msg.message,
            status: msg.isError ? "warning" : "success",
            duration: 3000,
            isClosable: true,
          })
        : null}
      <Box width={{ base: "100%", md: "700px" }} bg={bg} rounded="xl">
        <form onSubmit={handleSubmit}>
          <Stack spacing={4} marginBottom="1rem">
            <FormControl>
              <InputGroup>
                <Textarea
                  placeholder="Here is a sample placeholder for you to input some sample data to load to a sample dispaly grid. Type Away!!! But First, Create an Account!"
                  name="content"
                  id="content"
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
              Create Post
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default AddPostForm;
