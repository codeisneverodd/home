import useColor from "@/hooks/useColor";
import { Prob } from "@/types/solutions";
import { Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ProblemCardProps = {
  probData: Prob;
};

export default function ProblemCard({
  probData: { title, level }
}: ProblemCardProps) {
  const { levelColors } = useColor();

  return (
    <Flex
      alignItems="center"
      gap="20px"
      h="60px"
      px="20px"
      borderTop="0.5px solid gray"
      cursor="pointer"
    >
      <Text
        textAlign="center"
        w="60px"
        fontSize="lg"
        color={levelColors[level]}
        fontWeight="bold"
      >
        {level}
      </Text>
      <Text flex="1">{title}</Text>
      <IconButton
        icon={<Icon as={FontAwesomeIcon} icon={faChevronCircleRight} />}
        aria-label="정답 보기"
      />
    </Flex>
  );
}
