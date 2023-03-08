import useColor from "@/hooks/useColor";
import { Avatar, Flex } from "@chakra-ui/react";
import Logo from "../Logo";
import DarkModeSwitch from "./DarkModeSwitch";
import SearchBar from "./SearchBar";

export default function Header() {
  const { bodyBg } = useColor();
  return (
    <Flex
      py="20px"
      px="48px"
      alignItems="center"
      gap="40px"
      position="sticky"
      top="0"
      w="full"
      h="100px"
      zIndex="sticky"
      bg={bodyBg}
    >
      <Logo size="44px" />
      <SearchBar />
      <DarkModeSwitch />
      <Avatar />
    </Flex>
  );
}
