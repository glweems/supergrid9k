import styled from 'styled-components/macro';
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
  textAlign,
  TextAlignProps,
} from 'styled-system';
import theme, { SuperGrid9kTheme } from '../lib/theme';
import {
  Box as RebassBox,
  BoxProps as RebassBoxProps,
} from 'rebass/styled-components';

export type BoxProps = RebassBoxProps &
  SpaceProps &
  BorderProps &
  LayoutProps &
  PositionProps &
  FlexboxProps &
  ColorProps<SuperGrid9kTheme> &
  GridProps &
  TextAlignProps;

export const boxComposition = compose(
  grid,
  color,
  layout,
  space,
  flexbox,
  border,
  textAlign
);

const Box = styled(RebassBox)<BoxProps>`
  ${boxComposition}
`;

Box.displayName = 'Box';
Box.defaultProps = { theme, variant: 'box' };

export default Box;
