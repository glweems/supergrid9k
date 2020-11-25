export function setCssObjectVariables(
  obj: Record<string, string>,
  prefix: string
): void {
  typeof document !== 'undefined' &&
    Object.entries(obj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${prefix}-${key}`, value);
    });
}

export function setCssArrayVariables(
  arr: Array<string | number>,
  prefix: string
) {
  if (typeof document !== 'undefined')
    arr.forEach((val, index) => {
      document.documentElement.style.setProperty(
        `--${prefix}-${index}`,
        `${val}`
      );
    });
}

export function guestersEventListeners() {
  typeof document !== 'undefined' &&
    document.addEventListener('gesturestart', (e) => e.preventDefault());
  typeof document !== 'undefined' &&
    document.addEventListener('gesturechange', (e) => e.preventDefault());
}
