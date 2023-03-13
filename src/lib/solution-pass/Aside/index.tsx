import { Box, Flex } from "@chakra-ui/react";

export default function Aside() {
  return (
    <Flex
      w={{ sm: "full", md: "400px" }}
      direction={{ sm: "row", md: "column" }}
      bg="green"
    >
      <Box h="200px">선택된 문제 </Box>
    </Flex>
  );
}
