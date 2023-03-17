import useColor from "@/lib/hooks/useColor";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorMode
} from "@chakra-ui/react";
import {
  faClock,
  faCode,
  faHome,
  faMoon,
  faSun
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useRouter } from "next/router";
import { ComponentProps, useRef } from "react";
import Logo from "./Logo";

export default function MainLayout({
  title,
  children
}: { title: string } & ComponentProps<typeof Box>) {
  return (
    <>
      <Box>
        <Header />
        <Box w="full" pos="absolute" pt="100px">
          {children}
        </Box>
      </Box>
      <Head>
        <title>{title ?? "codeisneverodd"}</title>
        <meta
          name="description"
          content="Generated by nextjs-chakra-template"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}

function Header(props: ComponentProps<typeof Flex>) {
  const { subtleBg } = useColor();

  return (
    <Flex
      py="20px"
      px="48px"
      alignItems="center"
      gap="40px"
      position="sticky"
      top="0"
      w="full"
      h="100px"
      zIndex="sticky"
      justifyContent="space-between"
      bg={subtleBg}
      pos="fixed"
      {...props}
    >
      <Logo
        size="44px"
        style={{
          borderRadius: "100%"
        }}
      />
      <Menu />
      <DarkModeSwitch />
    </Flex>
  );
}

function Menu() {
  const router = useRouter();

  const menuItems = useRef<
    { icon: typeof faClock; title: string; href: string }[]
  >([
    { icon: faHome, title: "Home", href: "/" },
    { icon: faCode, title: "Solution Pass", href: "/solution-pass" },
    { icon: faClock, title: "Timer", href: "/timer" }
  ]);

  return (
    <Flex flex="1" justify="end">
      {menuItems.current.map(({ icon, title, href }) => (
        <Button
          key={title}
          leftIcon={<Icon as={FontAwesomeIcon} icon={icon} />}
          px="12px"
          py="8px"
          variant="ghost"
          onClick={() => {
            router.push(href);
          }}
        >
          <Text fontSize="xl">{title}</Text>
        </Button>
      ))}
    </Flex>
  );
}

function DarkModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      rounded="full"
      size="md"
      icon={
        <Icon
          as={FontAwesomeIcon}
          icon={colorMode === "dark" ? faSun : faMoon}
        />
      }
      onClick={toggleColorMode}
      aria-label="다크모드 토글 버튼"
    />
  );
}
