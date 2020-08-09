import React from "react";
import { useRecoilState } from "recoil";
import { PlusIcon } from "../../lib/Icons";
import { grid, GridState } from "../../state";
import { defaultInputProps, defaultSelectProps } from "../../lib/utils";
import { Control } from "./Control";
import { GridEditorControl } from "./GridEditorControl";
import GridGapControls from "./GridGapControls";
import { Button, Text } from "rebass/styled-components";
import { prettyName } from "../../lib/utils";

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
      {Object.keys(gridState)
        .reverse()
        .map((key) => {
          const name: keyof typeof gridState = key as any;
          return (
            <React.Fragment key={key}>
              <Control>
                <Text as="h3" className="control-label" mb={3}>
                  {prettyName(name)}
                </Text>

                {gridState[name].map((entry) => (
                  <GridEditorControl key={entry.id} entry={entry} name={name} />
                ))}

                <Button
                  name={key}
                  className="add-entry"
                  onClick={handleAdd}
                  variant="primary"
                  bg="green"
                  color="text"
                >
                  <PlusIcon size={28} padding={0} />
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
