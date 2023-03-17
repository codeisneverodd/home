import MainLayout from "@/lib/components/MainLayout";
import ModeToggleBtn from "@/lib/solution-pass/components/ModeToggleBtn";
import ResultSection from "@/lib/solution-pass/components/ResultSection";
import SearhBar from "@/lib/solution-pass/components/SearchBar";
import SolutionPassLayout from "@/lib/solution-pass/components/SolutionPassLayout";
import { Link } from "@chakra-ui/react";

export default function SolutionPass() {
  return (
    <MainLayout title="새로운 풀이">
      <SolutionPassLayout>
        <SearhBar />
        <ResultSection />
        <Link href="/solution-pass/new">
          <ModeToggleBtn mode="search" aria-label="풀이 추가하기" />
        </Link>
      </SolutionPassLayout>
    </MainLayout>
  );
}
