import React from "react";
import { FiSettings } from "react-icons/fi";
import { ModalWrapper } from "./modal-wrapper";
import { Icon } from "../atoms";

export function Settings() {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <>
      <Icon onClick={() => setOpen(true)}>
        <FiSettings color="#fff" size="35" />
      </Icon>
      <ModalWrapper isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        Setting info
      </ModalWrapper>
    </>
  );
}
