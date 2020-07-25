import * as CSS from "csstype";

export const colors = {
  black: "#000000",
  oxfordBlue: "#14213d",
  orangeWeb: "#fca311",
  platinum: "#e5e5e5",
  white: "#ffffff",
};

export interface SuperGrid9kTheme {
  colors: {
    black: CSS.ColorProperty;
    oxfordBlue: CSS.ColorProperty;
    orangeWeb: CSS.ColorProperty;
    platinum: CSS.ColorProperty;
    white: CSS.ColorProperty;
  };
}

const theme: SuperGrid9kTheme = {
  colors,
};

export default theme;
