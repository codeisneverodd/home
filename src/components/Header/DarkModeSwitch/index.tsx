import { Icon, IconButton, useColorMode } from "@chakra-ui/react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DarkModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      rounded="full"
      size="md"
      icon={
        <Icon
          as={FontAwesomeIcon}
          icon={colorMode === "dark" ? faSun : faMoon}
        />
      }
      onClick={toggleColorMode}
      aria-label="다크모드 토글 버튼"
    />
  );
}
