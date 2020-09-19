import Typography, { TypographyOptions } from 'typography';
import CodePlugin from 'typography-plugin-code';
import theme, { colors, defaultFont } from './theme';

const typographyTheme: TypographyOptions = {
  baseFontSize: '16px',
  scaleRatio: 2,
  baseLineHeight: 1.78,
  headerFontFamily: defaultFont.split(','),
  bodyFontFamily: defaultFont.split(','),
  bodyColor: colors.text,
  headerWeight: 700,
  bodyWeight: 300,
  boldWeight: 700,
  includeNormalize: true,
  overrideStyles: (_, __, styles) => ({
    html: {
      ...styles.html,
      color: 'var(--color-text)',
      backgroundColor: theme.colors.bg,
      overflow: 'auto',
      overflowX: 'hidden',
    },
    ul: {
      ...styles.ul,
      marginLeft: 'unset',
      listStylePosition: 'unset',
    },
    li: {
      ...styles.li,
      listStyleType: 'none',
    },
    a: {
      ...styles.a,
      color: 'var(--color-primary)',
      textDecoration: 'none',
    },
    'a:hover': {
      textDecoration: 'underline',
    },
    fieldset: {
      padding: `var(--space-2)`,
      border: 'unset',
      display: 'contents',
    },

    legend: {
      ...styles.h3,
    },

    button: {
      ...styles.button,
      cursor: 'pointer',
      ...theme.buttons.default,
    },

    select: {
      ...styles.select,
      cursor: 'pointer',
    },

    input: {
      ...styles.input,
      cursor: 'text',
      textIndent: '5px',
    },
    pre: {
      overflowX: 'auto',
      textOverflow: 'scroll',
    },
    '::-webkit-scrollbar': {
      height: '7px',
      width: '7px',
    },
    svg: {
      ...styles.svg,
      verticalAlign: 'middle',
    },

    '::-webkit-scrollbar-thumb': {
      background: 'var(--color-secondary)',
      borderRadius: 'var(--space-2)',
    },

    '::-webkit-scrollbar-track': {
      background: 'var(--color-background)',
      borderRadius: 'var(--space-2)',
    },
  }),
  plugins: [new CodePlugin()],
};

const typography = new Typography(typographyTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
