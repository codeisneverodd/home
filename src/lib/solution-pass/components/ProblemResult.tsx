import useColor from "@/lib/hooks/useColor";
import useRepo from "@/lib/solution-pass/hooks/useRepo";
import { Prob } from "@/types/solutions";
import { Flex, IconButton, Icon, Text } from "@chakra-ui/react";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProblemResult() {
  const { repoQuery } = useRepo();

  const { subtleBg } = useColor();

  if (!repoQuery.data) return null;

  return (
    <Flex
      direction="column"
      rounded="12px"
      overflow="hidden"
      bg={subtleBg}
      boxShadow="dark-sm"
    >
      <Flex
        w="full"
        px="20px"
        h="60px"
        alignItems="center"
        textAlign="center"
        fontWeight="bold"
      >
        <Text w="60px">난이도</Text>
        <Text flex="1">제목</Text>
        <Text>정답</Text>
      </Flex>
      {repoQuery.data.probs
        .sort((a, b) => a.level - b.level)
        .map(prob => (
          <ProblemCard key={prob.id} probData={prob} />
        ))}
    </Flex>
  );
}

type ProblemCardProps = {
  probData: Prob;
};

function ProblemCard({ probData: { title, level } }: ProblemCardProps) {
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
