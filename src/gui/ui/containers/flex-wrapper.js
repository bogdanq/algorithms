import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: center;
  flex-wrap: wrap;
`;

export const Left = styled.div`
  width: 30%;
  text-align: left;
`;
