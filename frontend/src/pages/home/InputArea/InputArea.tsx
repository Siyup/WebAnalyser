import React from "react";
import { TextField } from "@material-ui/core";
import { TabContentProps } from "../types";

const InputArea = (props: TabContentProps) => {
  return (
    <TextField
      {...props}
      fullWidth
      multiline
      rows={10}
      placeholder="Type valid html..."
    />
  );
};

export default InputArea;
