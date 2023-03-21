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
  selectedLangs: Lang[];
}>({
  key: "solution-pass-searchAtom",
  default: {
    status: "loading",
    keyword: "",
    probs: [],
    selectedProb: null,
    code: "",
    selectedLangs: ["JavaScript", "Python"]
  },
  effects: [localStorageEffect("solution-pass-searchAtom")]
});

export default function useSearch() {
  const [result, setResult] = useRecoilState(searchAtom);
  const reset = useResetRecoilState(searchAtom);
  const { probsQuery } = useRepo();

  const search = (keyword: string) => {
    if (probsQuery.data) {
      setResult(prev => ({
        ...prev,
        status: probsQuery.status,
        keyword,
        probs: probsQuery.data.filter(
          p =>
            chosungIncludes(p.title, keyword) ||
            hangulIncludes(p.title, keyword)
        )
      }));
    } else {
      setResult(prev => ({
        ...prev,
        status: probsQuery.status,
        keyword,
        probs: []
      }));
    }
  };

  const selectProb = (probId: string) => {
    setResult(prev => ({
      ...prev,
      selectedProb: probsQuery.data?.find(p => p.id === probId) ?? null
    }));
  };

  const addLang = (lang: Lang) => {
    setResult(prev => ({
      ...prev,
      selectedLangs: [...(prev.selectedLangs ?? []), lang]
    }));
  };
  const removeLang = (lang: Lang) => {
    setResult(prev => ({
      ...prev,
      selectedLangs: prev.selectedLangs.filter(l => l !== lang)
    }));
  };
  const toggleLang = (lang: Lang) => {
    if (result.selectedLangs?.includes(lang)) {
      removeLang(lang);
    } else {
      addLang(lang);
    }
  };
  const addAllLang = () => {
    setResult(prev => ({
      ...prev,
      selectedLangs: [...POSSIBLE_LANGS]
    }));
  };
  const removeAllLang = () => {
    setResult(prev => ({
      ...prev,
      selectedLangs: []
    }));
  };
  const toggleAllLang = () => {
    if (result.selectedLangs?.length === POSSIBLE_LANGS.length) {
      removeAllLang();
    } else {
      addAllLang();
    }
  };

  const setCode = (code: string) => {
    setResult(prev => ({
      ...prev,
      code
    }));
  };

  return {
    result,
    search,
    selectProb,
    addLang,
    removeLang,
    toggleLang,
    addAllLang,
    removeAllLang,
    toggleAllLang,
    reset,
    setCode
  };
}

export const POSSIBLE_LANGS = ["JavaScript", "Python"] as const;
export type Lang = "JavaScript" | "Python";
