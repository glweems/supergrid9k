import React from "react";
import styled from "styled-components";
import { grid, GridProps } from "styled-system";
import { GridArea } from "../../state";
interface GridEditorItemProps extends GridArea {}

const GridEditorItem: React.FC<GridEditorItemProps> = ({
  gridRowStart,
  gridRowEnd,
  gridColumnStart,
  gridColumnEnd,
  lastRow,
  lastCol,
}) => {
  return (
    <Styles
      className={`GridEditorItem ${
        lastCol ? "lastCol" : lastRow ? "lastRow" : ""
      }`}
      data-col-start={gridColumnStart}
      data-row-start={gridRowStart}
      data-col-end={gridColumnEnd}
      data-row-end={gridColumnEnd}
      style={{
        gridRowStart,
        gridRowEnd,
        gridColumnStart,
        gridColumnEnd,
      }}
    >
      <div className="handle col" />
      <div className="handle row" />
      <div className="handle multi" />
      <div className="inside-row-size hidden">1fr</div>
      <div className="inside-col-size hidden">1fr</div>
    </Styles>
  );
};

type StylesProps = Partial<GridEditorItemProps> & GridProps;

const Styles = styled.section<StylesProps>`
  ${grid};
  position: relative;
  height: 100%;
  background: #fff;
  background-color: var(--color-primary);
  touch-action: none;

  :before {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    outline: 1px dashed var(--color-green);
    content: "";
    pointer-events: none;
  }

  :after {
    position: absolute;
    width: 14px;
    color: #666;
    font-size: 10px;
    line-height: 15px;
    text-align: center;
    background-color: #fff;
    border-radius: 3px;
    content: "";
  }

  .multi {
    position: absolute;
    top: -15px;
    left: -15px;
    z-index: 9;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: move;
    content: "";
    touch-action: none;
  }

  .row {
    position: absolute;
    top: -10px;
    left: 0;
    width: 100%;
    height: 20px;
    cursor: row-resize;
    touch-action: none;
  }

  .col {
    position: absolute;
    top: 0;
    /* left: -10px; */
    left: 0;
    width: 20px;
    height: 100%;
    cursor: col-resize;
    touch-action: none;
  }

  .hidden {
    display: none;
  }

  &[data-row-start="1"][data-col-start] {
    :after {
      top: 0;
      left: -7.5px;
      height: 16px;
      color: var(--color-text);
      background-color: var(--color-primary);
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
      content: attr(data-col-start);
    }
  }

  &.lastCol[data-col-end]:before {
    top: 2px !important;
    right: 0;
    left: auto;
    content: attr(data-col-end);
  }

  &.lastRow[data-row-end] {
    :before {
      top: auto;
      bottom: 2px !important;
      left: 0;
      content: attr(data-row-end);
    }
  }
`;
export default GridEditorItem;
