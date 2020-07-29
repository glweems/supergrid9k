import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { grid, gridCss } from "../../store/grid";
import Box, { BoxProps } from "../../ui/Box";

const GridEntries: React.FC<BoxProps> = (props) => {
  const [{ gridTemplateRows, gridTemplateColumns }] = useRecoilState(grid);
  const gridCssState = useRecoilValue(gridCss);

  return (
    <Box as="div" {...gridCssState} {...(props as any)}>
      {gridTemplateRows.map(({ id: rowId }) => (
        <React.Fragment key={rowId}>
          {gridTemplateColumns.map(({ id: columnId }) => (
            <Box key={columnId} bg="blue" borderRadius={5} />
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default GridEntries;
