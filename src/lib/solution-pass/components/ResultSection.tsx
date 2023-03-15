import {
  Box,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import { faBook, faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import ProblemResult from "./ProblemResult";
import SolutionResult from "./SolutionResult";

export default function Main() {
  const tabs = useRef<
    { icon: typeof faBook; title: string; Panel: JSX.Element }[]
  >([
    { icon: faBook, title: "문제", Panel: <ProblemResult /> },
    { icon: faCode, title: "정답", Panel: <SolutionResult /> }
  ]);

  return (
    <Box
      ml={{ sm: "0", md: "120px" }}
      minW="xl"
      maxW="800px"
      w="full"
      zIndex="base"
    >
      <Tabs isLazy>
        <TabList>
          {tabs.current.map(({ icon, title }) => (
            <Tab gap="8px">
              <Icon as={FontAwesomeIcon} icon={icon} />
              {title}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabs.current.map(({ Panel }) => (
            <TabPanel>{Panel}</TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
