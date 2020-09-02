import { templateGenerator } from './utils';
import { GridProps } from 'styled-system';

export type TemplateStringObject<T = Record<string, unknown>> = GridProps &
  T & {
    className?: string;
  };

export const cssTemplateString = templateGenerator`.${'className'} {
  display: grid;
  grid-template-rows: ${'gridTemplateRows'};
  grid-template-columns: ${'gridTemplateColumns'};
  grid-gap: ${'gridGap'};
}`;

export const htmlTemplateString = templateGenerator`<div class="${'className'}">
${'gridItems'}</div>`;

export const styledComponentsTemplateString = templateGenerator`const ${'className'} = styled.div\`\n   display: grid;
    grid-template-rows: ${'gridTemplateRows'};
    grid-template-columns: ${'gridTemplateColumns'};
    grid-gap: ${'gridGap'};\n\`;`;

export const styleObjTemplateString = templateGenerator`const ${'className'} = {
  display: grid;
  gridTemplateRows: "${'gridTemplateRows'}",
  gridTemplateColumns: "${'gridTemplateColumns'}",
  gridGap: "${'gridGap'}"
}
`;

export const styleObjHTMLTemplateString = templateGenerator`<div style={${'className'}}></div>`;
