import { SuperGrid9kTheme } from "../lib/theme";

declare module "styled-components" {
  export interface DefaultTheme extends SuperGrid9kTheme {}

  export function createGlobalStyle<P extends object = {}>(
    first:
      | TemplateStringsArray
      | CSSObject
      | InterpolationFunction<ThemedStyledProps<P, DefaultTheme>>,
    ...interpolations: Array<Interpolation<ThemedStyledProps<P, DefaultTheme>>>
  ): GlobalStyleComponent<P, DefaultTheme>;
}
