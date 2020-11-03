import { useContext } from 'react';
import { DefaultTheme, ThemeContext } from 'styled-components';
import { Theme } from '../types/theme';

type ColorProps = '';
type ColorArrayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
// type GrayColor = `gray.${ColorArrayIndex}`
export type ArrayColorProps = {
  [K in keyof typeof arrayColors]: `${K}.${ColorArrayIndex}`
}
const arrayColors = {
  gray: [
    '#fafbfc',
    '#f6f8fa',
    '#e1e4e8',
    '#d1d5da',
    '#959da5',
    '#6a737d',
    '#586069',
    '#444d56',
    '#2f363d',
    '#24292e',
  ],
  blue: [
    '#f1f8ff',
    '#dbedff',
    '#c8e1ff',
    '#79b8ff',
    '#2188ff',
    '#0366d6',
    '#005cc5',
    '#044289',
    '#032f62',
    '#05264c',
  ],
  green: [
    '#f0fff4',
    '#dcffe4',
    '#bef5cb',
    '#85e89d',
    '#34d058',
    '#28a745',
    '#22863a',
    '#176f2c',
    '#165c26',
    '#144620',
  ],
  orange: [
    '#fff8f2',
    '#ffebda',
    '#ffd1ac',
    '#ffab70',
    '#fb8532',
    '#f66a0a',
    '#e36209',
    '#d15704',
    '#c24e00',
    '#a04100',
  ],
  purple: [
    '#f5f0ff',
    '#e6dcfd',
    '#d1bcf9',
    '#b392f0',
    '#8a63d2',
    '#6f42c1',
    '#5a32a3',
    '#4c2889',
    '#3a1d6e',
    '#29134e',
  ],
  red: [
    '#ffeef0',
    '#ffdce0',
    '#fdaeb7',
    '#f97583',
    '#ea4a5a',
    '#d73a49',
    '#cb2431',
    '#b31d28',
    '#9e1c23',
    '#86181d',
  ],
  yellow: [
    '#fffdef',
    '#fffbdd',
    '#fff5b1',
    '#ffea7f',
    '#ffdf5d',
    '#ffd33d',
    '#f9c513',
    '#dbab09',
    '#b08800',
    '#735c0f',
  ],
  pink: [
    '#ffeef8',
    '#fedbf0',
    '#f9b3dd',
    '#f692ce',
    '#ec6cb9',
    '#ea4aaa',
    '#d03592',
    '#b93a86',
    '#99306f',
    '#6d224f',
  ],
};



export const colors = {
  ...arrayColors,
  bodytext: '#24292e',
  black: '#1b1f23',
  white: '#fff',
  blackfade15: 'rgba(27, 31, 35, 0.15)',
  blackfade20: 'rgba(27, 31, 35, 0.20)',
  blackfade30: 'rgba(27,31,35,0.3)',
  blackfade35: 'rgba(27, 31, 35, 0.35)',
  blackfade50: 'rgba(27, 31, 35, 0.5)',
  whitefade15: 'rgba(255, 255, 255, 0.15)',
  whitefade50: 'rgba(255, 255, 255, 0.50)',
  whitefade70: 'rgba(255, 255, 255, 0.70)',
  state: {
    error: '#d73a49',
    failure: '#d73a49',
    pending: '#dbab09',
    queued: '#dbab09',
    success: '#28a745',
    unknown: '#959da5',
  },
  border: {
    blackFade: 'rgba(27,31,35,0.15)',
    blue: '#0366d6',
    blueLight: '#c8e1ff',
    grayLight: '#eaecef',
    gray: '#e1e4e8',
    grayDark: '#d1d5da',
    grayDarker: '#444d56',
    green: '#34d058',
    greenLight: '#a2cbac',
    purple: '#6f42c1',
    red: '#d73a49',
    redLight: '#cea0a5',
    white: '#fff',
    whiteFade: 'rgba(255,255,255,0.15)',
    yellow: '#d9d0a5',
  },
  counter: {
    bg: 'rgba(27, 31, 35, 0.08)',
  },
  filterList: {
    hoverBg: '#eaecef',
  },
  text: {
    white: '#fff',
    gray: '#586069',
    grayLight: '#6a737d',
    grayDark: '#24292e',
    red: '#cb2431',
  },
  bg: {
    gray: '#f6f8fa',
    grayLight: '#fafbfc',
    grayDark: '#24292e',
    disabled: '#F3F4F6',
  },
  accent: '#f66a0a',
  labels: {
    gray: '#e1e4e8',
    grayText: '#24292e',
    grayDark: '#6a737d',
    grayDarkText: '#24292e',
    blue: '#0366d6',
    blueText: '#0366d6',
    orange: '#f66a0a',
    orangeText: '#e36209',
    green: '#28a745',
    greenText: '#22863a',
    red: '#cb2431',
    redText: '#cb2431',
    yellow: '#f9c513',
    yellowText: '#735c0f',
    pink: '#ec6cb9',
    pinkText: '#d03592',
    purple: '#8a63d2',
    purpleText: [5],
  },
  /*  primary: '#3578e5',
  secondary: '#242526',
  background: '#18191a',
  bg: '#18191a',
  code: '#292c3d',
  text: '#fff',
  muted: '#f6f6f9',
  grey: '#dddddf',
  highlight: 'hsla(205, 100%, 40%, 0.125)',
  green: '#4caf50',
  purple: '#d0c1fa',
  red: '#e44932',
  yellow: '#f8d58c',
  light: '#f8f8f8',
  dark: '#272822', */
};

export const space= [
    '0',
    '4px',
    '8px',
    '16px',
    '24px',
    '32px',
    '40px',
    '48px',
    '64px',
    '80px',
    '96px',
    '112px',
    '128px',
  ]

export const defaultFont =
  'system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';

const theme: DefaultTheme & Theme = {
  navbarHeight: '4rem',
  sidebarWidth: 300,
  toolbarHeight: '3.5rem',
  borderWidths: [0, '1px'],
  breakpoints: ['544px', '768px', '1012px', '1280px'],
  colors,
  fonts: {
    normal:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    mono:
      'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  fontSizes: ['12px', '14px', '16px', '20px', '24px', '32px', '40px', '48px'],
  fontWeights: {
    light: 300,
    normal: 400,
    semibold: 500,
    bold: 600,
  },
  lineHeights: {
    condensedUltra: 1,
    condensed: 1.25,
    default: 1.5,
  },
  radii: ['0', '3px', '6px', '100px'],
  shadows: {
    small: '0 1px 0 rgba(149, 157, 165, 0.1)',
    medium: '0 3px 6px rgba(149, 157, 165, 0.15)',
    large: '0 8px 24px rgba(149, 157, 165, 0.2)',
    'extra-large': '0 12px 48px rgba(149, 157, 165, 0.3)',
    formControl: 'inset 0px 2px 0px rgba(225, 228, 232, 0.2)',
    formControlDisabled: 'inset 0px 2px 0px rgba(220, 227, 237, 0.3)',
    formControlFocus: 'rgba(3, 102, 214, 0.3) 0px 0px 0px 0.2em',
    primaryShadow:
      '0px 1px 0px rgba(20, 70, 32, 0.1), inset 0px 2px 0px rgba(255, 255, 255, 0.03)',
    primaryActiveShadow: 'inset 0px 1px 0px rgba(20, 70, 32, 0.2)',
  },
  sizes: {
    small: '544px',
    medium: '768px',
    large: '1012px',
    xlarge: '1280px',
  },
  space,
  buttons: {
    default: {
      color: {
        default: '#24292e',
        disabled: '#959da5',
      },
      border: {
        default: 'rgba(27, 31, 35, 0.12)',
        active: '#d1d5da',
        disabled: '#eaecef',
      },
      bg: {
        default: '#fafbfc',
        hover: '#F3F4F6',
        active: '#edeff2',
        disabled: '#fafbfc',
      },
      shadow: {
        default:
          '0px 1px 0px rgba(27, 31, 35, 0.04), inset 0px 2px 0px rgba(255, 255, 255, 0.25)',
        hover:
          '0px 1px 0px rgba(209, 213, 218, 0.2), inset 0px 2px 0px rgba(255, 255, 255, 0.1)',
        active: 'inset 0px 2px 0px rgba(149, 157, 165, 0.1)',
        focus: '0 0 0 3px rgba(3, 102, 214, 0.3)',
      },
    },
    primary: {
      color: {
        default: '#fff',
        disabled: 'rgba(255, 255, 255, 0.50)',
      },
      border: {
        default: '#22863a',
        hover: 'rgba(27, 31, 35, 0.15)',
        active: 'rgba(27, 31, 35, 0.15)',
        disabled: 'rgba(34, 134, 58, 0.1)',
      },
      bg: {
        default: '#2EA44F',
        focus: '#2C974B',
        hover: '#2C974B',
        active: '#128031',
        disabled: '#94D3A2',
      },
      shadow: {
        default:
          ' 0px 1px 0px rgba(20, 70, 32, 0.1), inset 0px 2px 0px rgba(255, 255, 255, 0.03)',
        active:
          '0px 1px 0px rgba(27, 31, 35, 0.1), inset 0px 2px 0px rgba(255, 255, 255, 0.03)',
        hover:
          '0px 1px 0px rgba(27, 31, 35, 0.1), inset 0px 2px 0px rgba(255, 255, 255, 0.03)',
        focus: '0 0 0 3px #94D3A2',
      },
    },
    danger: {
      color: {
        default: '#cb2431',
        hover: '#fff',
        active: '#fff',
        disabled: 'rgba(203,36,49, .5)',
      },
      border: {
        default: '#e1e4e8',
        hover: 'rgba(27, 31, 35, 0.15)',
        active: 'rgba(27, 31, 35, 0.15)',
      },
      bg: {
        default: '#fafbfc',
        hover: '#cb2431',
        active: '#be222e',
        disabled: '#F3F4F6',
      },
      shadow: {
        default:
          '0px 1px 0px rgba(149, 157, 165, 0.1), inset 0px 2px 0px rgba(255, 255, 255, 0.25)',
        active:
          '0px 1px 0px rgba(27, 31, 35, 0.1), inset 0px 2px 0px rgba(255, 255, 255, 0.03)',
        hover:
          '0px 1px 0px rgba(27, 31, 35, 0.1), inset 0px 2px 0px rgba(255, 255, 255, 0.03)',
        focus: '0 0 0 3px rgba(203, 36, 49, 0.4)',
      },
    },
    outline: {
      color: {
        default: '#0366d6',
        hover: '#fff',
        active: '#fff',
        disabled: '#959da5',
      },
      border: {
        default: '#e1e4e8',
        hover: 'rgba(27, 31, 35, 0.15)',
        active: 'rgba(27, 31, 35, 0.15)',
      },
      bg: {
        default: '#fafbfc',
        hover: '#0366d6',
        active: '#035fc7',
        disabled: '#F3F4F6',
      },
      shadow: {
        default:
          '0px 1px 0px rgba(149, 157, 165, 0.1), inset 0px 2px 0px rgba(255, 255, 255, 0.25)',
        active:
          '0px 1px 0px rgba(27, 31, 35, 0.1), inset 0px 2px 0px rgba(255, 255, 255, 0.03)',
        hover:
          '0px 1px 0px rgba(27, 31, 35, 0.1), inset 0px 2px 0px rgba(255, 255, 255, 0.03)',
        focus: '0 0 0 3px rgba(3, 102, 214, 0.3)',
      },
    },
  },
  pagination: {
    borderRadius: '6px',
    spaceBetween: '4px',
    colors: {
      normal: {
        fg: '#24292e',
      },
      disabled: {
        fg: '#d1d5da',
        border: 'transparent',
      },
      hover: {
        border: '#eaecef',
      },
      selected: {
        fg: '#fff',
        bg: '#0366d6',
        border: 'transparent',
      },
      active: {
        border: '#eaecef',
      },
      nextPrevious: {
        fg: '#0366d6',
      },
    },
  },
  popovers: {
    colors: {
      caret: 'rgba(27, 31, 35, 0.15)',
    },
  },
  flash: {
    default: {
      backgroundColor: '#dbedff',
      borderColor: 'rgba(4, 66, 137, 0.2)',
    },
    success: {
      backgroundColor: '#dcffe4',
      borderColor: 'rgba(23, 111, 44, 0.2)',
    },
    danger: {
      backgroundColor: '#FFE3E6',
      borderColor: 'rgba(158, 28, 35, 0.2)',
    },
    warning: {
      backgroundColor: '#fffbdd',
      borderColor: 'rgba(176, 136, 0, 0.2)',
    },
  },
  flashIcon: {
    default: 'rgba(4, 66, 137, 0.6)',
    success: 'rgba(23, 111, 44, 0.8)',
    danger: 'rgba(158, 28, 35, 0.6)',
    warning: '#b08800',
  },
  stateLabels: {
    sizes: {
      small: {
        padding: '4px 8px',
        fontSize: '12px',
      },
      normal: {
        padding: '8px 12px',
        fontSize: '14px',
      },
    },
    status: {
      issueClosed: {
        backgroundColor: '#d73a49',
      },
      pullClosed: {
        backgroundColor: '#d73a49',
      },
      pullMerged: {
        backgroundColor: '#6f42c1',
      },
      issueOpened: {
        backgroundColor: '#159739',
      },
      pullOpened: {
        backgroundColor: '#159739',
      },
      draft: {
        backgroundColor: '#6a737d',
      },
    },
  },
};
type ElementType<T = Colors> = T extends ReadonlyArray<infer U>
  ? ElementType<keyof U[keyof T]>
  : T;
type Color = ElementType<Colors>;
type Colors = typeof colors;
type FromSomeIndex<K extends string> = { [key in K]: keyof Colors[] };
export type MyTheme = typeof theme & Record<string, any>;

export function useTheme() {
  const context = useContext(ThemeContext);

  return context;
}

export default theme;
