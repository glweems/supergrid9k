import styled from "styled-components";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";
import { SuperGrid9kTheme } from "../lib/theme";

export interface ButtonProps
  extends BorderProps,
    ColorProps<SuperGrid9kTheme>,
    TypographyProps,
    LayoutProps,
    PositionProps,
    SpaceProps {}

const buttonComposition = compose(
  border,
  color,
  typography,
  layout,
  space,
  position
);

const Button = styled.button<ButtonProps>`
  ${buttonComposition};
`;

export default Button;
/*

*/
