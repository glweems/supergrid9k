import Typography, { TypographyOptions } from 'typography';
import CodePlugin from 'typography-plugin-code';
import syntaxTheme from './syntaxTheme';
import theme, { colors } from './theme';

const typographyTheme: TypographyOptions = {
  scaleRatio: 2,
  baseLineHeight: 1.78,
  headerFontFamily: ['Inter'],
  bodyFontFamily: ['Sora'],
  bodyColor: colors.text.white,
  headerWeight: 700,
  bodyWeight: 300,
  boldWeight: 700,
  includeNormalize: true,
  googleFonts: [
    { name: 'Inter', styles: ['400', '600', '700'] },
    { name: 'Sora', styles: ['400', '600', '700'] },
  ],
  overrideStyles: (_, __, styles) => ({
    body: { minHeight: '100vh' },
    '#__next': {
      minHeight: '100vh',
    },
    html: {
      ...styles.html,
      color: 'var(--color-text)',
      backgroundColor: theme.colors.baseGlare,
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
      padding: '0.75rem',
    },

    svg: {
      ...styles.svg,
      verticalAlign: 'middle',
    },
    ...scrollStyles,
  }),
  plugins: [new CodePlugin()],
};

const scrollStyles = {
  '::-webkit-scrollbar': {
    height: '7px',
    width: '7px',
  },
  '::-webkit-scrollbar-thumb': {
    background: '#1c202b',
    borderRadius: 'var(--space-2)',
  },

  '::-webkit-scrollbar-track': {
    background: syntaxTheme.plain.backgroundColor,
    borderRadius: 'var(--space-2)',
  },
};

const typography = new Typography(typographyTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
