import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { initialState, reducer } from "../../StateManagement";
import { useApi } from "../../ApiCalls";
import { Dashboard } from "../Dashboard";
import { Login } from "../Login";

export const AppContext = React.createContext(null);

function App(): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { isLoggedIn, setToken, callEndpoint } = useApi(state.token, dispatch);

  if (!isLoggedIn) {
    return <Login setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard">
          <Dashboard
            callEndpoint={callEndpoint}
            allWines={state.findAllWinesResponse}
            fetchingData={state.fetchingData}
          />
        </Route>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
