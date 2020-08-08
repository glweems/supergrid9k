import { prettyName } from "./utils";

test("prettyName", () => {
  expect(prettyName("gridTemplateRows")).toEqual("Grid Rows");
});
