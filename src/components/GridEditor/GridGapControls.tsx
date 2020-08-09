import React from "react";
import { useRecoilState } from "recoil";
import { grid } from "../../state";
import Select from "../Select";
import { Control } from "./Control";
import { Input } from "@rebass/forms/styled-components";
import { Text } from "rebass/styled-components";
const GridGapControls = () => {
  const [{ gridGap }, setGridState] = useRecoilState(grid);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = ({ target: { name, value } }) => {
    setGridState((prev) => ({
      ...prev,
      gridGap: { ...gridGap, [name]: value },
    }));
  };
  return (
    <Control control="gridGap">
      <Text as="h3" className="control-label" mb={3}>
        Grid Gap
      </Text>
      <Input
        color="text"
        bg="lights.1"
        name="amount"
        value={gridGap.amount}
        onChange={handleChange}
        {...gridGap.inputProps}
      />
      <Select
        color="text"
        bg="lights.1"
        name="unit"
        value={gridGap.unit}
        onChange={handleChange}
        {...gridGap.selectProps}
      />
    </Control>
  );
};

export default GridGapControls;
