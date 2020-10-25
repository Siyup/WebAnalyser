import { createStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(4),
    },
    btnWrapper: {
      display: "flex",
      justifyContent: "center",
      paddingBottom: theme.spacing(4),
    },
  });

export default styles;
