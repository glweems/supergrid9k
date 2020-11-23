import { colors } from '@lib/theme';
import styled, { css } from 'styled-components';

export const Handle = styled.span<{ resizing: boolean }>`
  position: absolute;
  z-index: 1000;
  width: 10px;
  height: 100%;
  background-color: ${(props) => props.theme.colors.black};
  opacity: 1;
  transition: 0.1s opacity ease-in-out;
  pointer-events: initial;

  ${(props) =>
    props.resizing &&
    css`
      background: ${colors.baseGlare};
    `}

  &.handle-sw {
    bottom: 0;
    left: 0;
    cursor: sw-resize;
  }
  &.handle-se {
    right: 0;
    bottom: 0;
    cursor: se-resize;
  }
  &.handle-nw {
    top: 0;
    left: 0;
    cursor: nw-resize;
  }
  &.handle-ne {
    top: 0;
    right: 0;
    cursor: ne-resize;
  }
  &.handle-w,
  &.handle-e {
    top: 0;
    right: -6px;
    margin-top: -6px;
    cursor: ew-resize;
  }
  &.handle-w {
    top: 0;
    left: -6px;
    height: 100%;
  }
  &.handle-e {
    right: -6px;
  }
  &.handle-n,
  &.handle-s {
    left: 50%;
    margin-left: -6px;
    cursor: ns-resize;
  }
  &.handle-n {
    top: -6px;
  }
  &.handle-s {
    bottom: -6px;
  }
`;
