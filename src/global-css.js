import { createGlobalStyle, css } from "styled-components";
import {
  StyledRootWrapper,
  StyledInner,
} from "./gui/ui/molecules/modal-wrapper";

const globalCss = css`
  .ReactModal__Body--open {
    overflow: hidden;
  }

  .ReactModal__Content--after-open {
    border: none !important;
    background: transparent !important;
    ${StyledInner} {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .ReactModal__Content--before-close {
    ${StyledInner} {
      transform: translateX(100px);
      opacity: 0;
    }
  }
  .ReactModal__Overlay--after-open {
    background-color: transparent !important;
    ${StyledRootWrapper} {
      opacity: 1;
    }
  }
  .ReactModal__Overlay--before-close {
    ${StyledRootWrapper} {
      opacity: 0;
    }
  }
`;
export const GlobalModalStyles = createGlobalStyle`${globalCss}`;