export interface Theme {
  /**
   * 4rem
   */
  navbarHeight: string;
  /**
   * Default - 300
   */
  sidebarWidth: number;
  /**
   * @param toolbarHeight string - 3.5rem
   */
  toolbarHeight: string;
  borderWidths: BorderWidth[];
  breakpoints: string[];
  colors: ThemeColors;
  fonts: Fonts;
  fontSizes: string[];
  fontWeights: FontWeights;
  lineHeights: LineHeights;
  radii: string[];
  shadows: Shadows;
  sizes: ThemeSizes;
  space: string[];
  buttons: Buttons;
  pagination: Pagination;
  popovers: Popovers;
  flash: Flash;
  flashIcon: FlashIcon;
  stateLabels: StateLabels;
}

export type BorderWidth = number | string;

export interface Buttons {
  default: Default;
  primary: Default;
  danger: OutlineClass;
  outline: OutlineClass;
}

export interface OutlineClass {
  color: BorderClass;
  border: BorderClass;
  bg: BorderClass;
  shadow: BorderClass;
}

export interface BorderClass {
  default: string;
  hover?: string;
  active: string;
  disabled?: string;
  focus?: string;
}

export interface Default {
  color: Color;
  border: BorderClass;
  bg: BorderClass;
  shadow: BorderClass;
}

export interface Color {
  default: string;
  disabled: string;
}

export interface ThemeColors {
  bodytext: string;
  black: string;
  white: string;
  gray: string[];
  blue: string[];
  green: string[];
  orange: string[];
  purple: string[];
  red: string[];
  yellow: string[];
  pink: string[];
  blackfade15: string;
  blackfade20: string;
  blackfade30: string;
  blackfade35: string;
  blackfade50: string;
  whitefade15: string;
  whitefade50: string;
  whitefade70: string;
  state: State;
  border: Border;
  counter: Counter;
  filterList: FilterList;
  text: Text;
  bg: ColorsBg;
  accent: string;
  labels: Labels;
}

export interface ColorsBg {
  gray: string;
  grayLight: string;
  grayDark: string;
  disabled: string;
}

export interface Border {
  blackFade: string;
  blue: string;
  blueLight: string;
  grayLight: string;
  gray: string;
  grayDark: string;
  grayDarker: string;
  green: string;
  greenLight: string;
  purple: string;
  red: string;
  redLight: string;
  white: string;
  whiteFade: string;
  yellow: string;
}

export interface Counter {
  bg: string;
}

export interface FilterList {
  hoverBg: string;
}

export interface Labels {
  gray: string;
  grayText: string;
  grayDark: string;
  grayDarkText: string;
  blue: string;
  blueText: string;
  orange: string;
  orangeText: string;
  green: string;
  greenText: string;
  red: string;
  redText: string;
  yellow: string;
  yellowText: string;
  pink: string;
  pinkText: string;
  purple: string;
  purpleText: number[];
}

export interface State {
  error: string;
  failure: string;
  pending: string;
  queued: string;
  success: string;
  unknown: string;
}

export interface Text {
  white: string;
  gray: string;
  grayLight: string;
  grayDark: string;
  red: string;
}

export interface Flash {
  default: DefaultClass;
  success: DefaultClass;
  danger: DefaultClass;
  warning: DefaultClass;
}

export interface DefaultClass {
  backgroundColor: string;
  borderColor: string;
}

export interface FlashIcon {
  default: string;
  success: string;
  danger: string;
  warning: string;
}

export interface FontWeights {
  light: number;
  normal: number;
  semibold: number;
  bold: number;
}

export interface Fonts {
  normal: string;
  mono: string;
}

export interface LineHeights {
  condensedUltra: number;
  condensed: number;
  default: number;
}

export interface Pagination {
  borderRadius: string;
  spaceBetween: string;
  colors: PaginationColors;
}

export interface PaginationColors {
  normal: NextPrevious;
  disabled: Disabled;
  hover: Active;
  selected: Selected;
  active: Active;
  nextPrevious: NextPrevious;
}

export interface Active {
  border: string;
}

export interface Disabled {
  fg: string;
  border: string;
}

export interface NextPrevious {
  fg: string;
}

export interface Selected {
  fg: string;
  bg: string;
  border: string;
}

export interface Popovers {
  colors: PopoversColors;
}

export interface PopoversColors {
  caret: string;
}

export interface Shadows {
  small: string;
  medium: string;
  large: string;
  'extra-large': string;
  formControl: string;
  formControlDisabled: string;
  formControlFocus: string;
  primaryShadow: string;
  primaryActiveShadow: string;
}

export interface ThemeSizes {
  small: string;
  medium: string;
  large: string;
  xlarge: string;
}

export interface StateLabels {
  sizes: StateLabelsSizes;
  status: Status;
}

export interface StateLabelsSizes {
  small: Normal;
  normal: Normal;
}

export interface Normal {
  padding: string;
  fontSize: string;
}

export interface Status {
  issueClosed: Draft;
  pullClosed: Draft;
  pullMerged: Draft;
  issueOpened: Draft;
  pullOpened: Draft;
  draft: Draft;
}

export interface Draft {
  backgroundColor: string;
}
