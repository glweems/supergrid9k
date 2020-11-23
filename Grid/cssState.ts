import { dataToCss, repeatStr, templateGenerator } from '@lib/utils';
import { Entry, GridState, template } from 'css-grid-template-parser';
import { selector } from 'recoil';
import { optionsState } from './GridActions';
import { gridState } from './gridState';
import prettier from 'prettier/standalone';
import html from 'prettier/parser-html';
import css from 'prettier/parser-postcss';
const cssState = selector({
  key: 'css',
  get: ({ get }) => {
    const grid = get(gridState);
    if (!grid) return;
    const { useCssRepeatFn, className } = get(optionsState);
    const gridTemplateAreas = createAreasString(grid);
    const gridTemplateRows = createCssString(grid.rows, useCssRepeatFn);
    const gridTemplateColumns = createCssString(grid.columns, useCssRepeatFn);
    const gridGap = gridGapString(grid.gap);
    const selectors = createSelectorsString(grid.areas);
    return {
      css: prettier.format(
        cssTemplateString({
          gridTemplateAreas,
          className,
          gridTemplateRows,
          gridTemplateColumns,
          gridGap,
          selectors,
        }),
        {
          parser: 'css',
          plugins: [css],
        }
      ),
      html: prettier.format(createHtmlString(grid, className), {
        parser: 'html',
        plugins: [html],
      }),
    };
  },
});
function createSelectorsString(areas: GridState['areas']) {
  let selectors = '';
  Object.keys(areas).forEach(
    (key) => (selectors += `.${key} {grid-area: ${key};}`.trim())
  );
  return selectors.trim();
}
function createHtmlString(grid: GridState, className: string) {
  let gridItems = ``;
  Object.keys(grid.areas).forEach(
    (key) => (gridItems += ` <div class="${key}">${key}</div>`)
  );
  return htmlTemplateString({ gridItems, className });
}
const htmlTemplateString = templateGenerator`<div class="${'className'}">
${'gridItems'}</div>`;
function createAreasString(grid: GridState) {
  return template({
    width: grid.columns.length,
    height: grid.rows.length,
    areas: grid.areas,
  });
}

function gridGapString({ rowGap, columnGap }: GridState['gap']) {
  if (rowGap.amount === columnGap.amount && rowGap.unit === columnGap.unit)
    return `${rowGap.amount}${rowGap.unit}`;
  return `${rowGap.amount}${rowGap.unit} ${columnGap.amount}${columnGap.unit}`;
}

function createCssString(
  entries: Pick<Entry, 'amount' | 'unit'>[],
  repeat = false
): string {
  if (repeat) return repeatStr(entries);
  return dataToCss(entries);
}
const cssTemplateString = templateGenerator<{
  className: string;
  gridTemplateColumns: string;
  gridTemplateRows: string;
  gridTemplateAreas: string;
  gridGap: string;
  selectors: string;
}>`.${'className'} {
  display: grid;
  grid-template-rows: ${'gridTemplateRows'};
  grid-template-columns: ${'gridTemplateColumns'};
  grid-template-areas: ${'gridTemplateAreas'};
  grid-gap: ${'gridGap'};
}
${'selectors'}
`;

export default cssState;
