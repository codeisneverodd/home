import useColor from "@/lib/@hooks/useColor";
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

export default function SearchResultSection() {
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
      <Text flex="1" textAlign="left">
        제목
      </Text>
      <Text w="60px">정답 수</Text>
      <Text w="40px">정답</Text>
    </Flex>
  );
}

function TableContent() {
  const { probsQuery } = useRepo();
  const { result } = useSearch();
  const [itemsInViewLength, setItemsInViewLength] = useState(30);

  if (probsQuery.isLoading) {
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
  if (probsQuery.isError) return null;

  if (result.keyword !== "" && result.probs.length === 0) {
    return (
      <Center h="60px" px="20px" pb="20px">
        <Text>일치하는 문제가 없어요</Text>
      </Center>
    );
  }

  if (result.selectedLangs?.length === 0) {
    return (
      <Center h="60px" px="20px" pb="20px">
        <Text>언어를 선택해주세요</Text>
      </Center>
    );
  }
  const items = (result.keyword === "" ? probsQuery.data : result.probs)
    .slice()
    .sort((a, b) => b.solvedCount - a.solvedCount);

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

function TableRow({ probData: { title, id } }: { probData: Prob }) {
  const { solsQuery } = useRepo();
  const { result } = useSearch();
  const solutions = solsQuery.data?.filter(
    s => s.probId === id && result.selectedLangs?.includes(s.lang)
  );

  const { getCountColor } = useColor();

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
          <Text flex="1">{title}</Text>
          <Text
            w="60px"
            textAlign="center"
            fontWeight="bold"
            color={getCountColor(solutions?.length ?? 0)}
          >
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

function Solutions({ solData: { author, code, lang } }: { solData: Sol }) {
  const toast = useToast();
  const { getLangColor } = useColor();
  return (
    <Flex direction="column" gap="20px">
      <Flex align="center" justify="space-between">
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
        <Center bg={getLangColor(lang)} px="12px" h="30px" rounded="4px">
          <Text fontWeight="extrabold" color="black">
            {lang}
          </Text>
        </Center>
      </Flex>

      <Box as="pre" w="full" overflow="hidden" pos="relative">
        <IconButton
          icon={<Icon as={FontAwesomeIcon} icon={faCopy} />}
          aria-label="코드 복사"
          onClick={() => {
            navigator.clipboard.writeText(code);
            toast({
              title: "코드가 복사되었어요",
              status: "success",
              duration: 1000
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
  await queryClient.prefetchQuery(repoQueryOptions.probs);
  await queryClient.prefetchQuery(repoQueryOptions.sols);

  const props: CustomAppProps["pageProps"] = {
    dehydratedState: dehydrate(queryClient)
  };

  return {
    props
  };
}
