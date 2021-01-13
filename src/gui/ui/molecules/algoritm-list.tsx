import React from "react";
import styled from "styled-components";

import { Algoritm, AlgoritmName } from "../../../algoritms";

type Props = {
  handleChangeAlgoritm: (params: Algoritm) => void;
  algoritms: Algoritm[];
  isOpenAlgoritmList: boolean;
  currentAlgoritm: AlgoritmName;
};

export function AlgoritmsList({
  handleChangeAlgoritm,
  algoritms,
  isOpenAlgoritmList,
  currentAlgoritm,
}: Props) {
  return (
    <UlWithAnimation isOpenAlgoritmList={isOpenAlgoritmList}>
      {algoritms.map((algoritm) => (
        <Li
          isActive={currentAlgoritm === algoritm.name}
          onClick={() => {
            handleChangeAlgoritm(algoritm);
          }}
          key={algoritm.name}
        >
          {algoritm.name}
        </Li>
      ))}
    </UlWithAnimation>
  );
}

const UlWithAnimation = styled.ul<{ isOpenAlgoritmList: boolean }>`
  overflow: hidden;
  transition: all 0.2s;
  height: ${({ isOpenAlgoritmList }) => (isOpenAlgoritmList ? "250px" : 0)};
`;

const Li = styled.li<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? "#fff" : "#d1d1d1")};
`;
