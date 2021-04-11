import { Container, makeStyles, Paper } from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import { Loading } from "../Loading";
import { Endpoint } from "../../Types";
import { Title } from "../Title";
import { TopBar } from "../TopBar";
import AllWinesTable from "./AllWinesTable";
import { useAppSelector } from "../../State/hooks";

interface DashboardProps {
  callEndpoint: (endpoint: Endpoint) => void;
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

const Dashboard: React.FunctionComponent<DashboardProps> = (
  props: DashboardProps
) => {
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const classes = useStyles();

  const { callEndpoint } = props;
  const fetchingData = useAppSelector((state) => state.fetchingData);
  const loading = fetchingData[Endpoint.FindAllWines];
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
