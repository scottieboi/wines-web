import { Container, makeStyles } from "@material-ui/core";
import * as React from "react";
import { TopBar } from "../TopBar";

interface PageProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const Page: React.FunctionComponent<PageProps> = ({ children }: PageProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar titleText="Dashboard" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <>{children}</>
        </Container>
      </main>
    </div>
  );
};

export default Page;
