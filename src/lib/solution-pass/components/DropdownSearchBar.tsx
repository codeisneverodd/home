import useColor from "@/lib/hooks/useColor";
import { Box, Center, Flex, Text, useOutsideClick } from "@chakra-ui/react";
import { ComponentProps, useRef, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { Prob } from "../hooks/useRepo";
import useSearch from "../hooks/useSearch";
import SearhBar from "./SearchBar";

export default function DropdownSearhBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex direction="column" w="full" pos="relative">
      <SearhBar rounded="none" onClick={() => setIsOpen(true)} />
      {isOpen && <Result onClose={() => setIsOpen(false)} />}
    </Flex>
  );
}

function Result({ onClose }: { onClose: () => void }) {
  const { result, select } = useSearch();
  const { subtleBg } = useColor();

  const ref = useRef(null);

  useOutsideClick({
    ref,
    handler: onClose
  });

  if (result.keyword === "") return null;
  if (result.probs.length === 0)
    return (
      <Center
        pos="absolute"
        w="full"
        top="48px"
        zIndex="modal"
        h="100px"
        bg={subtleBg}
      >
        <Text>일치하는 문제가 없어요</Text>
      </Center>
    );

  return (
    <Box ref={ref} h="260px" pos="absolute" w="full" top="48px" zIndex="modal">
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={60}
            itemCount={result.probs.length}
          >
            {({ index, style }) => (
              <ResultRow
                probData={result.probs[index]}
                style={style}
                onClick={() => {
                  select(result.probs[index].id);
                  onClose();
                }}
              />
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
}: { probData: Prob } & ComponentProps<typeof Flex>) {
  const { levelColors, subtleBg, accentBg } = useColor();

  return (
    <Flex
      key={id}
      alignItems="center"
      gap="20px"
      w="full"
      h="60px"
      rounded="none"
      bg={subtleBg}
      _hover={{ bg: accentBg }}
      cursor="pointer"
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
    </Flex>
  );
}
