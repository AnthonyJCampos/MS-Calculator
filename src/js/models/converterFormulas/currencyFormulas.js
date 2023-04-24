import converterCurrencyLayout from '../../layouts/converterLayouts/converterCurrencyLayout.js';
import {
  CURRENCY_URL,
  CURRENCY_API_KEY,
  CURRENCY_SYMBOLS_MAP_BY_CODE,
  CURRENCY_SYMBOLS_MAP_BY_NAME,
  CURRENCY_OFFLINE_RATES,
} from '../../configs/configsAPI.js';
import {
  getJSON,
  convertTimestampToTime,
  formatDateString,
} from '../../helpers/apiHelpers.js';
import { hasMoreThanTwoDecimalPlaces } from '../../helpers/helper.js';

/** ------------------------ CURRENCY CONFIG SECTION ------------------------ */

/** ------------------------ RENDERPACKAGE SECTION ------------------------ */
export const renderPackage = {
  layout: converterCurrencyLayout,
  options: [],
};

const _initOptions = function (map) {
  map.forEach((_, key) => {
    const option = CURRENCY_SYMBOLS_MAP_BY_CODE.get(key);

    if (!option) {
      return;
    }
    renderPackage.options.push(option);
  });
  renderPackage.options.sort();
}; // end _initOptions

/** ------------------------ RATES MAP SECTION ------------------------ */

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

let ratesMap = ratesToMap(CURRENCY_OFFLINE_RATES);

_initOptions(ratesMap);

/** ------------------------ API RENDER PACKAGE SECTION ------------------------ */

export const apiRenderData = {
  apiExample: '',
  apiTimestamp: '',
  apiBtnText: 'Update Currency Rates',
};

const _getRate = function (baseCode, targetCode) {
  // CURRENCY_BASE === USD

  if (baseCode === targetCode) {
    return 1;
  }

  const baseCodeRate = ratesMap.get(baseCode);
  const targetCodeRate = ratesMap.get(targetCode);

  console.log(
    `BASE CODE RATE ${baseCodeRate}, TARGET CODE RATE ${targetCodeRate}`
  );
  const usd = bigDecimal.divide(1, baseCodeRate);
  const rate = bigDecimal.multiply(usd, targetCodeRate);

  return rate;
}; // end _getRate

export const setExample = function (
  base = renderPackage.options.at(0),
  target = renderPackage.options.at(0)
) {
  const baseCode = CURRENCY_SYMBOLS_MAP_BY_NAME.get(base);

  const targetCode = CURRENCY_SYMBOLS_MAP_BY_NAME.get(target);

  const rate = _getRate(baseCode, targetCode);

  apiRenderData.apiExample = `1 ${baseCode} = ${rate} ${targetCode}`;
}; // end setExample

const _setTimeStamp = function (data) {
  const date = formatDateString(data.date);
  const time = convertTimestampToTime(data.timestamp);
  apiRenderData.apiTimestamp = `Updated ${date} ${time}`;
}; // end _setTimeStamp

const _setApiRenderData = function (data) {
  try {
    if (!data) {
      throw new Error(`Error in: ${data} data undefined`);
    }

    _setTimeStamp(data);
    setExample();
  } catch (error) {
    console.error(error);
  } // end try
}; // end

_setApiRenderData(CURRENCY_OFFLINE_RATES);

/** ------------------------ INIT SECTION ------------------------ */

export const updateExchangeRates = async function () {
  try {
    // headers required by API
    const myHeaders = new Headers();
    myHeaders.append('apikey', CURRENCY_API_KEY);

    // request options required by API
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    const data = await getJSON(CURRENCY_URL, requestOptions);

    const initialRateMap = ratesToMap(data);
    _initOptions(initialRateMap);
    _setApiRenderData(data);
    ratesMap = initialRateMap;
  } catch (error) {
    throw new Error(error);
  } // end try
}; // end updateExchangeRates

/** ------------------------ CONVERSATION TOOL SECTION ------------------------ */

export const conversationTool = function (base, target, expression) {
  const baseCode = CURRENCY_SYMBOLS_MAP_BY_NAME.get(base);
  const targetCode = CURRENCY_SYMBOLS_MAP_BY_NAME.get(target);
  const rate = _getRate(baseCode, targetCode);
  const result = bigDecimal.multiply(expression, rate);

  if (hasMoreThanTwoDecimalPlaces(result) && targetCode !== 'BTC') {
    return bigDecimal.round(result, 2);
  }

  return result;
}; // end conversationTool
