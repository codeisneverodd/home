/* eslint-disable import/prefer-default-export */
import { Repo } from "@/types/solutions";
import { z } from "zod";

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

export const getRepo = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/codeisneverodd/programmers-coding-test/main-v2/build/db/db.json"
  );

  const data = await res.json();

  if (!isRepo(data)) throw new Error("Repo API에 올바른 응답값이 없습니다.");

  return data;
};
