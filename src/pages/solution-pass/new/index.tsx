import MainLayout from "@/lib/@components/MainLayout";
import useClient from "@/lib/@hooks/useClient";
import DropdownSearhBar from "@/lib/solution-pass/components/DropdownSearchBar";
import ModeToggleBtn from "@/lib/solution-pass/components/ModeToggleBtn";
import SolutionPassLayout from "@/lib/solution-pass/components/SolutionPassLayout";
import SolutionSubmitForm from "@/lib/solution-pass/components/SolutionSubmitForm";
import Link from "next/link";

export default function NewSolution() {
  const isClient = useClient();

  if (!isClient) return null;

  return (
    <MainLayout title="새로운 정답">
      <SolutionPassLayout>
        <DropdownSearhBar />
        <SolutionSubmitForm />
        <Link href="/solution-pass">
          <ModeToggleBtn mode="search" aria-label="정답 검색하기" />
        </Link>
      </SolutionPassLayout>
    </MainLayout>
  );
}
