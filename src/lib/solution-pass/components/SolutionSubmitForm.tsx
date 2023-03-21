import useColor from "@/lib/hooks/useColor";
import {
  Avatar,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useColorMode
} from "@chakra-ui/react";
import {
  faArrowUpRightFromSquare,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@uiw/react-textarea-code-editor/dist.css";
import { signIn, signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentProps } from "react";
import useIssue from "../hooks/useIssue";
import useSearch from "../hooks/useSearch";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then(mod => mod.default),
  { ssr: false }
);

export default function SolutionSubmitForm() {
  const { colorMode } = useColorMode();

  const {
    result: { selectedProb, code },
    setCode
  } = useSearch();

  if (!selectedProb) {
    return (
      <Center w="full" h="120px">
        <Text fontSize="xl">검색 후 문제를 선택해주세요</Text>
      </Center>
    );
  }
  return (
    <>
      <Text w="full" fontSize="2xl">
        선택한 문제
      </Text>
      <SelectedProb />
      <Flex
        w="full"
        justify="space-between"
        gap="12px"
        direction={{ base: "column", md: "row" }}
      >
        <Text w="full" fontSize="2xl">
          아래에 정답을 입력해주세요
        </Text>
        <SubmitToolBar />
      </Flex>

      <CodeEditor
        value={code}
        language="js"
        placeholder="코드를 입력해주세요"
        onChange={evn => setCode(evn.target.value)}
        padding={15}
        style={{
          width: "100%",
          fontSize: "14px",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace"
        }}
        data-color-mode={colorMode}
      />
    </>
  );
}

function SelectedProb(props: ComponentProps<typeof Flex>) {
  const {
    result: { selectedProb },
    reset
  } = useSearch();
  const { subtleBg, levelColors } = useColor();

  if (!selectedProb) return null;

  const { id, level, title } = selectedProb;

  return (
    <Flex
      key={id}
      alignItems="center"
      gap="20px"
      w="full"
      h="60px"
      rounded="none"
      bg={subtleBg}
      pr="20px"
      {...props}
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

      <Link
        href={`https://school.programmers.co.kr/learn/courses/30/lessons/${id}`}
        target="_blank"
      >
        <Tooltip label="프로그래머스에서 문제 보기" placement="top">
          <IconButton
            variant="ghost"
            icon={<Icon as={FontAwesomeIcon} icon={faArrowUpRightFromSquare} />}
            aria-label="문제 보기"
          />
        </Tooltip>
      </Link>

      <IconButton
        variant="ghost"
        icon={<Icon as={FontAwesomeIcon} icon={faXmark} />}
        onClick={() => {
          reset();
        }}
        aria-label="문제 선택 해제"
      />
    </Flex>
  );
}

function SubmitToolBar() {
  const {
    result: { selectedProb, code }
  } = useSearch();
  const { createIssueMutation } = useIssue();
  const { data: session } = useSession();
  const router = useRouter();

  const handelSubmit = () => {
    if (session?.user?.name === undefined) return;

    createIssueMutation.mutate(
      {
        title: `Level ${selectedProb?.level} | ${selectedProb?.title} 풀이 | | ${session.user?.name}`,
        code,
        assignees: [session.user?.name ?? "", "codeisneverodd"]
      },
      {
        onSuccess: data => {
          router.push(`/solution-pass/new/submitted/${data.number}`);
        }
      }
    );
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Flex
      w="full"
      gap="20px"
      align="center"
      justify={{ base: "start", md: "end" }}
    >
      {session?.user ? (
        <>
          <Avatar src={session.user.image ?? ""} />
          <Text fontWeight="bold">{session.user.name}</Text>
          <Button onClick={handleSignOut}>로그아웃</Button>
          <Button
            isDisabled={code === ""}
            isLoading={createIssueMutation.isLoading}
            colorScheme="blue"
            onClick={handelSubmit}
          >
            제출
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              signIn();
            }}
          >
            GitHub 로그인
          </Button>
          <Button isDisabled>로그인 후 제출해주세요</Button>
        </>
      )}
    </Flex>
  );
}
