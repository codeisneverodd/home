import MainLayout from "@/lib/components/MainLayout";
import SolutionPassLayout from "@/lib/solution-pass/components/SolutionPassLayout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Text,
  VStack
} from "@chakra-ui/react";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const ISSUE_ENDPOINT =
  "https://github.com/codeisneverodd/programmers-coding-test/issues";

export default function SubmittedSol() {
  const router = useRouter();
  const { issueNum } = router.query;

  return (
    <MainLayout title="제출된 정답">
      <SolutionPassLayout gap="40px">
        <VStack py="32px" spacing="40px">
          <Text fontSize="2xl">성공적으로 제출되었어요</Text>
          <Flex gap="20px">
            <Button
              variant="outline"
              onClick={() => {
                router.back();
              }}
            >
              돌아가기
            </Button>
            <Link target="_blank" href={`${ISSUE_ENDPOINT}/${issueNum}`}>
              <Button
                colorScheme="facebook"
                rightIcon={
                  <Icon as={FontAwesomeIcon} icon={faArrowUpRightFromSquare} />
                }
              >
                제출된 정답 보기
              </Button>
            </Link>
          </Flex>
        </VStack>

        <Divider />
        <FAQ issueNum={issueNum as string} />
      </SolutionPassLayout>
    </MainLayout>
  );
}

function FAQ({ issueNum }: { issueNum: string }) {
  const faqList: { title: string; content: ReactElement }[] = [
    {
      title: "제출된 정답은 바로 정답 리스트에 반영되나요?",
      content: (
        <Text>
          제출된 정답은 확인 절차를 거쳐 평균 1주 이내에 리스트에 반영돼요.
          진행상태는{" "}
          <Link
            target="_blank"
            href={`${ISSUE_ENDPOINT}/${issueNum}`}
            style={{
              textDecoration: "underline"
            }}
          >
            제출된 정답 링크
          </Link>
          를 통해 확인하실 수 있어요!
        </Text>
      )
    },
    {
      title: "제출된 정답을 수정하고 싶어요",
      content: (
        <Text>
          제출된 정답 수정은 아직 개발중에 있어요. 우선 제출된 이슈에 댓글을
          이용해주세요!
        </Text>
      )
    }
  ];

  return (
    <Flex direction="column" w="full" gap="24px">
      <Text fontSize="2xl" fontWeight="bold">
        자주 묻는 질문
      </Text>
      <Accordion w="full" allowMultiple>
        {faqList.map(({ title, content }) => (
          <AccordionItem>
            <AccordionButton h="60px" fontSize="xl" fontWeight="semibold">
              <Box as="span" flex="1" textAlign="left">
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4} fontSize="lg">
              {content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
}
