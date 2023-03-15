import MainLayout from "@/lib/@common/layouts/MainLayout";
import Aside from "@/lib/solution-pass/Aside";
import Main from "@/lib/solution-pass/Main";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <MainLayout title="Solution Pass">
      <Flex w="full" direction={{ sm: "column-reverse", md: "row" }} pt="20px">
        <Main />
        <Aside />
      </Flex>
    </MainLayout>
  );
}
