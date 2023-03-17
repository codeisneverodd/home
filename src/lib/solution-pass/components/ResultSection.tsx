import useColor from "@/lib/hooks/useColor";
import { CustomAppProps } from "@/pages/_app";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Center,
  Code,
  Flex,
  Icon,
  IconButton,
  Spinner,
  Text,
  useToast
} from "@chakra-ui/react";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { InView } from "react-intersection-observer";
import useRepo, { Prob, repoQueryOptions, Sol } from "../hooks/useRepo";
import useSearch from "../hooks/useSearch";

export default function ResultSection() {
  const { subtleBg } = useColor();

  return (
    <Box w="full" zIndex="base">
      <Flex
        direction="column"
        rounded="12px"
        overflow="hidden"
        bg={subtleBg}
        boxShadow="dark-sm"
      >
        <TableHeader />
        <TableContent />
      </Flex>
    </Box>
  );
}

function TableHeader() {
  return (
    <Flex
      w="full"
      px="20px"
      h="60px"
      alignItems="center"
      textAlign="center"
      fontWeight="bold"
      gap="20px"
    >
      <Text w="60px">난이도</Text>
      <Text flex="1">제목</Text>
      <Text w="60px">풀이 수</Text>
      <Text w="40px">정답</Text>
    </Flex>
  );
}

function TableContent() {
  const { repoQuery } = useRepo();
  const { result } = useSearch();
  const [itemsInViewLength, setItemsInViewLength] = useState(30);

  if (repoQuery.isLoading) {
    return (
      <Flex
        h="200px"
        px="20px"
        direction="column"
        align="center"
        justify="center"
        gap="40px"
      >
        <Text>해설을 불러오는 중이에요</Text>

        <Spinner thickness="2px" speed="1s" size="md" />
      </Flex>
    );
  }
  if (repoQuery.isError) return null;

  if (result.keyword !== "" && result.probs.length === 0) {
    return (
      <Center h="60px" px="20px">
        <Text>일치하는 문제가 없어요</Text>
      </Center>
    );
  }

  const items = (result.keyword === "" ? repoQuery.data.probs : result.probs)
    .slice()
    .sort((a, b) => a.level - b.level);

  return (
    <>
      <Accordion allowMultiple>
        {items.slice(0, itemsInViewLength).map(prob => (
          <TableRow key={prob.id} probData={prob} />
        ))}
      </Accordion>
      <InView
        as="div"
        width="100%"
        threshold={0.9}
        style={{
          display: itemsInViewLength < items.length ? "block" : "none"
        }}
        onChange={inView => {
          if (itemsInViewLength > items.length)
            setItemsInViewLength(items.length);
          if (inView) setItemsInViewLength(prev => prev + 30);
        }}
      >
        <Center h="60px" w="full" mt="20px">
          <Spinner />
        </Center>
      </InView>
    </>
  );
}

function TableRow({ probData: { title, level, id } }: { probData: Prob }) {
  const { levelColors } = useColor();
  const { repoQuery } = useRepo();
  const solutions = repoQuery.data?.sols.filter(s => s.probId === id);

  return (
    <AccordionItem w="full" content-visibility="auto">
      <AccordionButton
        as={Box}
        borderTop="0.5px solid gray"
        cursor="pointer"
        px="20px"
        h="60px"
      >
        <Flex alignItems="center" gap="20px" w="full">
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
          <Text w="60px" textAlign="center">
            {solutions?.length}
          </Text>
          <AccordionIcon w="40px" />
        </Flex>
      </AccordionButton>
      <AccordionPanel px="40px" gap="20px">
        <Flex direction="column" gap="20px">
          {solutions
            ? solutions.map(s => <Solutions key={s.id} solData={s} />)
            : "정답이 없습니다"}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}

function Solutions({ solData: { author, code } }: { solData: Sol }) {
  const toast = useToast();

  return (
    <Flex direction="column" gap="20px">
      <Link href={`https://github.com/${author}`} target="_blank">
        <Button
          h="64px"
          w="full"
          textAlign="left"
          justifyContent="left"
          gap="20px"
          variant="ghost"
        >
          <Avatar src={`https://github.com/${author}.png`} />
          <Text fontWeight="bold"> {author}</Text>
        </Button>
      </Link>
      <Box as="pre" w="full" overflow="hidden" pos="relative">
        <IconButton
          icon={<Icon as={FontAwesomeIcon} icon={faCopy} />}
          aria-label="코드 복사"
          onClick={() => {
            navigator.clipboard.writeText(code);
            toast({
              title: "코드가 복사되었어요",
              status: "success",
              duration: 1000,
              position: "bottom-left"
            });
          }}
          pos="absolute"
          top="4px"
          right="4px"
        />
        <Code
          w="full"
          rounded="8px"
          fontSize="lg"
          py="20px"
          px="12px"
          overflow="scroll"
          _light={{
            bg: "white"
          }}
        >
          {code}
        </Code>
      </Box>
    </Flex>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(repoQueryOptions.all);

  const props: CustomAppProps["pageProps"] = {
    dehydratedState: dehydrate(queryClient)
  };

  return {
    props
  };
}