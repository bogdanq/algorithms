import React from "react";
import { combine } from "effector";
import { useStore } from "effector-react";
import {
  $algoritms,
  selectAlgoritm,
  $currentAlgoritm,
} from "../../../algoritms";
import { ModalWrapper } from "../molecules";
import { CodeArea } from "./code-area";

const $state = combine({
  algoritms: $algoritms,
  currentAlgoritm: $currentAlgoritm,
});

export function AlgoritmsList() {
  const { algoritms, currentAlgoritm } = useStore($state);
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <h2 className="select-bar_title">Выбирите алгоритм:</h2>
      <ul>
        {algoritms.map((algoritm) => (
          <li
            onClick={() => {
              selectAlgoritm(algoritm.name);
              if (algoritm.modal) {
                setOpen(true);
              }
            }}
            className={currentAlgoritm === algoritm.name ? "isActive" : ""}
            key={algoritm.name}
          >
            {algoritm.name}
          </li>
        ))}
      </ul>
      <CustomAlgoritmModal isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}

const CustomAlgoritmModal = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (param: boolean) => void;
}) => {
  return (
    <ModalWrapper
      width={700}
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
    >
      <CodeArea onRequestClose={() => setOpen(false)} />
    </ModalWrapper>
  );
};
