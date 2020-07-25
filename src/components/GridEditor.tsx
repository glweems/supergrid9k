import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import shortid from "shortid";
import { grid, gridValues } from "../store/grid";
import Box from "../ui/Box";
import GridEditorInputs from "./GridEditorInputs";

const GridEditor = () => {
  const [gridState] = useRecoilState(grid);
  const { numGridSquares } = useRecoilValue(gridValues);

  return (
    <Box>
      <GridEditorInputs />
      <Box display="grid" {...gridState} gridGap={1}>
        {new Array(numGridSquares).fill(shortid).map((row, rowIndex) => (
          <Box key={row + rowIndex} width={[1]} height={100} bg="orangeWeb" />
        ))}
      </Box>
    </Box>
  );
};

export default GridEditor;
