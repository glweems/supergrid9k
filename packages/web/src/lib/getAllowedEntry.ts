import { GridTemplateEntry } from '../state';
import { defaultSelectProps } from './utils';
const defaultInputProps = {
  name: 'amount',
  disabled: false,
  type: 'number',
  min: 0,
};

/**
 * Gets allowed entry
 * @param {
 *   name,
 *   value,
 *   entry,
 * }
 * @returns allowed entry
 */
export default function getAllowedEntry({
  name,
  value,
  entry,
}: {
  name: string;
  value: string;
  entry: GridTemplateEntry;
}): GridTemplateEntry {
  switch (value) {
    case 'fr': {
      return {
        ...entry,
        amount: 1,
        [name]: value,
        inputProps: { ...defaultInputProps, step: 0.25, max: 20 },
        selectProps: defaultSelectProps,
      };
    }
    case '%':
      return {
        ...entry,
        amount: 10,
        [name]: value,
        inputProps: defaultInputProps,
        selectProps: defaultSelectProps,
      };
    case 'px':
      return {
        ...entry,
        amount: 100,
        [name]: value,
        inputProps: { ...entry.inputProps, max: 1000, step: 10 },
        selectProps: defaultSelectProps,
      };
    case 'vw':
      return {
        ...entry,
        amount: 10,
        [name]: value,
        inputProps: { ...defaultInputProps, step: 5 },
        selectProps: defaultSelectProps,
      };
    case 'vh':
      return {
        ...entry,
        amount: 10,
        [name]: value,
        inputProps: defaultInputProps,
        selectProps: defaultSelectProps,
      };
    case 'em':
      return {
        ...entry,
        amount: 5,
        [name]: value,
        inputProps: defaultInputProps,
        selectProps: defaultSelectProps,
      };
    case 'rem':
      return {
        ...entry,
        amount: 5,
        [name]: value,
        inputProps: defaultInputProps,
        selectProps: defaultSelectProps,
      };
    case 'auto':
      return {
        ...entry,
        amount: '' as any,
        [name]: value,
        inputProps: {
          ...entry.inputProps,
          disabled: true,
          style: { display: 'none' },
        },
        selectProps: { ...entry.selectProps, style: { gridColumn: '1 / 3' } },
      };

    default:
      return {
        ...entry,
        [name]: value,
      };
  }
}
