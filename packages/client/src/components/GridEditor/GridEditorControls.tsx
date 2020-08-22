import { Input } from "@rebass/forms/styled-components";
import React from "react";
import { Button, Text } from "rebass/styled-components";
import { useRecoilState } from "recoil";
import Select from "../../components/Select";
import { PlusIcon } from "../../lib/Icons";
import {
  defaultInputProps,
  defaultSelectProps,
  prettyName,
} from "../../lib/utils";
import { grid, GridState } from "../../state";
import { Control } from "../../ui/Control";
import { GridEditorControl } from "./GridEditorControl";
function GridEditorControls() {
  const [
    { gridTemplateColumns, gridTemplateRows },
    setGridState,
  ] = useRecoilState(grid);
  const gridState = { gridTemplateRows, gridTemplateColumns };

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
          <Control key={name}>
            <div className="elements">
              <legend className="control-label">{prettyName(name)}</legend>

              {gridState[name].map((entry) => (
                <GridEditorControl key={entry.id} entry={entry} name={name} />
              ))}

              <Button
                name={key}
                className="add-entry"
                onClick={handleAdd}
                color="green"
                variant="outline"
              >
                <PlusIcon size={28} padding={0} />
              </Button>
            </div>
          </Control>
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
        name="amount"
        value={gridGap.amount}
        onChange={handleChange}
        {...gridGap.inputProps}
      />
      <Select
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