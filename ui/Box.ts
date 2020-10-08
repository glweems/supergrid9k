import {
  Box as RebassBox,
  BoxProps as RebassBoxProps,
} from 'rebass/styled-components';
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
  position,
  PositionProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
} from 'styled-system';
import theme, { SuperGrid9kTheme } from '../lib/theme';

export type BoxProps = RebassBoxProps &
  SpaceProps &
  BorderProps &
  LayoutProps &
  PositionProps &
  FlexboxProps &
  ColorProps<Pick<SuperGrid9kTheme, 'colors'>> &
  GridProps &
  TextAlignProps;

export const boxComposition = compose(
  grid,
  color,
  layout,
  space,
  flexbox,
  border,
  textAlign,
  position
);

const Box = styled(RebassBox)<BoxProps>`
  ${boxComposition}
`;

Box.displayName = 'Box';
Box.defaultProps = { theme, variant: 'box' };

export default Box;
