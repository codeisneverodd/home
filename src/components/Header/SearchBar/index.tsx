import { Input, InputGroup } from "@chakra-ui/react";
import { ComponentProps } from "react";

type SearchBarProps = {} & ComponentProps<typeof Input>;

export default function SearchBar({ ...restProps }: SearchBarProps) {
  return (
    <InputGroup>
      <Input
        size="lg"
        flex="1"
        rounded="full"
        maxW="800px"
        variant="filled"
        {...restProps}
      />
    </InputGroup>
  );
}
