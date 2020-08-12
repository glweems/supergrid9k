import React from "react";
import { useRecoilValue } from "recoil";
import { gridAreas, gridCss } from "../../state";
import Box, { BoxProps } from "../../ui/Box";

export type GridItemsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  BoxProps;

const GridItems: React.FC<GridItemsProps> = (props) => {
  const gridProps = useRecoilValue(gridCss);
  const items = useRecoilValue(gridAreas);

  return (
    <Box display="grid" {...gridProps} {...(props as any)} css={``}>
      {items.map((item, index) => (
        <Box
          key={item.id}
          color="primary"
          css={`
            background-image: radial-gradient(#d7d7d7 1px, currentColor 1px),
              radial-gradient(#d7d7d7 1px, transparent 1px);
            background-position: 0 0, 25px 25px;
            background-size: 50px 50px;
          `}
        >
          {item.number}
        </Box>
      ))}
    </Box>
  );
};

GridItems.defaultProps = { className: "GridItems" };

export default GridItems;
