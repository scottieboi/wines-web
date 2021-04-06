import * as React from "react";
import "./App.scss";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Preferences from "../Preferences/Preferences";
import useApi from "./useApi";
import Endpoint from "./Endpoint";

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
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard
              fetchData={() => callEndpoint(Endpoint.FindAll)}
              allWines={apiResults.findAllResponse}
              loading={fetchingData[Endpoint.FindAll]}
            />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
