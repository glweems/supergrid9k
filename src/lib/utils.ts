import { GridTemplateEntry } from "../store/grid";

export function replaceItemAtIndex<T = object>(
  arr: T[],
  index: number,
  newValue: T
) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export function removeItemAtIndex<T = object>(arr: T[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export type TypeValue =
  | "array"
  | "object"
  | "function"
  | "string"
  | "number"
  | "asyncfunction"
  | "promise"
  | "undefined";

export const toType = (obj: unknown): TypeValue =>
  ({}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase());

export function templateGenerator<T extends object>(
  strings: TemplateStringsArray,
  ...keys: Array<keyof T>
) {
  return function (data: T) {
    let template = strings.slice();

    keys.forEach((key, i) => {
      template[i] = template[i] + data[key];
    });

    return template.join("");
  };
}

export function getAllowedEntry(
  name: string,
  value: "fr" | "%" | "px" | "vw" | "vh" | "em" | "rem" | "auto",
  entry: GridTemplateEntry
): GridTemplateEntry {
  switch (value) {
    case "%":
      return { ...entry, amount: 10, [name]: value };
    case "px":
      return {
        ...entry,
        amount: 100,
        [name]: value,
        inputProps: { ...entry.inputProps, max: 1000 },
      };
    case "vw":
      return { ...entry, amount: 10, [name]: value };
    case "vh":
      return { ...entry, amount: 10, [name]: value };
    case "em":
      return { ...entry, amount: 5, [name]: value };
    case "rem":
      return { ...entry, amount: 5, [name]: value };
    case "auto":
      return {
        ...entry,
        amount: "",
        [name]: value,
        inputProps: {
          ...entry.inputProps,
          disabled: true,
          style: { display: "none" },
        },
        selectProps: { ...entry.selectProps, style: { gridColumn: "1/3" } },
      };

    default:
      return { ...entry, [name]: value };
  }
}
