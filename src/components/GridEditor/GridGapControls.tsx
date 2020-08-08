import React from "react";
import { useRecoilState } from "recoil";
import { grid } from "../../store/grid";
import Select from "../Select";
import { Control } from "./Control";

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
    <Control>
      <h3 className="control-label">Grid Gap</h3>
      <input
        name="amount"
        value={gridGap.amount}
        onChange={handleChange}
        {...gridGap.inputProps}
      />
      <Select
        name="unit"
        value={gridGap.unit}
        onChange={handleChange}
        {...gridGap.selectProps}
      />
    </Control>
  );
};

export default GridGapControls;
