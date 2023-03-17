import MainLayout from "@/lib/components/MainLayout";
import DropdownSearhBar from "@/lib/solution-pass/components/DropdownSearchBar";
import ModeToggleBtn from "@/lib/solution-pass/components/ModeToggleBtn";
import SolutionPassLayout from "@/lib/solution-pass/components/SolutionPassLayout";
import Link from "next/link";

export default function NewSolution() {
  return (
    <MainLayout title="Solution Pass">
      <SolutionPassLayout>
        <DropdownSearhBar />
        <Link href="/solution-pass">
          <ModeToggleBtn mode="search" aria-label="풀이 검색하기" />
        </Link>
      </SolutionPassLayout>
    </MainLayout>
  );
}
