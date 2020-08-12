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
    <Box display="grid" {...gridProps} {...(props as any)}>
      {items.map((item, index) => (
        <GridEditorItem key={item.id} {...item}>
          {item.number}
        </GridEditorItem>
      ))}
    </Box>
  );
};

GridItems.defaultProps = { className: "GridItems" };

export default GridItems;
