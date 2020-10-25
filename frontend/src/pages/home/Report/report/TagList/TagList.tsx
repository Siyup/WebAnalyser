import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import styles from "./tag-list-styles";

const useStyles = makeStyles(styles);

interface TagListProps {
  children: React.ReactNode;
  label: string;
}

const TagList = ({ children, label }: TagListProps) => {
  const classes = useStyles();
  return (
    <Grid classes={{ root: classes.tagList }} container item xs={3}>
      {label}
      {children}
    </Grid>
  );
};

export default TagList;
