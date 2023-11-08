import { isEmpty, noop, toString } from "lodash";

export const isServer = () => typeof window === "undefined";

export const to = (promise, errorExt = {}) => {
  return promise
    .then((data) => [null, data])
    .catch((err) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
};

export const $ = !isServer() ? document.querySelector.bind(document) : noop;

export const $$ = !isServer() ? document.querySelectorAll.bind(document) : noop;

// export const trimObjectValues = (obj) =>
//   reduce(
//     Object.keys(obj),
//     (accumulator, key) => {
//       const value = obj[key];

//       return {
//         ...accumulator,
//         [key]: isString(value) ? trim(value) : value,
//       };
//     },
//     {}
//   );

export const formatNumber = (val) => toString(val).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const getAllowValue = ({ value, allow }) => {
  const regex = new RegExp(allow, "g");
  const match = toString(value).match(regex);
  const allowValue = !isEmpty(match) ? match?.join("") : "";

  return value ? allowValue : "";
};

export const isProduction = () => process.env.NODE_ENV === "production";
