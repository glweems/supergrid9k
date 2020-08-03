import React from "react";
import { useRecoilState } from "recoil";
import code, { snippets } from "../store/code";
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
    <Box display="flex" flexDirection="column">
      <label style={{ width: "100%" }}>
        grid container class name
        <input
          name="gridContainerClassName"
          value={gridContainerClassName}
          onChange={handleChange}
          style={{ width: "94%" }}
        />
      </label>

      <label>
        <div>codeblock type</div>
        <Select
          name="snippet"
          value={snippet}
          onChange={handleChange}
          options={Object.keys(snippets)}
          style={{ width: "100%" }}
        />
      </label>
    </Box>
  );
};

export default CodeViewerControls;
