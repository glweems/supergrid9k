import styled, { css } from "styled-components/macro";
import { ColorProps, compose, color, border, BorderProps } from "styled-system";
import { SuperGrid9kTheme } from "../lib/theme";

export interface ButtonProps extends ColorProps<SuperGrid9kTheme>, BorderProps {
  outlined?: boolean;
  fullWidth?: boolean;
  icon?: boolean;
}

const buttonComposition = compose(color, border);

const Button = styled.button<ButtonProps>`
  ${buttonComposition};

  ${(props) =>
    props.color === "green" &&
    css`
      background-color: ${({ theme }) => theme.colors.green};
      color: ${({ theme }) => theme.colors.light};
      &:hover {
        background-color: ${({ theme }) => theme.colors.greens[7]};
      }
    `}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `};
  ${({ icon }) =>
    icon &&
    css`
      padding: 0;
    `};
`;

Button.defaultProps = {
  bg: "lights.1" as any,
  borderWidth: "1px",
  borderColor: "darks.3",
  color: "light",
};

export default Button;
