import React, { FC } from "react";
import { GridSelectInputProps } from "./GridEditorInputs";

const Select: FC<GridSelectInputProps> = ({ options, ...props }) => {
  return (
    <select {...props}>
      {options.map((option, index) => (
        <option key={`${props.name}-${option}-${index}`} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
