import { Checkbox, Input, Label } from "@rebass/forms/styled-components";
import React from "react";
import { Box } from "rebass/styled-components";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { cssRepeatFn, gridContainerClassName } from "../state";

const CodeViewerControls = () => {
  const checked = useRecoilValue(cssRepeatFn);
  const toggle = useResetRecoilState(cssRepeatFn);
  const className = useRecoilValue(gridContainerClassName);
  const setClassName = useSetRecoilState(gridContainerClassName);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setClassName(event.target.value);
  };

  return (
    <React.Fragment>
      <Box className="control">
        <Label htmlFor="repeat-checkbox">
          <Checkbox
            id="repeat-checkbox"
            defaultChecked={checked}
            onClick={toggle}
            variant="secondary"
            marginRight={1}
          />
          Use CSS Repeat Function.
        </Label>
      </Box>

      <Box className="control">
        <Label>Grid Container Class Name</Label>
        <Input value={className} onChange={handleChange} />
      </Box>
    </React.Fragment>
  );
};

export default CodeViewerControls;
