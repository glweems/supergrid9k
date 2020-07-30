import React from "react";
import { useRecoilState } from "recoil";
import code from "../store/code";
import Box from "../ui/Box";
import Select from "./Select";

const CodeViewerControls: React.FC = () => {
  const [{ gridContainerClassName, snippet }, setCodeState] = useRecoilState(
    code
  );
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    setCodeState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Box color="light">
      <Box>
        <label>
          <div>{gridContainerClassName}</div>
          <input
            name="gridContainerClassName"
            value={gridContainerClassName}
            onChange={handleChange}
          />
        </label>
      </Box>

      <Box>
        <Select
          name="snippet"
          value={snippet}
          onChange={handleChange}
          options={["css", "styled-components", "json"]}
        />
      </Box>
    </Box>
  );
};

export default CodeViewerControls;
