import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useAppSelector } from "./hooks";
import { Dashboard } from "../Dashboard";
import { Login } from "../Login";
import { AddWine } from "../AddWine";
import { Path } from "../../routing";

function App(): JSX.Element {
  const token = useAppSelector((state) => state.token);

  if (!token) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path={Path.Dashboard}>
          <Dashboard />
        </Route>
        <Route path={Path.AddWine}>
          <AddWine />
        </Route>
        <Route exact path="/" render={() => <Redirect to={Path.Dashboard} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
