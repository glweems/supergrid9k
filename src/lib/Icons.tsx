import React, { createElement } from "react";
import styled from "styled-components";
import {
  color,
  ColorProps,
  compose,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import { SuperGrid9kTheme } from "./theme";

interface IconProps
  extends ColorProps<SuperGrid9kTheme>,
    LayoutProps,
    SpaceProps<SuperGrid9kTheme> {}

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
  paddingX: 1,
  paddingY: 0,
  margin: 0,
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
