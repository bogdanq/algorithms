import React from "react";
import { useStore } from "effector-react";
import "./styles.css";
import { renderCanvas } from "./canvas";
import { changeSellSize, $state, changeBorderSize } from "./model";

let data = {
  1: [8, 2, 3],
  2: [1, 4, 5],
  3: [8, 1, 4],
  4: [2, 3, 6],
  5: [2, 6],
  6: [4, 5, 7],
  7: [6],
  8: [1, 3]
};

export default function App() {
  React.useEffect(() => {
    renderCanvas({ cellSize: 45, borderSize: 1 });
  }, []);

  const { cellSize, borderSize } = useStore($state);

  return (
    <div className="App">
      <h1>Текущая ширина ячейки {cellSize}</h1>
      <h1>Текущая ширина границ {borderSize}</h1>

      <Tree data={data} height={400} width={400} />
      <button onClick={() => changeSellSize(20)}>set 20</button>
      <button onClick={() => changeSellSize(45)}>set 45</button>
      <button onClick={() => changeSellSize(80)}>set 80</button>
      <br />

      <input
        type="range"
        id="volume"
        name="volume"
        min="1"
        max="7"
        onChange={e => changeBorderSize(e.target.value)}
        value={borderSize}
      />
    </div>
  );
}

const Tree = () => {
  return <h1>Tree</h1>;
};
