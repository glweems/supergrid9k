import styled from "styled-components/macro";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  PositionProps,
  space,
  SpaceProps,
} from "styled-system";
import theme, { SuperGrid9kTheme } from "../lib/theme";

export interface BoxProps
  extends SpaceProps,
    BorderProps,
    LayoutProps,
    PositionProps,
    FlexboxProps,
    ColorProps<SuperGrid9kTheme>,
    GridProps {}

export const boxComposition = compose(
  grid,
  color,
  layout,
  space,
  flexbox,
  border
);

const Box = styled.div<BoxProps>`
  ${boxComposition}
`;

Box.displayName = "Box";

Box.defaultProps = {
  theme,
};

export default Box;
