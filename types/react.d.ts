import { CSSProp } from 'styled-components/macro';
import { MyTheme } from '../lib/theme';

declare module 'react' {
  interface Attributes {
    css?: CSSProp<MyTheme>;
  }
}
