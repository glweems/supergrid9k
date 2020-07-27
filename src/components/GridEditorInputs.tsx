import { useFormik } from "formik";
import { capitalize, snakeCase } from "lodash";
import React, { FC, ChangeEventHandler, MouseEventHandler } from "react";
import { useRecoilState } from "recoil";
import {
  availableGridGapUnits,
  availableUnits,
  grid,
  GridState,
  GridTemplateEntry,
} from "../store/grid";
import Box from "../ui/Box";
import Select from "./Select";

const GridEditorInputs: FC = () => {
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
    const [key, index] = event.currentTarget.name.split(".");
    console.log(key, index);
    let newGrid = gridState;

    delete (newGrid as any)[key][Number(index)];
    console.log(newGrid);
    setGridState(newGrid);
  };

  return (
    <Box
      as="form"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      display="flex"
      flexDirection="column"
      bg="platinum"
      padding={2}
    >
      {Object.entries({ gridTemplateRows, gridTemplateColumns }).map(
        ([key, entries]: [string, GridTemplateEntry[]]) => {
          return (
            <React.Fragment key={key}>
              <h3>{snakeCase(key).split("_").map(capitalize).join(" ")}</h3>

              {entries.map(({ id, amount, unit, props }, index) => (
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

                    <button
                      name={[key, index].join(".")}
                      onClick={handleDelete}
                    >
                      X
                    </button>
                  </Box>
                </Box>
              ))}
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
