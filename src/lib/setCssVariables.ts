export default function setCssVariables(
  colors: Record<string, string>,
  prefix = "color"
): void {
  if (typeof document !== "undefined")
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${prefix}-${key}`, value);
    });

  console.debug("css vars set");
}
