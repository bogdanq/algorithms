import React from "react";
import { useStore } from "effector-react";
import "./styles.css";
import { renderCanvas } from "./canvas";

import { getLocalSize, drawSquare } from "./config";

export default function App() {
  // const ref = React.useRef(null);
  // React.useEffect(() => {
  //   const mouseMove = (e) => {
  //     const { w, h } = getLocalSize(e.clientX, e.clientY);

  //     document.addEventListener("mousemove", mouseMove);
  //     if (ref.current) {
  //       drawSquare({
  //         context,
  //         position: [ref.current.w, ref.current.h],
  //         color: "#fff",
  //       });
  //     }
  //     drawSquare({ context, position: [w, h], color: "gray" });
  //     ref.current = { w, h };
  //   };

  //   const clearMove = () => {
  //     document.removeEventListener("mousemove", mouseMove);
  //   };

  //   const listener = (e) => {
  //     mouseMove(e);
  //   };

  //   document.addEventListener("mousedown", listener);
  //   document.addEventListener("mouseup", clearMove);
  //   renderCanvas({ cellSize: 45, borderSize: 1 });

  //   return () => {
  //     document.removeEventListener("mousedown", listener);
  //     document.removeEventListener("mousemove", mouseMove);
  //     document.removeEventListener("mouseup", clearMove);
  //   };
  // }, []);

  return <div className="App"></div>;
}

const Tree = () => {
  return <h1>Tree</h1>;
};
