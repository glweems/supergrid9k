import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import shortid from "shortid";
import { grid, gridCss, gridSquares } from "../store/grid";
import Box from "../ui/Box";
import GridEditorInputs from "./GridEditorInputs";

const GridEditor = () => {
  const [gridState] = useRecoilState(grid);
  const numGridSquares = useRecoilValue(gridSquares);
  const css = useRecoilValue(gridCss);

  return (
    <React.Fragment>
      <Box
        as="aside"
        bg="oxfordBlue"
        display="flex"
        justifyContent="center"
        color="white"
        padding={3}
      >
        <GridEditorInputs />
      </Box>
      <Box display="grid" {...css} gridGap={1}>
        {gridState &&
          gridState.gridTemplateColumns &&
          gridState.gridTemplateRows &&
          new Array(numGridSquares)
            .fill(null)
            .map((row, rowIndex) => (
              <Box
                key={shortid()}
                width={[1]}
                bg={rowIndex % 2 === 0 ? "orangeWeb" : "platinum"}
              />
            ))}
      </Box>
    </React.Fragment>
  );
};

export default GridEditor;
