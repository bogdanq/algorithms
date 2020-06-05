import React from "react";
import { FaHistory } from "react-icons/fa";
import styled, { css } from "styled-components";
import { useStore } from "effector-react";
import {
  $historyGame,
  recoveryHistoryGame,
  $currentGame,
  HistoryGame,
} from "../../../game";
import { ModalWrapper } from "../molecules";
import { Icon } from "../atoms";

export function History() {
  const [isOpen, setOpen] = React.useState(false);
  const historyGame = useStore($historyGame);

  return (
    <HistoryIcon historyCount={historyGame.length}>
      <Icon onClick={() => setOpen(true)}>
        <FaHistory color="#fff" size="35" />
      </Icon>
      <ModalWrapper
        width={600}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        {historyGame.length > 0 ? (
          <HistoryList historyGame={historyGame} setOpen={setOpen} />
        ) : (
          <h1>У вас нет законченных игр </h1>
        )}
      </ModalWrapper>
    </HistoryIcon>
  );
}

function HistoryList({
  historyGame,
  setOpen,
}: {
  historyGame: Array<HistoryGame>;
  setOpen: (param: boolean) => void;
}) {
  const currentGame = useStore($currentGame);
  const handleChangeItem = React.useCallback(
    (item) => {
      recoveryHistoryGame(item.index);
      setOpen(false);
    },
    [setOpen]
  );

  return (
    <HistoryListWrapper>
      <>
        {historyGame.map((item, index) => (
          <HistoryItem
            active={currentGame === parseInt(item.index)}
            onClick={() => handleChangeItem(item)}
            key={index.toString()}
          >
            <p>Алгоритм: {item.currentAlgoritm}</p>
            <p>Путь: {item?.path?.length || 0}</p>
            <p>Время: {item.timeEnd || 0} ms</p>
            <p>Баррьеры: {item.barrier.length || 0}</p>
            <p>
              Старт - Конец: {item.startEndPosition[0]} /{" "}
              {item.startEndPosition[1]}
            </p>
          </HistoryItem>
        ))}
      </>
    </HistoryListWrapper>
  );
}

const HistoryItem = styled.div<{ active: boolean }>`
  border: 2px solid #666666;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  margin: 5px;
  transition: all 0.3s;

  ${({ active }) =>
    active &&
    css`
      border: 2px solid #00bcd4;
    `}

  &:hover {
    border: 2px solid #00bcd4;
  }
`;

const HistoryListWrapper = styled.div`
  overflow-y: auto;
  max-height: 500px;
`;

const HistoryIcon = styled.div<{ historyCount: number }>`
  position: relative;
  &:after {
    ${({ historyCount }) =>
      historyCount > 0 &&
      css`
    position: absolute;
    content: "${historyCount}";
    background: red;
    border-radius: 50%;
    padding: 3px;
    font-size: 12px;
    text-align: center;
    top: -10px;
    right: -15px;
    height: 13px;
    width: 13px;
    display: flex;
    justify-content: center;
    align-items: center
    `}
  }
`;
