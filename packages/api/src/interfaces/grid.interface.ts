export type GridTemplateEntry = {
  id: string;
  amount: number | "";
  unit: string;
  inputProps: any;
};

export interface GridState {
  gridTemplateRows: GridTemplateEntry[];
  gridTemplateColumns: GridTemplateEntry[];
  gridGap: GridTemplateEntry[];
  gridContainerClassName: string;
  useCssRepeatFn: boolean;
}
export interface Grid extends GridState {
  _id: string;
}
