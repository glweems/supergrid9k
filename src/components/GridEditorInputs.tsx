import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { gridValues } from "../store/grid";
import Box from "../ui/Box";

const GridEditorInputs: FC = () => {
  const { numGridSquares, ...values } = useRecoilValue(gridValues);
  return (
    <div>
      <Box>
        {Object.keys(values).map((key) => {
          let entries: string[] = (values as any)[key] as any;
          console.log('entries: ', entries);
          return (
            <Box key={key}>
              {key}
              <input name={key} />
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default GridEditorInputs;
