import React from "react";
import { useStore } from "effector-react";
import { graphControll as newGraph } from "../../../../graph";
import {
  canVisitedVertex as newCan,
  restorePath as newRe,
  addCustomAlgoritm,
} from "../../../../algoritms";
import { AlgoritmController as newAlg } from "../../../../algoritms/controller";
import { Button } from "../../atoms";
import { InfoAboutAlgoritmApi } from "../../molecules";
import { $code, handleChangeCode } from "./model";
import { codeString } from "./code-string";

const AlgoritmController = newAlg;
const restorePath = newRe;
const canVisitedVertex = newCan;
const graphControll = newGraph;

let foo = null;

export function CodeArea({ onRequestClose }) {
  const code = useStore($code);

  const handleChangeAlgoritm = React.useCallback(() => {
    foo = new Function(
      "AlgoritmController",
      "restorePath",
      "canVisitedVertex",
      "graphControll",
      `return ${code}`
    );

    addCustomAlgoritm(
      foo(AlgoritmController, restorePath, canVisitedVertex, graphControll)
    );

    onRequestClose();
  }, [onRequestClose, code]);

  return (
    <>
      <InfoAboutAlgoritmApi codeString={codeString} />
      <textarea
        style={{ height: "200px", width: "100%" }}
        onChange={(e) => handleChangeCode(e.target.value)}
        value={code}
      />
      <Button onClick={handleChangeAlgoritm}>Сохранить</Button>
    </>
  );
}
