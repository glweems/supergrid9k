export default function templateGenerator<T extends object>(
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
