import { IAnyObject } from '@interfaces/index';
import { isString, reduce, trim } from 'lodash';

export const to = <T, U = Error>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<[U, undefined] | [null, T]> => {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }
      return [err, undefined];
    });
};

export const trimObjectValues = (obj: IAnyObject) =>
  reduce(
    Object.keys(obj),
    (accumulator, key) => {
      const value = obj[key];
      return {
        ...accumulator,
        [key]: isString(value) ? trim(value) : value,
      };
    },
    {},
  );
