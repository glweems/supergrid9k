import React from "react";
import styled from "styled-components";
import { CloseIcon } from "../../lib/Icons";
import { availableUnits, GridTemplateEntry } from "../../store/grid";
import Select from "../Select";
import Button from "../../ui/Button";

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

      <Button
        fullWidth
        bg="red"
        color="light"
        id={id}
        name={name}
        onClick={onDelete}
        className="icon"
      >
        <CloseIcon />
      </Button>
    </GridEditorControlStyles>
  );
};

export default GridEditorControl;

export const GridEditorControlStyles = styled.div`
  display: grid;
  grid-column-gap: ${({ theme }) => theme.space.common};
  grid-template-columns: 70px auto 32px;
  margin-bottom: 6px;
`;
