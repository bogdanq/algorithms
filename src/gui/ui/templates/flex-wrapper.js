import styled from "styled-components";
import { WithTag, mixins } from "../../lib/styled-components-layout";

export const FlexContainer = styled(WithTag)`
  ${mixins}
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: center;
  flex-wrap: wrap;
  padding: 15px 0px;
`;

export const Left = styled.div`
  width: 25%;
  text-align: left;
  padding-right: 15px;
`;
