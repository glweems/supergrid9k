import React, { FC } from "react";
import styled from "styled-components";
import { GridSelectInputProps } from "./GridEditor/GridEditorInputs";

const Select: FC<GridSelectInputProps> = ({ options, ...props }) => {
  return (
    <Styles className="select">
      <select {...props}>
        {options.map((option, index) => (
          <option key={`${props.name}-${option}-${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Styles>
  );
};

const Styles = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  line-height: 3;
  select {
    flex: 1;
    padding: 0 0.5em;
    color: inherit;
    background-image: none;
    border: 0 !important;
    outline: 0;
    box-shadow: none;
    cursor: pointer;
    :hover::after {
      /* color: #f39c12; */
    }
    &:-ms-expand {
      display: none;
    }
  }
  /* Arrow */
`;

export default Select;
