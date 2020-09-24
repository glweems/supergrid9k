import theme from '@/lib/theme';
import { motion } from 'framer-motion';
import { buttons } from 'polished';
import {
  Button as RBButton,
  ButtonProps as RBButtonProps,
} from 'rebass/styled-components';
import styled from 'styled-components/macro';
import { buttonStyle } from 'styled-system';
import { boxComposition, BoxProps } from './Box';

export type ButtonProps = BoxProps & RBButtonProps;

const Base = styled(RBButton)`
  ${boxComposition};
  border-width: 2px;
  outline: none;

  :hover {
    /* background: pink; */
  }
`;
const Button = motion.custom(Base);

Button.defaultProps = {
  margin: 0,
  padding: '2px 16px',
  bg: 'transparent',
  whileHover: { opacity: 0.8755 },
  whileTap: { scale: 0.95, opacity: 0.7 },
};

Button.displayName = 'Button';

export default Button;
