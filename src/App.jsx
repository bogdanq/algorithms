import React, { useLayoutEffect } from "react";
import { renderCanvas } from "./canvas";
import { InfoDraggable } from "./gui/ui/organisms/info-block";
import { RightSideBar } from "./gui/ui/organisms/right-side-bar";

import "./styles.css";

export default function App() {
  useLayoutEffect(() => {
    const canvas = document.querySelector("canvas");

    if (canvas) {
      const context = canvas.getContext("2d");

      if (context) {
        renderCanvas(canvas, context);
      }
    }
  }, []);

  return (
    <>
      <RightSideBar />
      <InfoDraggable />
    </>
  );
}
