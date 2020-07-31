import { useFormik } from "formik";
import { capitalize, snakeCase } from "lodash";
import React, { ChangeEventHandler, FC, MouseEventHandler } from "react";
import { useRecoilState } from "recoil";
import shortid from "shortid";
import { Icon } from "../../lib/Icons";
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
    <React.Fragment>
      {Object.entries({ gridTemplateRows, gridTemplateColumns }).map(
        ([key, entries]: [string, GridTemplateEntry[]]) => {
          return (
            <React.Fragment key={key}>
              <h3>{snakeCase(key).split("_").map(capitalize).join(" ")}</h3>
              <Box
                display="grid"
                marginBottom={1}
                color="light"
                gridTemplateColumns="1fr 1fr auto"
                gridGap={1}
                padding={1}
              >
                {entries.map((entry, index) => {
                  if (entry === null) return entry;
                  const { id, amount, unit, props } = entry;
                  return (
                    <React.Fragment>
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
                        id={id}
                        name={key}
                        onClick={handleDelete}
                        className="icon"
                      >
                        <Icon color="red">
                          <path
                            fill-rule="evenodd"
                            d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                          />
                        </Icon>
                      </button>
                    </React.Fragment>
                  );
                })}
                <Box
                  as="button"
                  type="button"
                  marginTop={3}
                  name={key}
                  onClick={handleAdd}
                  style={{ gridColumn: "1/-1" }}
                  bg="green"
                  className="icon"
                >
                  <Icon color="light">
                    <path
                      fill-rule="evenodd"
                      d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
                    />
                  </Icon>
                </Box>
              </Box>
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
