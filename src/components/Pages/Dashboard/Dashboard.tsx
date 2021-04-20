import * as React from "react";
import { useEffect, useState } from "react";
import { Loading } from "../../Common/Loading";
import { Title } from "../../Common/Title";
import AllWinesTable from "./AllWinesTable";
import { useAppSelector } from "../../../hooks/hooks";
import { Page } from "../../Common/Page";
import { Tile } from "../../Common/Tile";
import { useFindAllWines } from "../../../hooks";

const Dashboard = (): JSX.Element => {
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const callEndpoint = useFindAllWines();

  const loading = useAppSelector((state) => state.findAllWines.loading);
  const allWines = useAppSelector((state) => state.findAllWines.response);

  useEffect(() => {
    if (shouldFetchData && !loading) {
      callEndpoint();
      setShouldFetchData(false);
    }
  }, [shouldFetchData, loading, callEndpoint]);
  return (
    <Page titleText="Dashboard">
      <Tile>
        <Title>All wines</Title>
        {loading || allWines === null ? (
          <Loading />
        ) : (
          <AllWinesTable data={allWines} />
        )}
      </Tile>
    </Page>
  );
};

export default Dashboard;
