import { getRepo } from "@/api/solutions";
import { useQuery } from "@tanstack/react-query";

export default function useRepo() {
  const repoQuery = useQuery({ queryKey: ["repo"], queryFn: getRepo });

  return { repoQuery };
}
