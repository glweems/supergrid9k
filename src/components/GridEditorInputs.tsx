import { useFormik } from "formik";
import { capitalize, snakeCase } from "lodash";
import React, { FC } from "react";
import { useRecoilState } from "recoil";
import {
  availableGridGapUnits,
  availableUnits,
  grid,
  GridState,
  GridTemplateEntry,
} from "../store/grid";
import Box from "../ui/Box";

const GridEditorInputs: FC = () => {
  const [gridState, setGridState] = useRecoilState<GridState>(grid);
  const formik = useFormik({
    initialValues: gridState,
    onSubmit: (values, helpers) => {
      setGridState(values);
    },
  });

  const { gridTemplateRows, gridTemplateColumns, gridGap } = formik.values;

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    formik.handleChange(event);
    formik.submitForm();
  };

  return (
    <Box
      as="form"
      onSubmit={formik.handleSubmit}
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
                    gridTemplateColumns="2fr 1fr"
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

                    <select
                      value={unit}
                      name={[key, `[${index}]`, "unit"].join(".")}
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                    >
                      {availableUnits.map((option) => (
                        <option key={[key, `[${index}]`, option].join(".")}>
                          {option}
                        </option>
                      ))}
                    </select>
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

        <select
          value={gridGap.unit}
          name="gridGap.unit"
          onChange={handleChange}
        >
          {availableGridGapUnits.map((option, index) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </Box>

      <button type="submit">submit</button>
    </Box>
  );
};

export default GridEditorInputs;
/* (
            <Box key={key} display="flex" flexDirection="column">
              {key}
              {entries.map(([amt, unit]) => (
                <Box>
                  <input type="number" value={amt} />
                  <select value={unit}>
                    {["fr", "em", "rem", "px", "%"].map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </Box>
              ))}
            </Box>
          ) */
