import { InputProps } from '@rebass/forms/styled-components';
import { GridTemplateEntry } from '../store/grid';
import {
  defaultInputProps,
  defaultSelectProps,
  GridControlUnit,
} from './utils';

export function getInputProps(
  unit: GridControlUnit
): [InputProps['value'], InputProps] {
  switch (unit) {
    case 'fr':
      return [
        1,
        {
          type: 'number',
          min: 0,
          max: 100,
          step: 0.25,
          autoComplete: 'off',
          disabled: false,
        },
      ];
    case '%':
      return [
        10,
        {
          type: 'number',
          min: 0,
          max: 100,
          step: 5,
          autoComplete: 'off',
          disabled: false,
        },
      ];
    case 'auto':
      return [
        '',
        {
          type: 'number',
          min: 0,
          step: 100,
          autoComplete: 'off',
          disabled: true,
        },
      ];

    case 'em':
      return [
        5,
        {
          type: 'number',
          min: 0,
          max: 100,
          step: 1,
          autoComplete: 'off',
          disabled: false,
        },
      ];
    case 'rem':
      return [
        5,
        {
          type: 'number',
          min: 0,
          max: 100,
          step: 1,
          autoComplete: 'off',
          disabled: false,
        },
      ];
    case 'px':
      return [
        100,
        {
          type: 'number',
          min: 0,
          step: 100,
          autoComplete: 'off',
          disabled: false,
        },
      ];
    case 'vh':
      return [
        5,
        {
          type: 'number',
          min: 0,
          max: 100,
          step: 5,
          autoComplete: 'off',
          disabled: false,
        },
      ];
    case 'vw':
      return [
        5,
        {
          type: 'number',
          min: 0,
          max: 100,
          step: 5,
          autoComplete: 'off',
          disabled: false,
        },
      ];
    default:
      break;
  }
}

export default function getAllowedEntry(
  name: string,
  value: string,
  entry: GridTemplateEntry
): GridTemplateEntry {
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
