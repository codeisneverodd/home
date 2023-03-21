import { Flex } from "@chakra-ui/react";
import { ComponentProps } from "react";

export default function SolutionPassLayout(props: ComponentProps<typeof Flex>) {
  return (
    <Flex
      w="full"
      maxW="1000px"
      direction="column"
      pt="20px"
      align="center"
      m="auto"
      px="20px"
      gap="20px"
      {...props}
    />
  );
}
