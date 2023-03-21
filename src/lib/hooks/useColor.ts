import { useColorModeValue } from "@chakra-ui/react";
import { Prob } from "../solution-pass/hooks/useRepo";

export default function useColor() {
  const bodyBg = useColorModeValue("white", "gray.800");
  const subtleBg = useColorModeValue("gray.100", "gray.700");
  const alphaBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const accentBg = useColorModeValue("gray.200", "gray.900");
  const levelColors: { [key in Prob["level"]]: string } = {
    0: "#2189ff",
    1: "#1bbaff",
    2: "#47c84c",
    3: "#ffa800",
    4: "#ff6b18",
    5: "#c658e1"
  };

  return { bodyBg, subtleBg, alphaBg, accentBg, levelColors };
}
