import React from "react";
import { TextField } from "@material-ui/core";
import { TabContentProps } from "../types";

const InputURL = (props: TabContentProps) => {
  return <TextField {...props} fullWidth placeholder="Type url..." />;
};
export default InputURL;
