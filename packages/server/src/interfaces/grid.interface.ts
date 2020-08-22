import { GridState } from "../../../client/src/state";

export interface User {
  _id: string;
  grid: GridState;
  password: string;
}
