import { DISPLAY_LIMIT, TIMEOUT_SEC } from './config.js';

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

/** ------------------------ FETCH SECTION ------------------------ */

export const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request too to long! timeout after ${seconds}`));
    }, seconds * 1000);
  });
}; // end timeout

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }
    return data;
  } catch (error) {
    throw error;
  } // end try catch
}; // end getJSON
