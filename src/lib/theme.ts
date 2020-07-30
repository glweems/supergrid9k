export const themeColors = {
  blue: "#1769ff",
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

export interface SuperGrid9kTheme {
  colors: {
    blue: string;
    blues: string[];
    green: string;
    greens: string[];
    mint: string;
    mints: string[];
    purple: string;
    purples: string[];
    red: string;
    reds: string[];
    yellow: string;
    yellows: string[];
    light: string;
    lights: string[];
    dark: string;
    darks: string[];
  };
  space: SuperGrid9kSpace;
  navbarHeight: string;
}

interface SuperGrid9kSpace<T = number | string> extends Array<T> {
  common?: T;
}

const space: SuperGrid9kSpace = [0, 4, 8, 16, 32, 64];
space.common = `${space[2]}px`;

const theme: SuperGrid9kTheme = {
  colors: themeColors,
  space,
  navbarHeight: `${space[4]}px`,
};

export default theme;
