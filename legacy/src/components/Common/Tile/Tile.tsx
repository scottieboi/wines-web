import { makeStyles, Paper } from "@material-ui/core";
import * as React from "react";

interface TileProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const Tile: React.FunctionComponent<TileProps> = ({ children }: TileProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <>{children}</>
    </Paper>
  );
};

export default Tile;
