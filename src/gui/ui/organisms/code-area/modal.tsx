import React from "react";
import { ModalWrapper } from "gui/ui/molecules";
import { CodeArea } from "./code-area";

export const CodeAreaModal = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (param: boolean) => void;
}) => {
  return (
    <ModalWrapper
      width={1100}
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
    >
      <CodeArea onRequestClose={() => setOpen(false)} />
    </ModalWrapper>
  );
};
