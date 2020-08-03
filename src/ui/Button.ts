import styled, { css } from "styled-components";
import { ColorProps, compose, color } from "styled-system";
import { SuperGrid9kTheme } from "../lib/theme";

export interface ButtonProps extends ColorProps<SuperGrid9kTheme> {
  outlined?: boolean;
  fullWidth?: boolean;
}

const buttonComposition = compose(color);

const Button = styled.button<ButtonProps>`
  ${buttonComposition};
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `};
  ${({ outlined }) =>
    outlined &&
    css`
      border-color: ${({ theme }) => theme.colors.blue};
    `};
`;

Button.defaultProps = {
  bg: "blue",
};

export default Button;
