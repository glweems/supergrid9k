import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { grid, gridCss } from "../../store/grid";
import Box, { BoxProps } from "../../ui/Box";

export type GridEntriesProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  BoxProps;

const GridEntries: React.FC<GridEntriesProps> = (props) => {
  const [{ gridTemplateRows, gridTemplateColumns }] = useRecoilState(grid);
  const gridCssState = useRecoilValue(gridCss);

  return (
    <Box {...gridCssState} {...(props as any)}>
      {gridTemplateRows.map(({ id: rowId }) => (
        <React.Fragment key={rowId}>
          {gridTemplateColumns.map(({ id: columnId }) => (
            <Box
              key={columnId}
              bg="blue"
              borderRadius={5}
              className="GridEntry"
            />
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default GridEntries;
