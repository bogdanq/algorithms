import React from "react";
import { FaHistory } from "react-icons/fa";
import styled, { css } from "styled-components";
import { useStore } from "effector-react";
import { ModalWrapper } from "../molecules";
import { FlexContainer } from "../containers";
import { Icon } from "../atoms";
import { $historyGame, recoveryHistoryGame, $currentGame } from "../../../game";

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

function HistoryList({ historyGame, setOpen }) {
  const currentGame = useStore($currentGame);
  const handleChangeItem = React.useCallback(
    (item) => {
      recoveryHistoryGame(item.date);
      setOpen(false);
    },
    [setOpen]
  );

  return (
    <HistoryListWrapper>
      <FlexContainer>
        {historyGame.map((item, index) => (
          <HistoryItem
            active={currentGame === item.date}
            onClick={() => handleChangeItem(item)}
            key={index.toString()}
          >
            <p>Баррьеры: {item.barrier.length}</p>
            <p>Старт: {item.startEndPosition[0]}</p>
            <p>Конец: {item.startEndPosition[1]}</p>
            <h3>Будет дата</h3>
          </HistoryItem>
        ))}
      </FlexContainer>
    </HistoryListWrapper>
  );
}

const HistoryItem = styled.div`
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

const HistoryIcon = styled.div`
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
