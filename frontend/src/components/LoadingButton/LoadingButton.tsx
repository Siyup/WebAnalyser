import React from "react";
import {
  ButtonProps,
  CircularProgress,
  Button,
  makeStyles,
} from "@material-ui/core";
import styles from "./loading-button-styles";

const useStyles = makeStyles(styles);

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton = ({
  children,
  isLoading,
  ...props
}: LoadingButtonProps) => {
  const classes = useStyles();
  return (
    <Button classes={{ root: classes.container }} {...props}>
      {isLoading ? (
        <CircularProgress classes={{ root: classes.spinner }} />
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
