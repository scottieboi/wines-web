import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useAppSelector, useApi } from "./hooks";
import { Dashboard } from "../Dashboard";
import { Login } from "../Login";

function App(): JSX.Element {
  const token = useAppSelector((state) => state.token);
  const callEndpoint = useApi();

  if (!token) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard">
          <Dashboard callEndpoint={callEndpoint} />
        </Route>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
