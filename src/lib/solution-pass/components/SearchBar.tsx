import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner
} from "@chakra-ui/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentProps, useState } from "react";
import useSearch from "../hooks/useSearch";

let timeoutId: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_TIME = 100;

export default function SearhBar(props: ComponentProps<typeof Input>) {
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { search, result } = useSearch();

  const handleTyping = (keyword: string) => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsTyping(true);
    setValue(keyword);
    timeoutId = setTimeout(() => {
      setIsTyping(false);
      search(keyword);
    }, DEBOUNCE_TIME);
  };

  return (
    <InputGroup size="lg">
      <InputLeftElement>
        <Icon as={FontAwesomeIcon} icon={faSearch} />
      </InputLeftElement>
      <Input
        value={value === "" ? result.keyword : value}
        variant="filled"
        type="text"
        onChange={e => handleTyping(e.target.value)}
        autoComplete="off"
        placeholder="문제를 검색해주세요"
        {...props}
      />

      <InputRightElement>
        <Spinner
          display={isTyping ? "block" : "none"}
          thickness="2px"
          speed="1s"
          size="md"
        />
      </InputRightElement>
    </InputGroup>
  );
}
