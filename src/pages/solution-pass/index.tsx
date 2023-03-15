import MainLayout from "@/lib/components/MainLayout";
import Aside from "@/lib/solution-pass/components/Aside";
import ResultSection from "@/lib/solution-pass/components/ResultSection";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <MainLayout title="Solution Pass">
      <Flex w="full" direction={{ sm: "column-reverse", md: "row" }} pt="20px">
        <ResultSection />
        <Aside />
      </Flex>
    </MainLayout>
  );
}
