import * as Mongoose from 'mongoose';
import { Grid } from '../interfaces/grid.interface';

const gridSchema = new Mongoose.Schema({
  grid: {
    gridTemplateRows: [
      {
        id: String,
        amount: Number,
        unit: String,
        inputProps: Object,
        selectProps: Object,
      },
    ],
    gridTemplateColumns: [
      {
        id: String,
        amount: Number,
        unit: String,
        inputProps: Object,
        selectProps: Object,
      },
    ],
    // gridGap
    gridContainerClassName: String,
    useCssRepeatFn: Boolean,
  },
});

type GridModel = Mongoose.Document & Grid;

const gridModel = Mongoose.model<GridModel>('Grid', gridSchema);

export default gridModel;
