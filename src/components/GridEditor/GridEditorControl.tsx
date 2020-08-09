import React from "react";
import { useRecoilState } from "recoil";
import { CloseIcon } from "../../lib/Icons";
import {
  getAllowedEntry,
  removeItemAtIndex,
  replaceItemAtIndex,
} from "../../lib/utils";
import { grid, GridState, GridTemplateEntry } from "../../state";
import Select from "../Select";
import { Input } from "@rebass/forms/styled-components";
import { Button } from "rebass/styled-components";
export interface GridEditorControlProps {
  entry: GridTemplateEntry;
  name: keyof Omit<GridState, "gridGap">;
}

export function GridEditorControl({
  name: objkey,
  entry,
}: GridEditorControlProps) {
  const [gridState, setGridState] = useRecoilState(grid);
  const index = gridState[objkey].findIndex((listItem) => listItem === entry);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = ({ target: { name, value } }) => {
    const newEntry = replaceItemAtIndex<GridTemplateEntry>(
      gridState[objkey],
      index,
      getAllowedEntry(name, value as any, entry)
    );

    setGridState((prev) => ({ ...prev, [objkey]: newEntry }));
  };

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const newEntries = removeItemAtIndex(gridState[objkey], index);

    setGridState((prev) => ({ ...prev, [objkey]: newEntries }));
  };

  const disableDelete = gridState[objkey].length < 2;

  return (
    <React.Fragment>
      <Input
        color="text"
        bg="lights.1"
        name="amount"
        value={entry.amount}
        onChange={handleChange}
        {...entry.inputProps}
      />

      <Select
        color="text"
        bg="lights.1"
        name="unit"
        onChange={handleChange}
        {...entry.selectProps}
      />

      <Button
        className="remove-entry"
        onClick={handleDelete}
        variant="close"
        disabled={disableDelete}
      >
        <CloseIcon size={25} />
      </Button>
    </React.Fragment>
  );
}
