export function setCssObjectVariables(
  obj: Record<string, string>,
  prefix: string
): void {
  if (typeof document !== "undefined")
    Object.entries(obj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${prefix}-${key}`, value);
    });
}

export function setCssArrayVariables(
  arr: Array<string | number>,
  prefix: string
) {
  if (typeof document !== "undefined")
    arr.forEach((val, index) => {
      document.documentElement.style.setProperty(
        `--${prefix}-${index}`,
        `${val}`
      );
    });
}
