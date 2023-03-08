import useColor from "@/hooks/useColor";
import useRepo from "@/hooks/useRepo";
import { Flex, Text } from "@chakra-ui/react";
import ProblemCard from "./ProblemCard";

export default function ProblemList() {
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
