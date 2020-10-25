import React from "react";
import { Chip, makeStyles } from "@material-ui/core";
import styles from "./tag-styles";

const useStyles = makeStyles(styles);

interface TagProps {
  name: string;
}

const Tag = ({ name }: TagProps) => {
  const classes = useStyles();
  return (
    <div className={classes.tag}>
      <Chip label={name} />
    </div>
  );
};

export default Tag;
