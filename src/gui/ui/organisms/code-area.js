import React from "react";
import { graphControll as newGraph } from "../../../graph";
import {
  canVisitedVertex as newCan,
  restorePath as newRe,
  addCustomAlgoritm,
} from "../../../algoritms";
import { AlgoritmController as newAlg } from "../../../algoritms/controller";

const AlgoritmController = newAlg;
const restorePath = newRe;
const canVisitedVertex = newCan;
const graphControll = newGraph;

let foo = null;

export function CodeArea() {
  const [value, setValue] = React.useState("");

  return (
    <div>
      <textarea
        style={{ height: "300px", width: "250px" }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button
        onClick={() => {
          foo = new Function(
            "AlgoritmController",
            "restorePath",
            "canVisitedVertex",
            "graphControll",
            `return ${value}`
          );

          addCustomAlgoritm(
            foo(
              AlgoritmController,
              restorePath,
              canVisitedVertex,
              graphControll
            )
          );
        }}
      >
        go
      </button>
    </div>
  );
}
