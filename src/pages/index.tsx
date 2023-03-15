import MainLayout from "@/lib/components/MainLayout";
import { Center, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <MainLayout title="Home">
      <Center w="full" h="calc(100vh - 100px)">
        <Text fontSize="6xl" fontWeight="bold">
          codeisneverodd
        </Text>
      </Center>
    </MainLayout>
  );
}
