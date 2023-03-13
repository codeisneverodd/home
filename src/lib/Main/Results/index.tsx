import {
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import { faBook, faCode, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProblemList from "./ProblemList";
import Solutions from "./Solutions";
import Submit from "./Submit";

const tabs: { icon: typeof faBook; title: string; Panel: JSX.Element }[] = [
  { icon: faBook, title: "문제", Panel: <ProblemList /> },
  { icon: faCode, title: "정답", Panel: <Solutions /> },
  { icon: faEdit, title: "제출", Panel: <Submit /> }
];

export default function Results() {
  return (
    <Tabs isLazy>
      <TabList>
        {tabs.map(({ icon, title }) => (
          <Tab gap="8px">
            <Icon as={FontAwesomeIcon} icon={icon} />
            {title}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map(({ Panel }) => (
          <TabPanel>{Panel}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
