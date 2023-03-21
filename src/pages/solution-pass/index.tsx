import MainLayout from "@/lib/@components/MainLayout";
import ModeToggleBtn from "@/lib/solution-pass/components/ModeToggleBtn";
import SearchResultSection from "@/lib/solution-pass/components/SearchResultSection";
import SearhBar from "@/lib/solution-pass/components/SearchBar";
import SolutionPassLayout from "@/lib/solution-pass/components/SolutionPassLayout";
import { Link } from "@chakra-ui/react";
import LangFilter from "@/lib/solution-pass/components/LangFilter";

export default function SolutionPass() {
  return (
    <MainLayout title="Solution Pass">
      <SolutionPassLayout>
        <SearhBar />
        <LangFilter />
        <SearchResultSection />
        <Link href="/solution-pass/new">
          <ModeToggleBtn mode="write" aria-label="정답 추가하기" />
        </Link>
      </SolutionPassLayout>
    </MainLayout>
  );
}
