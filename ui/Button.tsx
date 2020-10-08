import { motion } from 'framer-motion';
import {
  Button as RBButton,
  ButtonProps as RBButtonProps,
} from 'rebass/styled-components';
import styled from 'styled-components/macro';
import { boxComposition, BoxProps } from './Box';

export type ButtonProps = BoxProps & RBButtonProps;

const Base = styled(RBButton)`
  ${boxComposition};
  appearance: button;
  background-color: transparent;
  border: 1px solid #0d6efd;
  border-radius: 0.25rem;
  color: #0d6efd;
  cursor: pointer;
  display: inline-block;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  overflow: visible;
  padding: 0.375rem 0.75rem;
  text-align: center;
  text-decoration: none;
  text-justify: auto;
  text-transform: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  user-select: none;
  vertical-align: middle;
`;
const Button = motion.custom(Base);

Button.defaultProps = {
  whileHover: { opacity: 0.8755 },
  whileTap: { scale: 0.95, opacity: 0.7 },
};

Button.displayName = 'Button';

export default Button;
