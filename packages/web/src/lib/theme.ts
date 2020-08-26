export const colors = {
  primary: "#3578e5",
  secondary: "#3e456d",
  background: "#18191a",
  code: "#292c3d",
  text: "#fff",
  muted: "#f6f6f9",
  grey: "#dddddf",
  highlight: "hsla(205, 100%, 40%, 0.125)",
  green: "#4caf50",
  purple: "#d0c1fa",
  red: "#e44932",
  yellow: "#f8d58c",
  light: "#f8f8f8",
  dark: "#272822",
};

export const space = [0, 4, 8, 16, 32, 64];

export const defaultFont =
  'system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';

const theme = {
  colors: { ...colors, control: colors.code, bg: colors.background },
  space,
  fonts: {
    body: defaultFont,
    heading: defaultFont,
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
    default: {
      padding: "4px 16px",
      paddingTop: "none",
      paddingBottom: "none",
      borderWidth: 1.5,
      bg: "transparent",
      borderColor: "transparent",
    },
    primary: {
      variant: "buttons.default",
      fontSize: 2,
      fontWeight: "bold",
      color: "background",
      bg: "primary",
      borderRadius: "default",
    },
    outline: {
      variant: "buttons.default",
      color: "text",
      bg: "transparent",
      borderStyle: "solid",

      borderColor: "currentColor",

      ":hover": {
        bg: "currentColor",
        opacity: 0.75,
      },
    },
    secondary: {
      variant: "buttons.default",
      color: "background",
      bg: "secondary",
    },
    close: {
      variant: "buttons.default",
      color: "red",
      bg: "background",
      padding: 1,
    },
    reset: {
      variant: "buttons.default",
      bg: "red",
      color: "text",
      fontWeight: "bolder",
      borderLeft: 0,
    },
  },
  forms: {
    input: {
      color: "text",
      borderWidth: 2,
      boxShadow: "none",
      borderColor: "secondary",
      bg: "background",
    },
    select: {
      color: "text",
      borderStyle: "solid",
      borderWidth: 2,
      boxShadow: "none",
      borderColor: "secondary",
      bg: "background",
      borderRadius: 9999,
    },
    textarea: {},
    label: {},
    radio: {},
    checkbox: { color: "red", bg: "red" },
  },
  styles: {
    root: {
      fontFamily: defaultFont,
      fontWeight: defaultFont,
      lineHeight: defaultFont,
    },
  },
};

export type SuperGrid9kTheme = { colors: typeof theme.colors };

export default theme;
