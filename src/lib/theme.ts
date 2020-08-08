import { createGlobalStyle } from "styled-components";

export const themeColors = {
  primary: "#1769ff",
  secondary: "#f8f8f81A",
  blue: "#1769ff",
  background: "#151b1e",
  text: "#fff",
  muted: "#f6f6f9",
  gray: "#dddddf",
  highlight: "hsla(205, 100%, 40%, 0.125)",
  blues: [
    "#1769ffFF",
    "#1769ff1A",
    "#1769ff33",
    "#1769ff4D",
    "#1769ff66",
    "#1769ff80",
    "#1769ff99",
    "#1769ffB3",
    "#1769ffCC",
    "#1769ffE6",
  ],
  green: "#4caf50",
  greens: [
    "#4caf501A",
    "#4caf5033",
    "#4caf504D",
    "#4caf5066",
    "#4caf5080",
    "#4caf5099",
    "#4caf50B3",
    "#4caf50CC",
    "#4caf50E6",
  ],
  mint: "#a7e3cc",
  mints: [
    "#a7e3ccff",
    "#a7e3cc1a",
    "#a7e3cc33",
    "#a7e3cc4D",
    "#a7e3cc66",
    "#a7e3cc80",
    "#a7e3cc99",
    "#a7e3ccB3",
    "#a7e3ccCC",
    "#a7e3ccE6; ",
  ],
  purple: "#d0c1fa",
  purples: [
    "#d0c1faFF",
    "#d0c1fa1A",
    "#d0c1fa33",
    "#d0c1fa4D",
    "#d0c1fa66",
    "#d0c1fa80",
    "#d0c1fa99",
    "#d0c1faB3",
    "#d0c1faCC",
    "#d0c1faE6",
  ],
  red: "#e44932",
  reds: [
    "#e44932FF",
    "#e449321A",
    "#e4493233",
    "#e449324D",
    "#e4493266",
    "#e4493280",
    "#e4493299",
    "#e44932B3",
    "#e44932CC",
    "#e44932E6",
  ],
  yellow: "#f8d58c",
  yellows: [
    "#f8d58c1A",
    "#f8d58c33",
    "#f8d58c4D",
    "#f8d58c66",
    "#f8d58c80",
    "#f8d58c99",
    "#f8d58cB3",
    "#f8d58cCC",
    "#f8d58cE6",
  ],
  light: "#f8f8f8",
  lights: [
    "#f8f8f8FF",
    "#f8f8f81A",
    "#f8f8f833",
    "#f8f8f84D",
    "#f8f8f866",
    "#f8f8f880",
    "#f8f8f899",
    "#f8f8f8B3",
    "#f8f8f8CC",
    "#f8f8f8E6",
  ],
  dark: "#272822",
  darks: [
    "#0f121bFF",
    "#0f121b1A",
    "#0f121b33",
    "#0f121b4D",
    "#0f121b66",
    "#0f121b80",
    "#0f121b99",
    "#0f121bB3",
    "#0f121bCC",
    "#0f121bE6",
  ],
};

const space: SuperGrid9kSpace = [0, 4, 8, 16, 32, 64];
space.common = `0.375em`;

const theme = {
  colors: themeColors,
  space,
  fonts: {
    body: "Merriweather, serif",
    heading: "Open Sans",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  sizes: {
    avatar: 48,
  },
  radii: {
    default: 4,
    circle: 99999,
  },
  shadows: {
    card: "0 0 4px rgba(0, 0, 0, .125)",
  },
  // rebass variants
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    display: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: [5, 6, 7],
    },
    caps: {
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
  },
  variants: {
    avatar: {
      width: "avatar",
      height: "avatar",
      borderRadius: "circle",
    },
    card: {
      p: 2,
      bg: "background",
      boxShadow: "card",
    },
    link: {
      color: "primary",
    },
    nav: {
      fontSize: 1,
      fontWeight: "bold",
      display: "inline-block",
      p: 2,
      color: "inherit",
      textDecoration: "none",
      ":hover,:focus,.active": {
        color: "primary",
      },
    },
  },
  buttons: {
    primary: {
      fontSize: 2,
      fontWeight: "bold",
      color: "background",
      bg: "primary",
      borderRadius: "default",
    },
    outline: {
      variant: "buttons.primary",
      color: "primary",
      bg: "transparent",
      boxShadow: "inset 0 0 2px",
    },
    secondary: {
      variant: "buttons.primary",
      color: "background",
      bg: "secondary",
    },
    close: {
      variant: "buttons.primary",
      color: "red",
      bg: "background",
      padding: 1,
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
  },
};

export type SuperGrid9kTheme = typeof theme;
interface SuperGrid9kSpace<T = number> extends Array<T> {
  common?: string;
}

export const createGlobalCss = createGlobalStyle<SuperGrid9kTheme>``;
export default theme;
