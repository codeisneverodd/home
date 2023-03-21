import { localStorageEffect } from "@/lib/@utils/storageEffect";
import { QueryStatus } from "@tanstack/react-query";
import { chosungIncludes, hangulIncludes } from "@toss/hangul";
import { atom, useRecoilState, useResetRecoilState } from "recoil";
import useRepo, { Prob } from "./useRepo";

const searchAtom = atom<{
  status: QueryStatus;
  keyword: string;
  probs: Prob[];
  selectedProb: Prob | null;
  code: string;
}>({
  key: "solution-pass-searchAtom",
  default: {
    status: "loading",
    keyword: "",
    probs: [],
    selectedProb: null,
    code: ""
  },
  effects: [localStorageEffect("solution-pass-searchAtom")]
});

export default function useSearch() {
  const [result, setResult] = useRecoilState(searchAtom);
  const reset = useResetRecoilState(searchAtom);
  const { repoQuery } = useRepo();

  const search = (keyword: string) => {
    if (repoQuery.data) {
      setResult(prev => ({
        ...prev,
        status: repoQuery.status,
        keyword,
        probs: repoQuery.data.probs.filter(
          p =>
            chosungIncludes(p.title, keyword) ||
            hangulIncludes(p.title, keyword)
        )
      }));
    } else {
      setResult(prev => ({
        ...prev,
        status: repoQuery.status,
        keyword,
        probs: []
      }));
    }
  };

  const select = (probId: string) => {
    setResult(prev => ({
      ...prev,
      selectedProb: repoQuery.data?.probs.find(p => p.id === probId) ?? null
    }));
  };

  const setCode = (code: string) => {
    setResult(prev => ({
      ...prev,
      code
    }));
  };

  return { result, search, select, reset, setCode };
}
