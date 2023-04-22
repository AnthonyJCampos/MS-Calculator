import { DISPLAY_LIMIT } from '../configs/config.js';

/** ------------------------ VIEW HELPERS SECTION ------------------------ */

export const removeAllClassesExcept = function (exception) {
  const toolMainContainer = document.querySelector(`.${exception}`);
  const allClasses = toolMainContainer.classList;
  for (let i = allClasses.length - 1; i >= 0; i--) {
    const currentClass = allClasses[i];
    if (currentClass !== exception) {
      toolMainContainer.classList.remove(currentClass);
    }
  }
};

/** ------------------------ OUTPUT SECTION ------------------------ */

export const removeTrailingZeros = function (str) {
  return str.replace(/(?:\.0+|(\.\d+?)0+)$/, '$1');
};

export const convertToExponential = function (string) {
  if (isFinite(string) && string.toString().length >= DISPLAY_LIMIT) {
    return Number.parseFloat(string).toExponential();
  }

  return string;
};

export const hasMoreThanTwoDecimalPlaces = function (number) {
  return (number * 100) % 1 !== 0;
};
