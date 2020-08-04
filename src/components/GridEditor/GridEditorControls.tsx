import React from "react";
import { useRecoilState } from "recoil";
import { PlusIcon } from "../../lib/Icons";
import {
  defaultInputProps,
  defaultSelectProps,
  grid,
  GridState,
} from "../../store/grid";
import Button from "../../ui/Button";
import { Control } from "./Control";
import { GridEditorControl } from "./GridEditorControl";
import GridGapControls from "./GridGapControls";

function GridEditorControls() {
  const [{ gridGap, ...gridState }, setGridState] = useRecoilState(grid);

  const handleAdd: React.MouseEventHandler<HTMLButtonElement> = ({
    currentTarget,
  }) => {
    const name = currentTarget.name as keyof GridState;

    setGridState((prev) => ({
      ...prev,
      [name]: [
        ...prev[name],
        {
          id: getId(),
          amount: 1,
          unit: "fr",
          inputProps: defaultInputProps,
          selectProps: defaultSelectProps,
        },
      ],
    }));
  };

  return (
    <React.Fragment>
      {Object.keys(gridState).map((key) => {
        const name: keyof typeof gridState = key as any;
        return (
          <React.Fragment key={key}>
            <Control>
              <h3 className="control-label">
                {name
                  .split("Template")
                  .join(" ")
                  .replace(/(?:^|\s)\S/g, function (a) {
                    return a.toUpperCase();
                  })}
              </h3>
              {gridState[name].map((entry) => (
                <GridEditorControl key={entry.id} entry={entry} name={name} />
              ))}

              <Button
                name={key}
                className="add-entry"
                onClick={handleAdd}
                color="green"
                fullWidth
              >
                <PlusIcon />
              </Button>
            </Control>
          </React.Fragment>
        );
      })}

      <GridGapControls />
    </React.Fragment>
  );
}

let id = 0;
function getId() {
  return id++;
}

export default GridEditorControls;
