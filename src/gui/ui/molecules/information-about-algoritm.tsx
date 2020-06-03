import React from "react";
import styled, { css } from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "../atoms";

export function InfoAboutAlgoritmApi({ codeString }) {
  const [isOpen, toggle] = React.useReducer((prev) => !prev, false);

  return (
    <>
      <Button onClick={toggle} type="outline">
        Посмотреть информацию об api
      </Button>
      <Wrapper isOpen={isOpen}>
        <a
          href="https://github.com/bogdanq/algorithms/blob/master/src/algoritms/bred-first-search.js"
          target="_blank"
        >
          Пример алгоритма
        </a>
        <SyntaxHighlighter language="typescript" style={docco}>
          {codeString}
        </SyntaxHighlighter>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  ${({ isOpen }) =>
    isOpen
      ? css`
          height: 500px;
          border-top: 1px solid #00bcd4;
          margin-bottom: 15px;
          overflow-y: auto;
        `
      : css`
          height: 0;
          overflow: hidden;
        `};
  transition: all 0.2s;
  padding-top: 15px;
`;
