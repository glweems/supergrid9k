import { useFormik } from "formik";
import React, { FC } from "react";
import { useRecoilState } from "recoil";
import {
  availableUnits,
  grid,
  GridState,
  GridTemplateEntry,
} from "../store/grid";
const GridEditorInputs: FC = () => {
  const [gridState, setGridState] = useRecoilState<GridState>(grid);
  const formik = useFormik({
    initialValues: gridState,
    onSubmit: (values, helpers) => {
      console.log("helpers: ", helpers);
      setGridState(values);
    },
  });

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    formik.handleChange(event);
    formik.submitForm();
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {Object.entries(formik.values).map(
          ([key, entries]: [string, GridTemplateEntry[]]) => {
            return (
              <div key={key}>
                <div>{key}</div>

                {entries.map(({ id, amount, unit }, index) => (
                  <div key={id}>
                    <input
                      value={amount}
                      onChange={handleChange}
                      type="number"
                      name={[key, `[${index}]`, "amount"].join(".")}
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
                  </div>
                ))}
              </div>
            );
          }
        )}
        <button type="submit">submit</button>
      </form>
    </div>
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
