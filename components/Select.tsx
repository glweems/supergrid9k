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
    <div className={`select ${props.className}`} style={style}>
      <RebassSelect {...props}>
        {options?.map((option, index) => (
          <option key={`${props.name}-${option}-${index}`} value={option}>
            {option}
          </option>
        ))}
      </RebassSelect>
    </div>
  );
};

export default Select;
