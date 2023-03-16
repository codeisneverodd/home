import { useQuery } from "@tanstack/react-query";

import { z } from "zod";

const getRepo = (() => {
  const isRepo = (repo: any): repo is Repo => {
    const scheme = z.object({
      probs: z.array(
        z.object({ id: z.string(), level: z.number(), title: z.string() })
      ),
      sols: z.array(
        z.object({
          id: z.string(),
          probId: z.string(),
          code: z.string(),
          author: z.string()
        })
      )
    });

    return scheme.safeParse(repo).success;
  };

  return async () => {
    const res = await fetch(
      "https://raw.githubusercontent.com/codeisneverodd/programmers-coding-test/main-v2/build/db/db.json"
    );

    const data = await res.json();

    if (!isRepo(data)) throw new Error("Repo API에 올바른 응답값이 없습니다.");

    return data;
  };
})();

export const repoQueryOptions = {
  all: {
    queryKey: ["repo"],
    queryFn: getRepo
  }
};

export default function useRepo() {
  const repoQuery = useQuery(repoQueryOptions.all);

  return { repoQuery };
}

export type Prob = {
  id: string;
  title: string;
  level: 0 | 1 | 2 | 3 | 4 | 5;
};

export type Sol = {
  id: string;
  probId: string;
  code: string;
  author: string;
};

export type Repo = {
  probs: Prob[];
  sols: Sol[];
};
