import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DATA_ENDPOINT =
  "https://raw.githubusercontent.com/codeisneverodd/programmers-coding-test/main-v2/data";

export default function useRepo() {
  const probsQuery = useQuery(repoQueryOptions.probs);
  const solsQuery = useQuery(repoQueryOptions.sols);

  return { probsQuery, solsQuery };
}

export const repoQueryOptions = {
  sols: {
    queryKey: ["repo", "sols"],
    queryFn: async () => {
      const res = await axios.get<Sol[]>(`${DATA_ENDPOINT}/solutions.json`);
      return res.data;
    }
  },
  probs: {
    queryKey: ["repo", "probs"],
    queryFn: async () => {
      const res = await axios.get<Prob[]>(`${DATA_ENDPOINT}/problems.json`);
      return res.data;
    }
  }
};

export type Prob = {
  id: string;
  title: string;
  solvedCount: number;
};

export type Sol = {
  id: string;
  author: string;
  code: string;
  probId: string;
  createdAt: ReturnType<typeof Date.now>;
  lang: Lang;
};

export type Lang = "JavaScript" | "Python";
