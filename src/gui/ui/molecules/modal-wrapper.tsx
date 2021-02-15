import React from "react";
import styled from "styled-components";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
};

export function ModalWrapper({
  isOpen,
  onRequestClose,
  children,
  width,
  className,
  height,
}: Props) {
  return (
    <div onMouseDown={(e) => e.stopPropagation()}>
      <ReactModal
        isOpen={isOpen}
        closeTimeoutMS={200}
        onRequestClose={onRequestClose}
      >
        <StyledRootWrapper onClick={onRequestClose}>
          <StyledWrapper>
            <StyledInner
              className={className}
              width={width}
              height={height}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
              <CloseModal onClick={onRequestClose} />
            </StyledInner>
          </StyledWrapper>
        </StyledRootWrapper>
      </ReactModal>
    </div>
  );
}

export const StyledInner = styled.div<{ width?: string; height?: string }>`
  background: #fff;
  padding: 25px;
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  margin: 10px;
  width: ${({ width }) => (width ? `${width}` : "auto")};
  height: ${({ height }) => (height ? `${height}` : "height")};
  position: relative;
  border-radius: 10px;
  opacity: 0;
  transition: all 0.3s;
  transform: translateX(-100px);
`;

export const StyledRootWrapper = styled.div`
  overflow-x: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1043;
  position: fixed;
  opacity: 0;
  transition: all 0.3s;
`;

export const StyledWrapper = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1045;
  outline: 0;
  overflow: auto;
  white-space: normal;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #27262687;
`;

const CloseModal = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  width: 30px;
  height: 30px;
  &:after {
    position: absolute;
    content: "\\2718";
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
  }
`;
