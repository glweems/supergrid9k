import { Entry } from 'css-grid-template-parser';
import { InputHTMLAttributes } from 'react';
import { GridControlUnit } from './utils';

export function getInputProps(
  unit: GridControlUnit
): [
  InputHTMLAttributes<HTMLInputElement>['value'],
  InputHTMLAttributes<HTMLInputElement>
] {
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
  entry: Entry
): Entry {
  switch (value) {
    case 'fr': {
      return {
        ...entry,
        amount: 1,
        [name]: value,
      };
    }
    case '%':
      return {
        ...entry,
        amount: 10,
        [name]: value,
      };
    case 'px':
      return {
        ...entry,
        amount: 100,
        [name]: value,
      };
    case 'vw':
      return {
        ...entry,
        amount: 10,
        [name]: value,
      };
    case 'vh':
      return {
        ...entry,
        amount: 10,
        [name]: value,
      };
    case 'em':
      return {
        ...entry,
        amount: 5,
        [name]: value,
      };
    case 'rem':
      return {
        ...entry,
        amount: 5,
        [name]: value,
      };
    case 'auto':
      return {
        ...entry,
        amount: '' as any,
        [name]: value,
      };

    default:
      return {
        ...entry,
        [name]: value,
      };
  }
}
