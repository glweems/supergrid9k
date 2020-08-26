import { Input } from "@rebass/forms/styled-components";
import React from "react";
import { Button } from "rebass/styled-components";
import { CloseIcon } from "../../lib/Icons";
import {
  GridStateName,
  GridTemplateEntry,
  useControlHandlers,
} from "../../state";
import Select from "../Select";
export interface GridEditorControlProps extends GridTemplateEntry {
  name: GridStateName;
}

export const GridEditorControl: React.FC<GridEditorControlProps> = ({
  id,
  amount,
  unit,
  inputProps,
  selectProps,
  name,
}) => {
  const { handleChange, handleDelete, canDelete } = useControlHandlers(
    name,
    id
  );

  return (
    <React.Fragment>
      {name !== "gridGap" && (
        <Button
          className="remove-entry"
          onClick={handleDelete}
          variant="default"
          disabled={canDelete}
        >
          <CloseIcon size={25} />
        </Button>
      )}

      <Input
        name="amount"
        className="control-start"
        value={amount}
        onChange={handleChange}
        {...inputProps}
      />

      <Select
        name="unit"
        className="control-end"
        value={unit}
        onChange={handleChange}
        {...selectProps}
      />
    </React.Fragment>
  );
};
