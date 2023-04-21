import converterCurrencyLayout from '../layouts/converterCurrencyLayout.js';
import {
  CURRENCY_BASE,
  CURRENCY_URL,
  CURRENCY_API_KEY,
  CURRENCY_SYMBOLS_MAP_BY_CODE,
  CURRENCY_SYMBOLS_MAP_BY_NAME,
} from '../configs/configsAPI.js';
import {
  getJSON,
  convertTimestampToTime,
  formatDateString,
} from '../helpers/apiHelpers.js';

/** ------------------------ CURRENCY CONFIG SECTION ------------------------ */

/** ------------------------ RENDERPACKAGE SECTION ------------------------ */
export const renderPackage = {
  layout: converterCurrencyLayout,
  options: [],
  date: '',
  timestamp: '',
};

/** ------------------------ CONVERTER FORMULAS SECTION ------------------------ */

const convertCurrency = function (expression) {};

/** ------------------------ CONVERSATION MAP SECTION ------------------------ */

// key is active unit, value is none active unit
export const conversationMap = new Map([]);

/** ------------------------ INIT SECTION ------------------------ */

// This function takes an object as input and returns a new Map object.
const ratesToMap = function (obj) {
  // Initialize a new Map object.
  const map = new Map();

  // Get the rates object from the input object.
  const rates = obj.rates;

  // Loop through each key in the rates object.
  for (const key in rates) {
    // For each key, set the key/value pair in the map.
    map.set(key, rates[key]);
  }

  // Return the completed map.
  return map;
}; // end ratesToMap

const initOptions = function (map) {
  map.forEach((_, key) => {
    const option = CURRENCY_SYMBOLS_MAP_BY_CODE.get(key);

    if (!option) {
      return;
    }
    renderPackage.options.push(option);
  });
};

const _getInitialExchangeRates = async function () {
  console.log(CURRENCY_API_KEY);
  const myHeaders = new Headers();
  myHeaders.append('apikey', CURRENCY_API_KEY);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  const data = await getJSON(CURRENCY_URL, requestOptions);

  renderPackage.date = formatDateString(data.date);
  renderPackage.timestamp = convertTimestampToTime(data.timestamp);

  const initialRateMap = ratesToMap(data);
  initOptions(initialRateMap);

  console.log('++++++++ RATE MAP +++++++');
  console.log(initialRateMap);

  console.log('++++++++ RENDER PACKAGE +++++++');
  console.log(renderPackage);

  // return initialRateMap;
};

// _getInitialExchangeRates();
