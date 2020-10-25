import React from "react";
import { Box, Typography } from "@material-ui/core";

interface TabPanelProps {
  children?: React.ReactNode;
  isActive: boolean;
}

const TabPanel = ({ children, isActive }: TabPanelProps) => {
  return isActive ? (
    <div role="tabpanel">
      <Box p={3}>
        <Typography>{children}</Typography>
      </Box>
    </div>
  ) : null;
};

export default TabPanel;
