import React from "react";
import { useRecoilState } from "recoil";
import { PlusIcon } from "../../lib/Icons";
import { grid, GridState } from "../../state";
import { defaultInputProps, defaultSelectProps } from "../../lib/utils";
import { Control } from "../../ui/Control";
import { GridEditorControl } from "./GridEditorControl";
import { Button, Text } from "rebass/styled-components";
import { prettyName } from "../../lib/utils";
import { Input } from "@rebass/forms/styled-components";
import Select from "../../components/Select";
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
            <fieldset key={key}>
              <Control>
                <legend className="control-label">{prettyName(name)}</legend>

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
            </fieldset>
          );
        })}

      <GridEditorGapControls />
    </React.Fragment>
  );
}

export const GridEditorGapControls = () => {
  const [{ gridGap }, setGridState] = useRecoilState(grid);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = ({ target: { name, value } }) => {
    setGridState((prev) => ({
      ...prev,
      gridGap: { ...gridGap, [name]: value },
    }));
  };
  return (
    <Control control="gridGap">
      <Text as="h3" className="control-label" mb={3}>
        Grid Gap
      </Text>
      <Input
        color="text"
        bg="code"
        name="amount"
        value={gridGap.amount}
        onChange={handleChange}
        {...gridGap.inputProps}
      />
      <Select
        color="text"
        bg="control"
        name="unit"
        value={gridGap.unit}
        onChange={handleChange}
        {...gridGap.selectProps}
      />
    </Control>
  );
};

let id = 0;
function getId() {
  return id++;
}

export default GridEditorControls;
