import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalModalStyles } from "./global-css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <>
    <App />
    <GlobalModalStyles />
  </>,
  rootElement
);

export * from "./algoritms";
export * from "./graph";
export * from "./game";
