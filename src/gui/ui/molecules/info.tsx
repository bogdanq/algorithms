import React from "react";
import styled from "styled-components";
import { FiInfo } from "react-icons/fi";
import { ModalWrapper } from "./modal-wrapper";
import { Icon, Text } from "../atoms";
import { FlexContainer } from "../templates";

export function Info() {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <Icon onClick={() => setOpen(true)}>
        <FiInfo color="#fff" size="35" />
      </Icon>

      <InfoModal isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}

function InfoModal({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (param: boolean) => void;
}) {
  return (
    <ModalWrapper
      width={500}
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
    >
      <FlexContainer>
        <ColorBlock color="green" />
        <Text>- Точка старта алгоритма</Text>
      </FlexContainer>
      <FlexContainer>
        <ColorBlock color="red" />
        <Text>- Точка завершения алгоритма</Text>
      </FlexContainer>
      <FlexContainer>
        <ColorBlock color="#00bcd4" />
        <Text>- Пройденная вершина</Text>
      </FlexContainer>
      <FlexContainer>
        <ColorBlock color="#f3fc23" />
        <Text>- Вершина, находящаяся в обработке</Text>
      </FlexContainer>
      <FlexContainer>
        <ColorBlock color="#d2ef99" />
        <Text>- Соседи текущей вершины</Text>
      </FlexContainer>
      <FlexContainer>
        <ColorBlock color="#bbbbbb" />
        <Text>- Цвет не проходимого барьера</Text>
      </FlexContainer>
    </ModalWrapper>
  );
}

const ColorBlock = styled.div`
  width: 35px;
  height: 35px;
  background: ${({ color }) => color};
  margin-right: 15px;
`;
