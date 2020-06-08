import React from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import { Settings, Info, AboutAlgoritms } from "../molecules";

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  padding: 15px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  cursor: default;
  left: 20px;
  bottom: 20px;

  &:hover {
    cursor: move;
  }

  & > div {
    margin: 0 10px;
    display: flex;
    justify-content: center;
  }
`;

export function InfoDraggable() {
  return (
    <Draggable>
      <Wrapper>
        <Info />
        <Settings />
        <AboutAlgoritms />
        {/* <History /> */}
      </Wrapper>
    </Draggable>
  );
}
