import { Box } from "@chakra-ui/react";
import Results from "./Results";

export default function Main() {
  return (
    <Box
      ml={{ sm: "0", md: "120px" }}
      minW="xl"
      maxW="800px"
      w="full"
      zIndex="base"
    >
      <Results />
    </Box>
  );
}
