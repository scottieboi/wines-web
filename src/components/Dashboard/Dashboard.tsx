import { Container, makeStyles, Paper } from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import { Loading } from "../Loading";
import { Endpoint } from "../../types";
import { Title } from "../Title";
import { TopBar } from "../TopBar";
import AllWinesTable from "./AllWinesTable";
import { useApi, useAppSelector } from "../App/hooks";

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

const Dashboard = (): JSX.Element => {
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const classes = useStyles();
  const callEndpoint = useApi();

  const loading = useAppSelector(
    (state) => state.fetchingData[Endpoint.FindAllWines]
  );
  const allWines = useAppSelector((state) => state.findAllWinesResponse);

  useEffect(() => {
    if (shouldFetchData && !loading) {
      callEndpoint(Endpoint.FindAllWines);
      setShouldFetchData(false);
    }
  }, [shouldFetchData, loading, callEndpoint]);
  return (
    <div className={classes.root}>
      <TopBar titleText="Dashboard" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Paper className={classes.paper}>
            <Title>All wines</Title>
            {loading || allWines === null ? (
              <Loading />
            ) : (
              <AllWinesTable data={allWines} />
            )}
          </Paper>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
