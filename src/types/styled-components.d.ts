import { SuperGrid9kTheme } from "../lib/theme";

declare module "styled-components" {
  export interface DefaultTheme extends SuperGrid9kTheme {}
}
