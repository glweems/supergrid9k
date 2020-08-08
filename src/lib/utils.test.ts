import {
  prettyName,
  groupRepeatedUnits,
  createRepetition,
  repeatStr,
} from "./utils";
import { defaultInputProps, defaultSelectProps } from "../store/grid";

test("prettyName", () => {
  expect(prettyName("gridTemplateRows")).toEqual("Grid Rows");
});

test("groupRepeatedUnits", () => {
  const [group] = groupRepeatedUnits(
    new Array(3).fill(null).map((_, index) => ({
      id: `row-${index}`,
      amount: 1,
      unit: "fr",
      inputProps: defaultInputProps,
      selectProps: defaultSelectProps,
    }))
  );
  expect(group).toEqual(["1fr", "1fr", "1fr"]);
});

test("createRepitition", () => {
  const groups = groupRepeatedUnits([
    { amount: 1, unit: "fr" },
    { amount: 1, unit: "fr" },
    { amount: 1, unit: "fr" },
  ]);
  const repeatStr = createRepetition(groups);
  expect(repeatStr).toEqual("repeat(3, 1fr)");
});

test("repeatStr", () => {
  const strings = [
    repeatStr([
      { amount: 1, unit: "fr" },
      { amount: 1, unit: "fr" },
      { amount: 1, unit: "fr" },
      { amount: 1, unit: "rem" },
    ]),
    repeatStr([
      { amount: 10, unit: "px" },
      { amount: 1, unit: "fr" },
      { amount: 1, unit: "fr" },
      { amount: 1, unit: "rem" },
    ]),
  ];

  expect(strings[0]).toEqual("repeat(3, 1fr) 1rem");
  expect(strings[1]).toEqual("10px repeat(2, 1fr) 1rem");
});
