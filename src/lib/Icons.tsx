import React, { createElement } from "react";
import styled, { css } from "styled-components/macro";
import {
  color,
  ColorProps,
  compose,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";

interface IconProps extends ColorProps, LayoutProps, SpaceProps {}

const iconComposition = compose(color, layout, space);

export const Icon = styled.svg<IconProps>`
  ${iconComposition};
  vertical-align: middle;
`;

Icon.defaultProps = {
  viewBox: "0 0 16 16",
  xmlns: "http://www.w3.org/2000/svg",
  size: 20,
  fill: "currentColor",
};

export const PlusIcon: React.FC<IconProps> = (props) =>
  createElement(Icon, {
    ...props,
    children: [
      <path
        key="PlusIconPath-1"
        fillRule="evenodd"
        d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
      />,
      <path
        key="PlusIconPath-2"
        fillRule="evenodd"
        d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
      />,
    ],
  });

export const CloseIcon: React.FC<IconProps> = (props) =>
  createElement(Icon, {
    ...props,
    children: [
      <path
        key="CloseIconPath-1"
        fillRule="evenodd"
        d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
      />,
      <path
        key="CloseIconPath-2"
        fillRule="evenodd"
        d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
      />,
    ],
  });

export const iconButtonCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  width: 100%;
  text-align: center;

  svg {
    margin-right: ${({ theme }) => theme.space[2]}px;
  }
`;

export const HandleTopIcon: React.FC<IconProps> = (props) =>
  createElement(Icon, {
    ...props,
    children: (
      <path
        fillRule="evenodd"
        d="M3.646 11.854a.5.5 0 0 0 .708 0L8 8.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zM2.4 5.2c0 .22.18.4.4.4h10.4a.4.4 0 0 0 0-.8H2.8a.4.4 0 0 0-.4.4z"
      />
    ),
  });

export const HandleRightIcon: React.FC<IconProps> = (props) =>
  createElement(Icon, {
    ...props,
    children: (
      <path
        fillRule="evenodd"
        d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0zM11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"
      />
    ),
  });

export const HandleLeftIcon: React.FC<IconProps> = (props) =>
  createElement(Icon, {
    ...props,
    children: (
      <path
        fillRule="evenodd"
        d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0zM4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z"
      />
    ),
  });

export const HandleBottomIcon: React.FC<IconProps> = (props) =>
  createElement(Icon, {
    ...props,
    children: (
      <path
        fillRule="evenodd"
        d="M3.646 4.146a.5.5 0 0 1 .708 0L8 7.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zM1 11.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
      />
    ),
  });

const defaultHandleProps: IconProps = {
  color: "secondary",
};

HandleTopIcon.defaultProps = defaultHandleProps;
HandleRightIcon.defaultProps = defaultHandleProps;
HandleLeftIcon.defaultProps = defaultHandleProps;
HandleBottomIcon.defaultProps = defaultHandleProps;
