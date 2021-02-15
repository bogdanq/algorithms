import React, { useCallback } from "react";
import { FaHistory } from "react-icons/fa";
import styled, { css } from "styled-components";
import { CompletedGameState, recoveryGameHistory } from "game";

import { Icon } from "../atoms";
import { ModalWrapper } from "./modal-wrapper";

export function History({ history }: { history: CompletedGameState[] }) {
  const [isOpen, setOpen] = React.useState(false);

  const handleClickItem = useCallback((id: number) => {
    recoveryGameHistory(id);
    setOpen(false);
  }, []);

  return (
    <HistoryIconWrapper historyCount={history.length}>
      <Icon onClick={() => setOpen(true)}>
        <FaHistory color="#fff" size="35" />
      </Icon>

      <ModalWrapper
        width="80%"
        height="80%"
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        {!history.length ? (
          <h1>У вас нет завершенных игр</h1>
        ) : (
          <div>
            <h1>Ваши игры</h1>
            <>
              {history.map((item, index) => (
                <HistoryItem
                  active={false}
                  onClick={() => handleClickItem(index)}
                  key={index}
                >
                  <img
                    src={item.image}
                    width={window.innerWidth / 2}
                    height={window.innerHeight / 2}
                  />
                  <div>
                    <p>Алгоритм: {item.currentAlgoritm}</p>
                    <p>Длина пути: {item?.path?.path.length || 0}</p>
                    <p>Время поиска: {item?.path?.timeEnd || 0} ms</p>
                    <p>
                      Старт-конец (вершины): {item?.path?.startIndex} -{" "}
                      {item?.path?.endIndex}
                    </p>
                  </div>
                </HistoryItem>
              ))}
            </>
          </div>
        )}
      </ModalWrapper>
    </HistoryIconWrapper>
  );
}

const HistoryItem = styled.div<{ active: boolean }>`
  display: flex;
  padding: 20px;
  border: 1px solid transparent;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.3s;
  ${({ active }) =>
    active &&
    css`
      border: 1px solid #00bcd4;
    `}
  &:hover {
    border: 1px solid #00bcd4;
  }

  & > div {
    margin-left: 25px;
  }
`;

const HistoryIconWrapper = styled.div<{ historyCount: number }>`
  position: relative;
  &:after {
    ${({ historyCount }) =>
      historyCount &&
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
        align-items: center;
      `}
  }
`;
