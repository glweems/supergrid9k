import React from "react";
import Draggable, {
  ControlPosition,
  DraggableEventHandler,
} from "react-draggable";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { replaceItemAtIndex } from "../../lib/utils";
import { grid, GridArea, GridTemplateEntry } from "../../state";
interface GridEditorItemProps extends GridArea {
  rowIndex: number;
  columnIndex: number;
}

const GridEditorItem: React.FC<GridEditorItemProps> = ({
  gridArea,
  rowIndex,
  columnIndex,
  row,
  column,
}) => {
  const [gridState, setGridState] = useRecoilState(grid);

  const dragGrid: [number, number] = [
    Number(gridState.gridTemplateColumns[columnIndex].inputProps.step) || 1,
    Number(gridState.gridTemplateRows[rowIndex].inputProps.step) || 1,
  ];
  const defaultState: ControlPosition = {
    x: Number(gridState.gridTemplateRows[rowIndex].amount),
    y: Number(gridState.gridTemplateColumns[columnIndex].amount),
  };

  const [state, setState] = React.useState<ControlPosition>(defaultState);

  const onStart = () => {};

  const onStop = () => {};

  const onControlledDrag = (e, { x, y }: ControlPosition) => {
    const key = e?.target?.className as any;
    console.log("key: ", key);
    if (key === "x") setState((prev) => ({ [key]: x, y: prev.y } as any));
  };

  const onControlledDragStop: DraggableEventHandler = (e, { x, y }) => {
    onControlledDrag(e, { x: 0, y: 0 });

    const gridTemplateRows = replaceItemAtIndex<GridTemplateEntry>(
      gridState.gridTemplateRows,
      rowIndex,
      { ...row, amount: state.x }
    );
    const gridTemplateColumns = replaceItemAtIndex<GridTemplateEntry>(
      gridState.gridTemplateColumns,
      columnIndex,
      { ...row, amount: state.y }
    );

    setGridState((prev) => ({
      ...prev,
      gridTemplateRows,
      gridTemplateColumns,
    }));
  };

  const dragHandlers = { onStart: onStart, onStop: onStop };
  return (
    <Draggable
      scale={1}
      position={state}
      {...dragHandlers}
      handle=".x,.y"
      defaultPosition={defaultState}
      grid={dragGrid}
      onDrag={onControlledDrag}
      onStop={onControlledDragStop}
    >
      <Item
        className="Item"
        style={{
          gridArea,
        }}
      >
        <span className="y" />
        <span className="x" />
      </Item>
    </Draggable>
  );
};

const Item = styled.section`
  .x,
  .y {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
    padding: 1rem;
    background-color: var(--color-yellow);
  }

  .x {
    right: 1rem;
    height: 100%;
  }
  .y {
    width: 100%;
  }
  position: relative;
  background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj48ZGVmcz48cGF0dGVybiBpZD0icGF0dGVybiIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHZpZXdCb3g9IjAgMCA0MCw0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDEyNykiPjxyZWN0IGlkPSJwYXR0ZXJuLWJhY2tncm91bmQiIHdpZHRoPSI0MDAlIiBoZWlnaHQ9IjQwMCUiIGZpbGw9InJnYmEoNTMsIDEyMCwgMjI5LDEpIj48L3JlY3Q+IDxwYXRoIGZpbHRlcj0idXJsKCNmaWx0ZXIxcGF0dGVybikiIGZpbGw9InJnYmEoNTMsIDEyMCwgMjI5LDEpIiBkPSJNMCAwIGg0MCB2NDAgaC00MCB6Ij48L3BhdGg+PHBhdGggZmlsbD0icmdiYSg5NywgMTUwLCAyMzQsMC40MSkiIGQ9Ik0tNDAgMCBoMi41IGwxMiAyMCBsLTEyIDIwIGgtMi41IGwxMiAtMjB6TS0zNSAwIGgyLjUgbDEyIDIwIGwtMTIgMjAgaC0yLjUgbDEyIC0yMHpNLTMwIDAgaDIuNSBsMTIgMjAgbC0xMiAyMCBoLTIuNSBsMTIgLTIwek0tMjUgMCBoMi41IGwxMiAyMCBsLTEyIDIwIGgtMi41IGwxMiAtMjB6TS0yMCAwIGgyLjUgbDEyIDIwIGwtMTIgMjAgaC0yLjUgbDEyIC0yMHpNLTE1IDAgaDIuNSBsMTIgMjAgbC0xMiAyMCBoLTIuNSBsMTIgLTIwek0tMTAgMCBoMi41IGwxMiAyMCBsLTEyIDIwIGgtMi41IGwxMiAtMjB6TS01IDAgaDIuNSBsMTIgMjAgbC0xMiAyMCBoLTIuNSBsMTIgLTIwek0wIDAgaDIuNSBsMTIgMjAgbC0xMiAyMCBoLTIuNSBsMTIgLTIwek01IDAgaDIuNSBsMTIgMjAgbC0xMiAyMCBoLTIuNSBsMTIgLTIwek0xMCAwIGgyLjUgbDEyIDIwIGwtMTIgMjAgaC0yLjUgbDEyIC0yMHpNMTUgMCBoMi41IGwxMiAyMCBsLTEyIDIwIGgtMi41IGwxMiAtMjB6TTIwIDAgaDIuNSBsMTIgMjAgbC0xMiAyMCBoLTIuNSBsMTIgLTIwek0yNSAwIGgyLjUgbDEyIDIwIGwtMTIgMjAgaC0yLjUgbDEyIC0yMHpNMzAgMCBoMi41IGwxMiAyMCBsLTEyIDIwIGgtMi41IGwxMiAtMjB6TTM1IDAgaDIuNSBsMTIgMjAgbC0xMiAyMCBoLTIuNSBsMTIgLTIweiI+PC9wYXRoPjwvcGF0dGVybj4gPGZpbHRlciBpZD0iZmlsdGVyMXBhdHRlcm4iPjxmZVR1cmJ1bGVuY2UgYmFzZUZyZXF1ZW5jeT0iMC4xIiBudW1PY3RhdmVzPSIyIiByZXN1bHQ9InJlc3VsdDEiIHR5cGU9ImZyYWN0YWxOb2lzZSI+PC9mZVR1cmJ1bGVuY2U+PGZlRGlzcGxhY2VtZW50TWFwIGluMj0icmVzdWx0MSIgc2NhbGU9IjEiIHJlc3VsdD0icmVzdWx0MiIgeENoYW5uZWxTZWxlY3Rvcj0iUiIgaW49IlNvdXJjZUdyYXBoaWMiPjwvZmVEaXNwbGFjZW1lbnRNYXA+PGZlQ29tcG9zaXRlIGluMj0icmVzdWx0MiIgaW49IlNvdXJjZUdyYXBoaWMiIG9wZXJhdG9yPSJhdG9wIiByZXN1bHQ9ImZiU291cmNlR3JhcGhpYyI+PC9mZUNvbXBvc2l0ZT48L2ZpbHRlcj4gPC9kZWZzPiA8cmVjdCBmaWxsPSJ1cmwoI3BhdHRlcm4pIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIj48L3JlY3Q+PC9zdmc+");
`;
export default GridEditorItem;
