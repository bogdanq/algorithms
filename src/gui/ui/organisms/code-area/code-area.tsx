import React, { useCallback } from "react";
import { useStore } from "effector-react";
import AceEditor from "react-ace";

import {
  addCustomAlgoritm,
  AlgoritmController,
  restorePath,
  canVisitedVertex,
} from "../../../../algoritms";

import { Button } from "../../atoms";

import { $trimmedEditorCode, handleChangeCode } from "./model";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";

export function CodeArea({ onRequestClose }: { onRequestClose: () => void }) {
  const code = useStore($trimmedEditorCode);

  const handleChangeAlgoritm = useCallback(() => {
    try {
      const customFunction = new Function(
        "utils",
        code.replace("function", "return function")
      )({ AlgoritmController, canVisitedVertex, restorePath });

      addCustomAlgoritm(customFunction);
    } catch (e) {
      alert(e);
    } finally {
      onRequestClose();
    }
  }, [onRequestClose, code]);

  return (
    <>
      <AceEditor
        value={code}
        onChange={(nextCode) => {
          handleChangeCode(nextCode);
        }}
        style={{
          width: "100%",
          marginBottom: 30,
        }}
        mode="javascript"
        theme="tomorrow"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        fontSize={14}
        showPrintMargin
        showGutter
        highlightActiveLine
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: false,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      <Button onClick={handleChangeAlgoritm}>Сохранить</Button>
    </>
  );
}
