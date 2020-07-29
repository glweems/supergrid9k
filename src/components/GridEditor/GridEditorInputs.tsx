import { useFormik } from "formik";
import { capitalize, snakeCase } from "lodash";
import React, { FC, ChangeEventHandler, MouseEventHandler } from "react";
import { useRecoilState } from "recoil";
import shortid from "shortid";
import {
  availableGridGapUnits,
  availableUnits,
  grid,
  GridState,
  GridTemplateEntry,
} from "../../store/grid";
import Box, { BoxProps } from "../../ui/Box";
import Select from "../Select";

const GridEditorInputs: FC<BoxProps> = (props) => {
  const [gridState, setGridState] = useRecoilState<GridState>(grid);

  const { setValues, ...formik } = useFormik({
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
    setValues(obj);
    formik.submitForm();
  };

  const handleAdd: MouseEventHandler<HTMLButtonElement> = (event) => {
    const obj = {
      ...gridState,
      [event.currentTarget.name]: [
        ...(gridState as any)[event.currentTarget.name],
        {
          id: shortid(),
          amount: 1,
          unit: "fr",
          props: { min: 0, max: 100, step: 1, disabled: false, type: "number" },
        },
      ],
    };
    setValues(obj);
    formik.submitForm();
  };

  return (
    <Box {...(props as any)}>
      {Object.entries({ gridTemplateRows, gridTemplateColumns }).map(
        ([key, entries]: [string, GridTemplateEntry[]]) => {
          return (
            <React.Fragment key={key}>
              <h3>{snakeCase(key).split("_").map(capitalize).join(" ")}</h3>

              {entries.map((entry, index) => {
                if (entry === null) return entry;
                const { id, amount, unit, props } = entry;
                return (
                  <Box key={id} marginBottom={1}>
                    <Box
                      display="grid"
                      gridTemplateColumns="2fr 1fr auto"
                      gridGap={1}
                      padding={1}
                    >
                      <input
                        value={amount}
                        onChange={handleChange}
                        type="number"
                        name={[key, `[${index}]`, "amount"].join(".")}
                        {...props}
                      />

                      <Select
                        value={unit}
                        name={[key, `[${index}]`, "unit"].join(".")}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        options={availableUnits}
                      />

                      <button id={id} name={key} onClick={handleDelete}>
                        X
                      </button>
                    </Box>
                  </Box>
                );
              })}
              <button name={key} onClick={handleAdd}>
                +
              </button>
            </React.Fragment>
          );
        }
      )}

      <h3>Grid Gap</h3>
      <Box display="grid" gridTemplateColumns="2fr 1fr" gridGap={1} padding={1}>
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
      </Box>

      <button type="submit">submit</button>

      <button type="reset">reset</button>
    </Box>
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
