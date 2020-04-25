import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

export * from "./model";
export * from "./ui/model";
export * from "./algoritms/model";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
