import React from "react";
import { useRecoilState } from "recoil";
import { CloseIcon } from "../../lib/Icons";
import {
  getAllowedEntry,
  removeItemAtIndex,
  replaceItemAtIndex,
} from "../../lib/utils";
import { grid, GridState, GridTemplateEntry } from "../../store/grid";
import Button from "../../ui/Button";
import Select from "../Select";
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

  return (
    <React.Fragment>
      <input
        name="amount"
        value={entry.amount}
        onChange={handleChange}
        {...entry.inputProps}
      />

      <Select name="unit" onChange={handleChange} {...entry.selectProps} />
      <Button onClick={handleDelete} color="red" icon>
        <CloseIcon size={25} />
      </Button>
    </React.Fragment>
  );
}
