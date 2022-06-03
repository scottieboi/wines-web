import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppSelector } from "~hooks";
import { Path } from "../../routing";
import { AddWine, Dashboard, Login } from "../Pages";

function App(): JSX.Element {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={Path.Dashboard} element={<Dashboard />} />
        <Route path={Path.AddWine} element={<AddWine />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
