import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../State/hooks";
import useApi from "../../State/useApi";
import { Dashboard } from "../Dashboard";
import { Login } from "../Login";

function App(): JSX.Element {
  const token = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();
  const { isLoggedIn, setToken, callEndpoint } = useApi(token, dispatch);

  if (!isLoggedIn) {
    return <Login setToken={setToken} />;
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
