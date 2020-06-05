import React from "react";
import { FiBook } from "react-icons/fi";
import { ModalWrapper } from "./modal-wrapper";
import { Icon } from "../atoms";

export function AboutAlgoritms() {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <Icon onClick={() => setOpen(true)}>
        <FiBook color="#fff" size="35" />
      </Icon>
      <ModalWrapper isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        algoritm info
      </ModalWrapper>
    </>
  );
}
