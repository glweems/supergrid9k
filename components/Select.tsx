import {
  BorderBox,
  BorderBoxProps,
  Box,
  ButtonProps,
  ButtonOutline,
} from '@primer/components';
import Octicon, { ChevronDownIcon } from '@primer/octicons-react';
import React, { ChangeEvent, ChangeEventHandler, FC, memo } from 'react';

// eslint-disable-next-line prettier/prettier
export type SelectProps<
  T = string
> = React.SelectHTMLAttributes<HTMLSelectElement> &
  ButtonProps & {
    options: T[];
  };

const Select: FC<SelectProps> = memo(({ options, style, ...props }) => {
  return (
    <ButtonOutline
      as="select"
      width="70px"
      sx={{ paddingRight: 2 }}
      css={`
        position: relative;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background: ${(props) => props.theme.colors.bg.grayLight}
          url("data:image/svg+xml;utf8,<svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 16 16'
        width='16'
        height='16'
      >
        <path
          fill='gray'
          color='gray'
          fillRule='evenodd'
          d='M12.78 6.22a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0L3.22 7.28a.75.75 0 011.06-1.06L8 9.94l3.72-3.72a.75.75 0 011.06 0z'
        ></path>
      </svg>")
          no-repeat;
        background-position: right 5px top 50%;
      `}
      {...props}
    >
      {options?.map((option, index) => (
        <option key={`${props.name}.${option}.${index}`} value={option}>
          {option}
        </option>
      ))}
    </ButtonOutline>
  );
});
Select.displayName = 'Select';
export default Select;
