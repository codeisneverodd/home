import useColor from "@/lib/@hooks/useColor";
import { Button, Icon, IconButton } from "@chakra-ui/react";
import { faPencil, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentProps } from "react";

const modeIcon: {
  [key in ModeToggleBtnProps["mode"]]: {
    icon: typeof faPencil;
    title: string;
  };
} = {
  write: {
    icon: faPencil,
    title: "정답 추가하기"
  },
  search: {
    icon: faSearch,
    title: "정답 검색하기"
  }
};

export default function ModeToggleBtn({ mode, ...props }: ModeToggleBtnProps) {
  const { accentBg, subtleBg } = useColor();
  return (
    <Button
      rounded="full"
      pos="fixed"
      bottom="40px"
      right="40px"
      size="lg"
      variant="solid"
      shadow="lg"
      _dark={{
        bg: accentBg,
        _hover: {
          bg: subtleBg
        }
      }}
      leftIcon={<Icon as={FontAwesomeIcon} icon={modeIcon[mode].icon} />}
      {...props}
    >
      {modeIcon[mode].title}
    </Button>
  );
}

type ModeToggleBtnProps = {
  mode: "write" | "search";
} & ComponentProps<typeof IconButton>;
