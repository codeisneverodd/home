import { useColorModeValue } from "@chakra-ui/react";
import { Prob } from "../solution-pass/hooks/useRepo";

export default function useColor() {
  const bodyBg = useColorModeValue("white", "gray.800");
  const subtleBg = useColorModeValue("gray.100", "gray.700");
  const levelColors: { [key in Prob["level"]]: string } = {
    0: "#2189ff",
    1: "#1bbaff",
    2: "#47c84c",
    3: "#ffa800",
    4: "#ff6b18",
    5: "#c658e1"
  };

  return { bodyBg, subtleBg, levelColors };
}

// --chakra-colors-chakra-body-text: var(--chakra-colors-gray-800);
// --chakra-colors-chakra-border-color: var(--chakra-colors-gray-200);
// --chakra-colors-chakra-placeholder-color: var(--chakra-colors-gray-500);
// --chakra-colors-chakra-body-text: var(--chakra-colors-whiteAlpha-900);
//     --chakra-colors-chakra-border-color: var(--chakra-colors-whiteAlpha-300);
//     --chakra-colors-chakra-placeholder-color: var(--chakra-colors-whiteAlpha-400);
