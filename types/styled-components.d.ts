import { theme } from '@primer/components';
type Theme = typeof theme;
declare module 'styled-components/macro' {
  export type DefaultTheme = Theme;

  export function createGlobalStyle<P extends Record<string, any>>(
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<ThemedStyledProps<P, DefaultTheme>>,
    ...interpolations: Array<Interpolation<ThemedStyledProps<P, DefaultTheme>>>
  ): GlobalStyleComponent<P, DefaultTheme>;
}
