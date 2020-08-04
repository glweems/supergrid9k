import React, { FC } from "react";
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

const Select: FC<SelectProps> = ({ options, ...props }) => {
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
