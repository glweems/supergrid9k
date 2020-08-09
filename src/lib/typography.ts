import Typography from "typography";
import sutro from "typography-theme-sutro";
import CodePlugin from "typography-plugin-code";

sutro.plugins = [new CodePlugin()];
// customize defaults
// fairyGates.baseFontSize = "42px"; // was 20px.
const typography = new Typography(sutro);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
