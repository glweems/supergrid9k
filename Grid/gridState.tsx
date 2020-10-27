import { atom, selectorFamily } from 'recoil';
import { GridState, Entry } from 'css-grid-template-parser';
import { removeItemAtIndex, replaceItemAtIndex } from '@lib/utils';
import { GridControlId } from './GridControlId';

export const gridState = atom<GridState | null>({
  key: 'gridState',
  default: null,
});
export const gridControlsState = selectorFamily<Entry[], GridControlId>({
  key: 'gridControls',
  get: (id) => ({ get }) => {
    return get(gridState)?.[id];
  },
  set: (id) => ({ set }, controls: Entry[]) => {
    return set(gridState, (prev) => ({
      ...prev,
      [id]: [...controls, controls[controls.length - 1]],
    }));
  },
});

export const selectedControlState = atom<string[]>({
  key: 'selectedControlState',
  default: [],
});

type GridControlState = Entry & { canDelete: boolean };

export const gridControlState = selectorFamily<GridControlState, string>({
  key: 'gridControlState',
  get: (id) => ({ get }) => {
    const [key, index] = id.split('.');
    const stack = get(gridState)[key];
    const control = stack[index];
    return { ...control, canDelete: stack.length <= 1 };
  },
  set: (id) => ({ set }, newValue) => {
    const [key, index] = id.split('.');
    if (newValue === null)
      return set(gridState, (prev) => ({
        ...prev,
        [key]: removeItemAtIndex(prev[key], Number(index)),
      }));
    return set(gridState, (prev) => ({
      ...prev,
      [key]: replaceItemAtIndex(prev[key], Number(index), newValue),
    }));
  },
});
