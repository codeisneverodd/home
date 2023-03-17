import { QueryStatus } from "@tanstack/react-query";
import { chosungIncludes, hangulIncludes } from "@toss/hangul";
import { atom, useRecoilState, useResetRecoilState } from "recoil";
import useRepo, { Prob } from "./useRepo";

const searchAtom = atom<{
  status: QueryStatus;
  keyword: string;
  probs: Prob[];
}>({
  key: "solution-pass-searchAtom",
  default: {
    status: "loading",
    keyword: "",
    probs: []
  }
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

  return { result, search, reset };
}
