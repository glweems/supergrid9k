import mongoose from 'mongoose';

export const GridSchema = new mongoose.Schema(
  {
    gridTemplateRows: [
      {
        id: String,
        amount: String,
        unit: String,
      },
    ],
    gridTemplateColumns: [
      {
        id: String,
        amount: String,
        unit: String,
      },
    ],
    gridGap: [
      {
        id: String,
        amount: String,
        unit: String,
      },
    ],
    gridContainerClassName: String,
    useCssRepeatFn: Boolean,
  },
  { timestamps: true }
);

export default mongoose.models.Grid || mongoose.model('Grid', GridSchema);
/* const InputPropsSchema = createSchema(
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

  { _id: false, __v: false }
); */
// gridSchema.plugin(paginate);
// export type GridDoc = ExtractDoc<typeof GridSchema>;
// export type Grid = Omit<ExtractProps<typeof GridSchema>, '__v'>;

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
