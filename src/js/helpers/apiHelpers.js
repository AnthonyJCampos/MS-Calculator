import { TIMEOUT_SEC } from '../configs/configsAPI.js';

/** ------------------------ FETCH SECTION ------------------------ */

export const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request too to long! timeout after ${seconds}`));
    }, seconds * 1000);
  });
}; // end timeout

export const getJSON = async function (url, options) {
  try {
    const response = await Promise.race([
      fetch(url, options),
      timeout(TIMEOUT_SEC),
    ]);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }
    return data;
  } catch (error) {
    throw error;
  } // end try catch
}; // end getJSON

export const convertTimestampToTime = function (timestamp) {
  const date = new Date(timestamp * 1000);
  let hours = date.getHours();
  const isDST =
    date.getTimezoneOffset() <
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0
    ).getTimezoneOffset();
  hours = isDST ? hours - 1 : hours; // adjust for DST
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;

  const formattedTime = hours + ':' + minutes + ' ' + ampm;
  return formattedTime;
}; // end convertTimestampToTime

export const formatDateString = function (dateStr) {
  const parsedData = dateStr.split('-');

  const formatedDate = `${parsedData.at(1)}/${parsedData.at(2)}/${parsedData.at(
    0
  )}`;
  return formatedDate;
};
