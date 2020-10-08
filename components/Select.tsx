import {
  Select as RebassSelect,
  SelectProps as RebassSelectProps,
} from '@rebass/forms/styled-components';
import React, { FC } from 'react';

export interface SelectProps<T = string> extends RebassSelectProps {
  options: T[];
}

const Select: FC<SelectProps> = ({ options, style, ...props }) => {
  return (
    <RebassSelect className="Select" {...props}>
      {options?.map((option, index) => (
        <option key={`${props.name}-${option}-${index}`} value={option}>
          {option}
        </option>
      ))}
    </RebassSelect>
  );
};

export default Select;
