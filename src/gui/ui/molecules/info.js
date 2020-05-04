import React from "react";
import styled from "styled-components";
import { FiInfo } from "react-icons/fi";
import { ModalWrapper } from "./modal-wrapper";
import { Icon, Text } from "../atoms";

export function Info() {
  const [isOpen, setOpen] = React.useState(true);
  return (
    <>
      <Icon onClick={() => setOpen(true)}>
        <FiInfo color="#fff" size="35" />
      </Icon>

      <InfoModal isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}

function InfoModal({ isOpen, setOpen }) {
  return (
    <ModalWrapper
      width={500}
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
    >
      <List>
        <ColorBlock color="green" />
        <Text>- Точка старта алгоритма</Text>
      </List>
      <List>
        <ColorBlock color="red" />
        <Text>- Точка завершения алгоритма</Text>
      </List>
      <List>
        <ColorBlock color="#00bcd4" />
        <Text>- Пройденная вершина</Text>
      </List>
      <List>
        <ColorBlock color="#f3fc23" />
        <Text>- Вершина, находящаяся в обработке</Text>
      </List>
      <List>
        <ColorBlock color="#d2ef99" />
        <Text>- Соседи текущей вершины</Text>
      </List>
      <List>
        <ColorBlock color="#bbbbbb" />
        <Text>- Цвет не проходимого барьера</Text>
      </List>
    </ModalWrapper>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
`;

const ColorBlock = styled.div`
  width: 35px;
  height: 35px;
  background: ${({ color }) => color};
  margin-right: 15px;
`;
