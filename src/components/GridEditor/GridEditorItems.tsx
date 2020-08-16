import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  grid,
  gridAreas,
  gridCss,
  GridState,
  GridTemplateEntry,
} from "../../state";
import Box, { BoxProps } from "../../ui/Box";
import GridEditorItem from "./GridEditorItem";

export type GridItemsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  BoxProps;

const GridItems: React.FC<GridItemsProps> = (props) => {
  const [gridState, setGridState] = useRecoilState(grid);
  const gridProps = useRecoilValue(gridCss);
  const items = useRecoilValue(gridAreas);

  const findEntryIndex = (rowId: string, arr: GridTemplateEntry[]) => {
    return arr.findIndex((obj) => obj.id === rowId);
  };

  return (
    <Box as="section" height="100%" padding={5} className="GridEditorItems">
      <Box
        display="grid"
        {...gridProps}
        justifyContent="stretch"
        justifyItems="stretch"
        alignContent="stretch"
        alignItems="stretch"
        className="grid"
        height="100%"
      >
        {items.map((item, index) => (
          <GridEditorItem
            key={item.id}
            {...item}
            rowIndex={findEntryIndex(item.row.id, gridState.gridTemplateRows)}
            columnIndex={findEntryIndex(
              item.column.id,
              gridState.gridTemplateColumns
            )}
          >
            {item.number}
          </GridEditorItem>
        ))}
      </Box>
    </Box>
  );
};

GridItems.defaultProps = { className: "GridItems" };

export default GridItems;
