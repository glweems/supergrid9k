import React from "react";
import styled from "styled-components";
import { GridArea } from "../../state";
interface GridEditorItemProps extends GridArea {}

const GridEditorItem: React.FC<GridEditorItemProps> = ({
  gridRowStart,
  gridRowEnd,
  gridColumnStart,
  gridColumnEnd,
  lastCol,
}) => {
  return (
    <Styles
      className={`GridEditorItem ${lastCol ? "lastCol" : ""}`}
      data-col-start={gridColumnStart}
      data-row-start={gridRowStart}
      data-col-end={gridColumnEnd}
      data-row-end={gridRowEnd}
    >
      <div className="handle col" />
      <div className="handle row" />
      <div className="handle multi" />
      <div className="inside-row-size hidden">1fr</div>
      <div className="inside-col-size hidden">1fr</div>
    </Styles>
  );
};
const Styles = styled.section<{
  ["data-col-start"]: number;
  ["data-row-start"]: number;
  ["data-col-end"]: number;
  ["data-row-end"]: number;
}>`
  touch-action: none;
  background: #fff;
  height: 100%;
  position: relative;
  background-color: var(--color-primary);
  grid-row: ${(props) =>
    `${props["data-row-start"]} / ${props["data-row-end"]}`};
  grid-column: ${(props) =>
    `${props["data-col-start"]} / ${props["data-col-end"]}`};
  :before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    outline: 1px dashed var(--color-green);
  }
  :after {
    content: "";
    position: absolute;
    font-size: 10px;
    width: 14px;
    border-radius: 3px;
    color: #666;
    background: #fff;
    line-height: 15px;
    text-align: center;
  }

  .multi {
    touch-action: none;
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    top: -15px;
    left: -15px;
    z-index: 9;
    cursor: move;
  }

  .col {
    touch-action: none;
    position: absolute;
    width: 20px;
    height: 100%;
    left: -10px;
    top: 0;
    cursor: col-resize;
  }

  .row {
    touch-action: none;
    position: absolute;
    width: 100%;
    height: 20px;
    left: 0;
    top: -10px;
    cursor: row-resize;
  }
  .hidden {
    display: none;
  }

  &[data-row-start="1"]:after {
    content: attr(data-col-start);
    left: -7.5px;
    top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    height: 16px;
  }
  &.lastCol:before {
    top: 2px !important;
    right: 0;
    left: auto;
    content: attr(data-col-end);
  }
`;
export default GridEditorItem;
