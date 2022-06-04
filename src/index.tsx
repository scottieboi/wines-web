import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { store } from "./state/store";
import { App } from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
