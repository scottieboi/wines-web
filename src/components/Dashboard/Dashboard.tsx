import {
  CircularProgress,
  Container,
  makeStyles,
  Paper,
} from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import { AllWinesResponse } from "../ApiCalls/ApiResponseTypes";
import { Title } from "../Title";
import { TopBar } from "../TopBar";

interface DashboardProps {
  allWines: Array<AllWinesResponse>;
  loading: boolean;
  fetchData: () => void;
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
  progress: {
    margin: "0 auto",
  },
}));

const Dashboard: React.FunctionComponent<DashboardProps> = (
  props: DashboardProps
) => {
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const classes = useStyles();

  const { fetchData, allWines, loading } = props;
  useEffect(() => {
    if (shouldFetchData && !loading) {
      fetchData();
      setShouldFetchData(false);
    }
  }, [shouldFetchData, loading, fetchData]);
  return (
    <div className={classes.root}>
      <TopBar titleText="Dashboard" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Paper className={classes.paper}>
            <Title>All wines</Title>
            {loading ? (
              <CircularProgress className={classes.progress} />
            ) : (
              <h2>{JSON.stringify(allWines)}</h2>
            )}
          </Paper>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
