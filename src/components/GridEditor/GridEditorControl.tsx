import React from "react";
import { GridTemplateEntry, availableUnits } from "../../store/grid";
import Select from "../Select";
import { Icon } from "../../lib/Icons";
import styled from "styled-components";

interface GridEditorControlProps extends GridTemplateEntry {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
  name: string;
  index: number;
}

function generatorControlName(key: string, index: number, unit: string) {
  return [key, `[${index}]`, unit].join(".");
}

const GridEditorControl = ({
  id,
  name,
  index,
  amount,
  unit,
  inputProps,
  onChange,
  onDelete,
}: GridEditorControlProps) => {
  return (
    <GridEditorControlStyles>
      <input
        value={amount}
        onChange={onChange}
        type="number"
        name={generatorControlName(name, index, "amount")}
        {...inputProps}
      />

      <Select
        value={unit}
        name={generatorControlName(name, index, "unit")}
        onChange={onChange}
        options={availableUnits}
      />

      <button id={id} name={name} onClick={onDelete} className="icon">
        <Icon color="red">
          <path
            fillRule="evenodd"
            d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
          />
          <path
            fillRule="evenodd"
            d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
          />
        </Icon>
      </button>
    </GridEditorControlStyles>
  );
};

export default GridEditorControl;

export const GridEditorControlStyles = styled.div`
  display: grid;
  grid-column-gap: ${({ theme }) => theme.space.common};
  grid-template-columns: 70px auto 32px;
  /* height: 30px; */
  margin-bottom: 6px;
`;
