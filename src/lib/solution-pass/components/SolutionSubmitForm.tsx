import useColor from "@/lib/@hooks/useColor";
import {
  Avatar,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
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
import { ComponentProps, useState } from "react";
import useIssue from "../hooks/useIssue";
import { Lang } from "../hooks/useRepo";
import useSearch, { POSSIBLE_LANGS } from "../hooks/useSearch";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then(mod => mod.default),
  { ssr: false }
);

export default function SolutionSubmitForm() {
  const { colorMode } = useColorMode();
  const [lang, setLang] = useState<Lang>("JavaScript");
  const codeLangStyle = {
    JavaScript: "js",
    Python: "py"
  };
  const {
    result: { selectedProb, code },
    setCode
  } = useSearch();
  const { createIssueMutation } = useIssue();
  const { data: session } = useSession();
  const router = useRouter();

  const handelSubmit = () => {
    if (session?.user?.name === undefined) return;

    createIssueMutation.mutate(
      {
        title: `${selectedProb?.title} 정답 | ${session.user?.name}`,
        code,
        probId: selectedProb?.id ?? "",
        author: session.user?.name ?? "",
        lang
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
      <Flex direction="column" w="full" gap="12px">
        <Text w="full" fontSize="2xl">
          풀이한 언어
        </Text>
        <RadioGroup onChange={(v: Lang) => setLang(v)} value={lang} w="full">
          <Stack direction="row">
            {POSSIBLE_LANGS.map(l => (
              <Radio key={l} value={l}>
                {l}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </Flex>
      <Flex
        w="full"
        justify="space-between"
        gap="12px"
        direction={{ base: "column", md: "row" }}
      >
        <Text w="full" fontSize="2xl">
          아래에 코드를 입력후 제출해주세요
        </Text>
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
              <Tooltip label="로그인시 요청하는 권한은 GitHub 이슈 등록을 위해 필요한 최소한의 권한이에요! 다른 용도로 사용되지 않으니 걱정 마세요">
                <Button
                  onClick={() => {
                    signIn();
                  }}
                >
                  GitHub 로그인
                </Button>
              </Tooltip>

              <Button isDisabled>로그인 후 제출해주세요</Button>
            </>
          )}
        </Flex>
      </Flex>

      <CodeEditor
        value={code}
        language={codeLangStyle[lang]}
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
  const { subtleBg } = useColor();

  if (!selectedProb) return null;

  const { id, title } = selectedProb;

  return (
    <Flex
      pl="20px"
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
