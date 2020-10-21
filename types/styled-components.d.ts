import { Theme } from './theme';
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}

  export function useTheme(): DefaultTheme;

  export function createGlobalStyle<P extends Record<string, any>>(
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<ThemedStyledProps<P, DefaultTheme>>,
    ...interpolations: Array<Interpolation<ThemedStyledProps<P, DefaultTheme>>>
  ): GlobalStyleComponent<P, DefaultTheme>;
}
