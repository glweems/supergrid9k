import React, { FC } from "react";
import { GridSelectInputProps } from "./GridEditor/GridEditorInputs";

const Select: FC<GridSelectInputProps> = ({ options, ...props }) => {
  return (
    <select {...(props as any)}>
      {options.map((option, index) => (
        <option key={`${props.name}-${option}-${index}`} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
