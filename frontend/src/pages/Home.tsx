import React from "react";
import {
  Container,
  Paper,
  Tabs,
  Tab as MuiTab,
  makeStyles,
} from "@material-ui/core";
import { useAnalyser } from "../modules/analyser";
import { InputArea, InputURL, Report, TabContentProps } from "./home/";
import { TabPanel, LoadingButton } from "../components/";
import styles from "./home/home-styles";

const useStyles = makeStyles(styles);

const DIRECT = "DIRECT";
const FROM_URL = "FROM_URL";

interface Tab {
  label: string;
  value: string;
  Component: React.FunctionComponent<TabContentProps>;
}

const tabs: Array<Tab> = [
  {
    label: "Input",
    value: DIRECT,
    Component: InputArea,
  },
  {
    label: "URL",
    value: FROM_URL,
    Component: InputURL,
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = React.useState(tabs[0].value);
  const [inputValue, setInputValue] = React.useState("");
  const {
    analyseTreeFromUrl,
    analyseTreeFromInput,
    isLoading,
    result,
    error,
  } = useAnalyser();
  const classes = useStyles();
  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: string) => {
    setActiveTab(newValue);
    setInputValue("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleSubmit = () => {
    const analyseTree =
      activeTab === DIRECT ? analyseTreeFromInput : analyseTreeFromUrl;
    analyseTree(inputValue);
  };

  return (
    <Container classes={{ root: classes.container }}>
      <Paper>
        <Tabs value={activeTab} onChange={handleTabChange}>
          {tabs.map((tab) => (
            <MuiTab {...tab} />
          ))}
        </Tabs>
        {tabs.map(({ Component, ...tab }) => (
          <TabPanel isActive={tab.value === activeTab}>
            <Component
              value={inputValue}
              onChange={handleInputChange}
              error={Boolean(error)}
              label={error}
            />
          </TabPanel>
        ))}
        <div className={classes.btnWrapper}>
          <LoadingButton
            onClick={handleSubmit}
            disabled={isLoading}
            isLoading={isLoading}
          >
            Analyse!
          </LoadingButton>
        </div>
      </Paper>
      {result !== null && !isLoading && (
        <Paper>
          <Report {...result} />
        </Paper>
      )}
    </Container>
  );
};

export default Home;
