import { useFormik } from "formik";
import { capitalize, snakeCase } from "lodash";
import React, { ChangeEventHandler, FC, MouseEventHandler } from "react";
import { useRecoilState } from "recoil";
import shortid from "shortid";
import { Icon } from "../../lib/Icons";
import {
  availableGridGapUnits,
  defaultInputProps,
  grid,
  GridState,
  GridTemplateEntry,
} from "../../store/grid";
import { BoxProps } from "../../ui/Box";
import Select from "../Select";
import GridEditorControl, {
  GridEditorControlStyles,
} from "./GridEditorControl";

const GridEditorInputs: FC<BoxProps> = (props) => {
  const [gridState, setGridState] = useRecoilState<GridState>(grid);

  const formik = useFormik({
    initialValues: gridState,
    onSubmit: (values) => {
      setGridState(values);
    },
  });

  const { gridTemplateRows, gridTemplateColumns, gridGap } = formik.values;

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    formik.handleChange(event);
    formik.submitForm();
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
    const obj = {
      ...gridState,
      [event.currentTarget.name]: (gridState as any)[
        event.currentTarget.name as any
      ].filter((obj: GridTemplateEntry) => obj.id !== event.currentTarget.id),
    };
    formik.setValues(obj);
    formik.submitForm();
  };

  const handleAdd: MouseEventHandler<HTMLButtonElement> = (event) => {
    let name = event.currentTarget.name as keyof GridState;

    const obj: GridState = {
      ...gridState,
      [event.currentTarget.name]: [
        ...gridState[name],
        {
          id: shortid(),
          amount: 1,
          unit: "fr",
          inputProps: defaultInputProps,
        },
      ],
    };

    formik.setValues(obj);
    formik.submitForm();
  };

  return (
    <React.Fragment>
      {Object.entries({ gridTemplateRows, gridTemplateColumns }).map(
        ([key, entries]: [string, GridTemplateEntry[]]) => {
          return (
            <React.Fragment key={key}>
              <h3>{snakeCase(key).split("_").map(capitalize).join(" ")}</h3>
              <div>
                {entries.map((entry, index) => (
                  <GridEditorControl
                    key={entry.id + index}
                    {...entry}
                    name={key}
                    index={index}
                    onChange={handleChange}
                    onDelete={handleDelete}
                  />
                ))}
                <button name={key} className="icon" onClick={handleAdd}>
                  <Icon color="light">
                    <path
                      fillRule="evenodd"
                      d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
                    />
                  </Icon>
                </button>
              </div>
            </React.Fragment>
          );
        }
      )}

      <h3>Grid Gap</h3>

      <GridEditorControlStyles>
        <input
          type="number"
          value={gridGap.amount}
          name="gridGap.amount"
          onChange={handleChange}
        />

        <Select
          value={gridGap.unit}
          name="gridGap.unit"
          onChange={handleChange}
          options={availableGridGapUnits}
        />
      </GridEditorControlStyles>
    </React.Fragment>
  );
};

export interface GridSelectInputProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: string[];
}

export default GridEditorInputs;
