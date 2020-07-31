import styled from "styled-components";
import { boxComposition, BoxProps } from "../ui/Box";

export const Icon = styled.svg<BoxProps>`
  ${boxComposition};
  vertical-align: middle;
`;

Icon.defaultProps = {
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg",
  size: "30px",
  fill: "currentColor",
};
