import { createSchema, Type, typedModel, ExtractProps, ExtractDoc } from 'ts-mongoose';
import { Schema, model } from 'mongoose';

const InputPropsSchema = createSchema(
  {
    name: Type.string(),
    min: Type.number(),
    max: Type.number(),
    step: Type.number(),
    disabled: Type.boolean(),
    type: Type.string(),
  },
  { _id: false }
);
const SelectPropsSchema = createSchema(
  {
    name: Type.string(),
    disabled: Type.boolean(),
    options: Type.array().of(Type.string()),
  },
  { _id: false }
);

const GridTemplateEntrySchema = createSchema(
  {
    id: Type.string({ required: true }),
    amount: Type.number({ required: true }),
    unit: Type.string({ required: true }),
    inputProps: Type.schema().of(InputPropsSchema),
    selectProps: Type.schema().of(SelectPropsSchema),
  },
  { _id: false, __v: false }
);

const GridSchema = createSchema(
  {
    url: Type.string({ required: false }),
    gridTemplateRows: Type.array({ required: true }).of(GridTemplateEntrySchema),
    gridTemplateColumns: Type.array({ required: true }).of(GridTemplateEntrySchema),
    gridGap: Type.array({ required: true }).of(GridTemplateEntrySchema),
    gridContainerClassName: Type.string({ required: true }),
    useCssRepeatFn: Type.boolean({ required: true }),
  },
  { timestamps: { createdAt: true } }
);

// gridSchema.plugin(paginate);
export type GridDoc = ExtractDoc<typeof GridSchema>;
export type Grid = Omit<ExtractProps<typeof GridSchema>, '__v'>;

export default typedModel('Grid', GridSchema);

/* import * as Mongoose from "mongoose";
import { Grid } from "../interfaces/grid.interface";
import { createSchema, Type, typedModel } from "ts-mongoose";

const GridTemplateEntrySchema = createSchema({
  id: Type.string({}),
  amount: Type.number({}),
  unit: Type.object(),
  inputProps: Type.object(),
  selectProps: Type.object(),
});

const GridSchema = createSchema(
  {
    gridTemplateRows: Type.array().of(GridTemplateEntrySchema),
    gridTemplateColumns: Type.array().of(GridTemplateEntrySchema),
    gridGap: Type.array().of(GridTemplateEntrySchema),
    gridContainerClassName: Type.string(),
    useCssRepeatFn: Type.boolean(),
  },
  { timestamps: { createdAt: true } }
);

const GridModel = typedModel("Grid", GridSchema);

export default GridModel;
 */
