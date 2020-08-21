import { Checkbox, Input, Label } from "@rebass/forms/styled-components";
import React from "react";
import { Box } from "rebass/styled-components";
import { useRecoilState } from "recoil";
import { cssRepeat, gridContainerClass } from "../state";

const CodeViewerControls = () => {
  const [isRepeatingCss, setIsRepeatingCss] = useRecoilState(cssRepeat);
  const [className, setClassName] = useRecoilState(gridContainerClass);

  return (
    <React.Fragment>
      <Box className="control">
        <Label htmlFor="repeat-checkbox">
          <Checkbox
            id="repeat-checkbox"
            defaultChecked={isRepeatingCss}
            onClick={() => setIsRepeatingCss((prev) => !prev)}
            variant="secondary"
            marginRight={1}
          />
          Use CSS Repeat Function.
        </Label>
      </Box>

      <Box className="control">
        <Label>Grid Container Class Name</Label>
        <Input
          defaultValue={className}
          onChange={(e) => setClassName(e.target.value)}
        />
      </Box>
    </React.Fragment>
  );
};

export default CodeViewerControls;
