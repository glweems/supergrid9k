type CssGridProps = Record<
  "display" | "gridTemplateRows" | "gridTemplateColumns" | "gridGap",
  string
>;

function templateGenerator<T extends object>(
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

const example: CssGridProps = {
  display: "grid",
  gridTemplateRows: "1fr 1fr 1fr",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridGap: "1rem",
};

const cssTemplate = templateGenerator<CssGridProps>`
  .grid-container {
    display: ${"display"};
    grid-template-rows: ${"gridTemplateRows"};
    grid-template-columns: ${"gridTemplateColumns"};
    grid-gap: ${"gridGap"};
  }
`;

const myCssString = cssTemplate(example);

console.log(myCssString);
