import * as React from "react";
import { useEffect, useState } from "react";
import { Loading } from "../../Common/Loading";
import { Endpoint } from "../../../types";
import { Title } from "../../Common/Title";
import AllWinesTable from "./AllWinesTable";
import { useApi, useAppSelector } from "../../App/hooks";
import { Page } from "../../Common/Page";
import { Tile } from "../../Common/Tile";

const Dashboard = (): JSX.Element => {
  const [shouldFetchData, setShouldFetchData] = useState(true);
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
    <Page>
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
