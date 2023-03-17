import useColor from "@/lib/hooks/useColor";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { ComponentProps } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { Prob } from "../hooks/useRepo";
import useSearch from "../hooks/useSearch";
import SearhBar from "./SearchBar";

export default function DropdownSearhBar() {
  return (
    <Flex direction="column" w="full">
      <SearhBar rounded="none" />
      <Result />
    </Flex>
  );
}

function Result() {
  const { result } = useSearch();
  const { alphaBg } = useColor();

  if (result.keyword === "") return null;
  if (result.probs.length === 0)
    return (
      <Center w="full" h="80px" bg={alphaBg}>
        <Text>일치하는 문제가 없어요</Text>
      </Center>
    );

  return (
    <Box h="260px">
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={60}
            itemCount={result.probs.length}
          >
            {({ index, style }) => (
              <ResultRow probData={result.probs[index]} style={style} />
            )}
          </FixedSizeList>
        )}
      </AutoSizer>
    </Box>
  );
}

function ResultRow({
  probData: { id, level, title },
  ...props
}: { probData: Prob } & ComponentProps<typeof Button>) {
  const { levelColors } = useColor();

  return (
    <Button
      as={Flex}
      key={id}
      alignItems="center"
      gap="20px"
      w="full"
      h="60px"
      rounded="none"
      backdropFilter="auto"
      backdropBlur="3xl"
      {...props}
    >
      <Text
        textAlign="center"
        w="60px"
        fontSize="lg"
        color={levelColors[level]}
        fontWeight="bold"
      >
        {level}
      </Text>
      <Text flex="1">{title}</Text>
    </Button>
  );
}
