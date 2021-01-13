import React, { useCallback, useReducer, useState } from "react";
import { useStore } from "effector-react";
import { combine } from "effector";

import {
  $currentAlgoritm,
  selectAlgoritm,
  Algoritm,
  $algoritms,
} from "../../../algoritms";

import { AlgoritmsList } from "../molecules";
import { CodeAreaModal } from "./code-area";

const $state = combine({
  currentAlgoritm: $currentAlgoritm,
  algoritms: $algoritms,
});

export function AlgoritmsBlock() {
  const [isOpenCodeArea, setOpenCodeArea] = useState(false);
  const [isOpenAlgoritmList, toggleAlgoritmList] = useReducer(
    (state) => !state,
    false
  );

  const { currentAlgoritm, algoritms } = useStore($state);

  const handleChangeAlgoritm = useCallback((algoritm: Algoritm) => {
    selectAlgoritm(algoritm.name);
    toggleAlgoritmList();

    if (algoritm.modal) {
      setOpenCodeArea(true);
    }
  }, []);

  return (
    <>
      <h2>Выбирите алгоритм:</h2>
      <ul>
        <li className="isActive" onClick={toggleAlgoritmList}>
          {currentAlgoritm}
        </li>
      </ul>

      <AlgoritmsList
        currentAlgoritm={currentAlgoritm}
        isOpenAlgoritmList={isOpenAlgoritmList}
        algoritms={algoritms}
        handleChangeAlgoritm={handleChangeAlgoritm}
      />

      <CodeAreaModal isOpen={isOpenCodeArea} setOpen={setOpenCodeArea} />
    </>
  );
}
