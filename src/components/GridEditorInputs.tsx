import React, { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { grid, gridValues } from "../store/grid";
import Box from "../ui/Box";

const GridEditorInputs: FC = () => {
  const [gridState, setGridState] = useRecoilState(grid);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log("name", event.target.name);
  };

  const { numGridSquares, ...values } = useRecoilValue(gridValues);
  return (
    <div>
      <Box>
        {Object.keys(values).map((key) => {
          let entries: [string, string] = (values as any)[key] as any;
          console.log("entries: ", entries);

          return (
            <Box key={key} display="flex" flexDirection="column">
              {key}
              {entries.map(([amt, unit]) => (
                <Box>
                  <input type="number" value={amt} />
                  <select value={unit}>
                    {["fr", "em", "rem", "px", "%"].map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </Box>
              ))}
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default GridEditorInputs;
