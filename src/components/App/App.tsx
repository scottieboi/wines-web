import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import useApi, { Endpoint } from "../ApiCalls";
import Dashboard from "../Dashboard";
import Login from "../Login";

function App(): JSX.Element {
  const {
    isLoggedIn,
    setToken,
    callEndpoint,
    apiResults,
    fetchingData,
  } = useApi();

  if (!isLoggedIn) {
    return <Login setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard">
          <Dashboard
            fetchData={() => callEndpoint(Endpoint.FindAll)}
            allWines={apiResults.findAllResponse}
            loading={fetchingData[Endpoint.FindAll]}
          />
        </Route>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
