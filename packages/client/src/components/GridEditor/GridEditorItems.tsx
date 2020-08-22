import React from "react";
import { useRecoilValue } from "recoil";
import { gridAreas, gridCss } from "../../state";
import Box, { BoxProps } from "../../ui/Box";
import GridEditorItem from "./GridEditorItem";

export type GridItemsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  BoxProps;

const GridItems: React.FC<GridItemsProps> = (props) => {
  const gridProps = useRecoilValue(gridCss);
  const items = useRecoilValue(gridAreas);

  return (
    <Box as="section" height="100%" className="GridEditorItems">
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
        {items.map(({ id, number }) => (
          <GridEditorItem key={id} number={number} />
        ))}
      </Box>
    </Box>
  );
};

GridItems.defaultProps = { className: "GridItems" };

export default GridItems;
