import React from "react";
import { FiBook } from "react-icons/fi";

import { Icon } from "../atoms";
import { ModalWrapper } from "./modal-wrapper";

export function AboutAlgoritms() {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <Icon onClick={() => setOpen(true)}>
        <FiBook color="#fff" size="35" />
      </Icon>
      <ModalWrapper
        width="700px"
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        <h2>Информация об алгоритмах</h2>
        <ul>
          <li>
            <a href="qwd" target="__blank">
              Поиск в ширину
            </a>
          </li>
          <li>
            <a href="qwd" target="__blank">
              Поиск в глубину
            </a>
          </li>
          <li>
            <a
              href="https://github.com/bogdanq/algorithms/blob/master/src/algoritms/dijkstra/dijkstra.md"
              target="__blank"
            >
              Алгоритм dijkstra
            </a>
          </li>
          <li>
            <a
              href="https://github.com/bogdanq/algorithms/blob/master/src/algoritms/a-start/a-start.md"
              target="__blank"
            >
              Алгоритм a-star
            </a>
          </li>
        </ul>
      </ModalWrapper>
    </>
  );
}
