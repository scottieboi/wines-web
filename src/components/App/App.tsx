import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Endpoint, useApi } from "../ApiCalls";
import { Dashboard } from "../Dashboard";
import { Login } from "../Login";

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
            callEndpoint={callEndpoint}
            allWines={apiResults.findAllResponse}
            fetchingData={fetchingData}
          />
        </Route>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
