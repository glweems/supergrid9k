import React from "react";
import { useRecoilState } from "recoil";
import { CloseIcon } from "../../lib/Icons";
import { removeItemAtIndex, replaceItemAtIndex } from "../../lib/utils";
import { grid, GridState, GridTemplateEntry } from "../../store/grid";
import Button from "../../ui/Button";
import Select from "../Select";
export interface GridEditorControlProps {
  entry: GridTemplateEntry;
  name: keyof Omit<GridState, "gridGap">;
}

function getAllowedEntry(
  name: string,
  value: "fr" | "%" | "px" | "vw" | "vh" | "em" | "rem" | "auto",
  entry: GridTemplateEntry
): GridTemplateEntry {
  switch (value) {
    case "%":
      return { ...entry, amount: 10, [name]: value };
    case "px":
      return { ...entry, amount: 100, [name]: value };
    case "vw":
      return { ...entry, amount: 10, [name]: value };
    case "vh":
      return { ...entry, amount: 10, [name]: value };
    case "em":
      return { ...entry, amount: 5, [name]: value };
    case "rem":
      return { ...entry, amount: 5, [name]: value };
    case "auto":
      return {
        ...entry,
        amount: "",
        [name]: value,
        inputProps: {
          ...entry.inputProps,
          disabled: true,
          style: { display: "none" },
        },
        selectProps: { ...entry.selectProps, style: { gridColumn: "1/3" } },
      };

    default:
      return { ...entry, [name]: value };
  }
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
