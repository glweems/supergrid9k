import { CSSProp } from "styled-components/macro";
import { SuperGrid9kTheme } from "../lib/theme";

declare module "react" {
  interface Attributes {
    css?: CSSProp<SuperGrid9kTheme>;
  }
}
