import React from "react";
import { Container, makeStyles, Grid } from "@material-ui/core";
import { Tag, TagList } from "./report/";
import { AnalyserResult } from "../../../modules/analyser";
import styles from "./report/report-styles";

const useStyles = makeStyles(styles);

interface ReportProps extends AnalyserResult {}

const Report = ({
  longestPath,
  longestPathWithMostCommonTag,
  mostCommonTag,
  uniqueTags,
}: ReportProps) => {
  const classes = useStyles();
  const report = [
    {
      label: "Unique tags",
      data: uniqueTags,
    },
    {
      label: "Most common tags",
      data: mostCommonTag,
    },
    {
      label: "Longest path",
      data: longestPath,
    },
    {
      label: "Longest path with most common tag",
      data: longestPathWithMostCommonTag,
    },
  ];
  return (
    <Container classes={{ root: classes.container }}>
      <Grid container>
        {report.map(({ label, data }) => (
          <TagList key={label} label={label}>
            {data.map((tag, index, array) => (
              <Tag key={index} name={tag} />
            ))}
          </TagList>
        ))}
      </Grid>
    </Container>
  );
};

export default Report;
