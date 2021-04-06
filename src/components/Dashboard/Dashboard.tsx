import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledDashboard = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

interface DashboardProps {
  allWines: Array<Record<string, any>>;
  loading: boolean;
  fetchData: () => void;
}

const Dashboard: React.FunctionComponent<DashboardProps> = (
  props: DashboardProps
) => {
  const [shouldFetchData, setShouldFetchData] = useState(true);

  const { fetchData, allWines, loading } = props;
  useEffect(() => {
    if (shouldFetchData && !loading) {
      fetchData();
      setShouldFetchData(false);
    }
  }, [shouldFetchData, loading, fetchData]);
  return (
    <StyledDashboard>
      {loading ? <h2>loading</h2> : <h2>{JSON.stringify(allWines)}</h2>}
    </StyledDashboard>
  );
};

export default Dashboard;
