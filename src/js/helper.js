import { DISPLAY_LIMIT } from './config.js';

export const removeTrailingZeros = function (str) {
  return str.replace(/(?:\.0+|(\.\d+?)0+)$/, '$1');
};

export const convertToExponential = function (string) {
  if (isFinite(string) && string.toString().length >= DISPLAY_LIMIT) {
    return Number.parseFloat(string).toExponential();
  }

  return string;
};
