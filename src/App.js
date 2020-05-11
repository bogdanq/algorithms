import React from "react";
import { renderCanvas } from "./canvas";
import { InfoDraggable } from "./gui/ui/organisms/info-block";
import { RightSideBar } from "./gui/ui/organisms/right-side-bar";
import "./styles.css";

export default function App() {
  return (
    <>
      <RightSideBar />
      <InfoDraggable />
    </>
  );
}
