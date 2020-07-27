import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { grid, gridCss } from "../store/grid";
import Box from "../ui/Box";

const GridEntries: React.FC = () => {
  const [{ gridTemplateRows, gridTemplateColumns }] = useRecoilState(grid);
  const gridCssState = useRecoilValue(gridCss);

  return (
    <Box {...gridCssState} padding="0.4em">
      {gridTemplateRows.map(({ id: rowId }) => (
        <React.Fragment key={rowId}>
          {gridTemplateColumns.map(({ id: columnId }) => (
            <Box key={columnId} bg="orangeWeb" borderRadius={5} />
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default GridEntries;
