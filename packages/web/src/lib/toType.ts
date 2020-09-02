export type TypeValue =
  | 'array'
  | 'object'
  | 'function'
  | 'string'
  | 'number'
  | 'asyncfunction'
  | 'promise'
  | 'undefined';

export const toType = (obj: unknown): TypeValue =>
  ({}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase());
