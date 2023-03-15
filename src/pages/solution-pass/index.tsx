import MainLayout from "@/lib/components/MainLayout";
import ResultSection from "@/lib/solution-pass/components/ResultSection";
import SearhBar from "@/lib/solution-pass/components/SearchBar";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <MainLayout title="Solution Pass">
      <Flex
        w="full"
        maxW="1000px"
        direction="column"
        pt="20px"
        align="center"
        m="auto"
        gap="20px"
      >
        <SearhBar />
        <ResultSection />
      </Flex>
    </MainLayout>
  );
}
