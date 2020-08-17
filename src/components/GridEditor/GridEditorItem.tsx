import React from "react";
import Draggable, {
  ControlPosition,
  DraggableEventHandler,
  DraggableProps,
} from "react-draggable";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import {
  HandleBottomIcon,
  HandleLeftIcon,
  HandleRightIcon,
  HandleTopIcon,
  Icon,
} from "../../lib/Icons";
import { itemBg } from "../../lib/theme";
import { replaceItemAtIndex } from "../../lib/utils";
import { grid, drag, GridArea, GridTemplateEntry } from "../../state";
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
  const [dragState, setDragState] = useRecoilState(drag);

  return (
    <Item className="Item" gridArea={gridArea}>
      <DragHandle className="right">
        <HandleRightIcon />
      </DragHandle>
      <DragHandle className="top">
        <HandleTopIcon />
      </DragHandle>
      <DragHandle className="left">
        <HandleLeftIcon />
      </DragHandle>
      <DragHandle className="bottom">
        <HandleBottomIcon />
      </DragHandle>
    </Item>
  );
};

interface DragHandleProps
  extends Omit<Partial<DraggableProps>, "position">,
    HandleProps {}

const DragHandle: React.FC<DragHandleProps> = ({
  className,
  children,
  ...props
}) => {
  const [dragState, setDragState] = useRecoilState(drag);
  function handleDrag(e: any, { x, y }) {
    const result = e?.target?.attributes?.getNamedItem("data-position")
      ?.value as "top" | "bottom" | "left" | "right" | undefined;

    switch (result) {
      case "right":
        setDragState((current) => ({ ...current, x }));
        break;

      default:
        break;
    }
  }

  const axis = className === "top" || "bottom" ? "y" : "x";

  return (
    <Draggable onDrag={handleDrag} position={dragState} axis={axis}>
      <Handle data-position={className} className={className}>
        {children}
      </Handle>
    </Draggable>
  );
};

type ItemProps = Partial<GridArea>;

const Item = styled.section<ItemProps>`
  position: relative;
  grid-area: ${({ gridArea }) => gridArea};
  outline: 0.5px solid var(--color-secondary);
`;
interface HandleProps {
  className?: "top" | "bottom" | "right" | "left";
}
const Handle = styled.span<HandleProps>`
  position: absolute;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: min-content;
  height: min-content;
  padding: ${({ theme }) => theme.space[1]}px;
  /* border-color: var(--color-background); */
  border-style: dashed;
  border-width: 1px;
  &.top {
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    border-top-color: var(--color-primary);
  }
  &.right {
    top: 0;
    right: 0;
    height: 100%;
    border-right-color: var(--color-primary);
  }
  &.left {
    top: 0;
    left: 0;
    height: 100%;
    border-left-color: var(--color-primary);
  }

  &.bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom-color: var(--color-primary);
  }
`;

function handlePosition(pos?: HandleProps["className"]) {
  switch (pos) {
    case "top":
      return css``;
    case "right":
      return css``;
    case "left":
      return css``;
    case "bottom":
      return css``;

    default:
      console.log(pos);
  }
}

export default GridEditorItem;

/*    <Draggable
      scale={1}
      position={state}
      {...dragHandlers}
      handle=".x,.y"
      defaultPosition={defaultState}
      grid={dragGrid}
      onDrag={onControlledDrag}
      onStop={onControlledDragStop}



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

    > */
