import * as React from "react";
import { useState } from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Preferences from "../Preferences/Preferences";

function App(): JSX.Element {
  const [token, setToken] = useState<string>();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
