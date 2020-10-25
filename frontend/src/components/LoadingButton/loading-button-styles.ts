import { createStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    spinner: {
      color: theme.palette.common.white,
    },
  });

export default styles;
