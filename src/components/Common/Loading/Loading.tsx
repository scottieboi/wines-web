import * as React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  progress: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
}));

const Loading = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
