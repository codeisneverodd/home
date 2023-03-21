import useClient from "@/lib/@hooks/useClient";
import { Checkbox, Flex, Stack, Text } from "@chakra-ui/react";
import useSearch, { POSSIBLE_LANGS } from "../hooks/useSearch";

export default function LangFilter() {
  const { result, toggleLang, toggleAllLang } = useSearch();
  const isClient = useClient();
  if (!isClient) return null;

  return (
    <Flex direction="column" w="full" pl="12px">
      <Text>언어 선택</Text>
      <Stack spacing={5} direction="row">
        <Checkbox
          isChecked={result.selectedLangs?.length === POSSIBLE_LANGS.length}
          onChange={() => {
            toggleAllLang();
          }}
        >
          전체
        </Checkbox>
        {POSSIBLE_LANGS.map(lang => (
          <Checkbox
            key={lang}
            isChecked={result.selectedLangs?.includes(lang)}
            onChange={() => {
              toggleLang(lang);
            }}
          >
            {lang}
          </Checkbox>
        ))}
      </Stack>
    </Flex>
  );
}
