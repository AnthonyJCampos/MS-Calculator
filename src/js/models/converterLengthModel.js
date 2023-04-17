import converterLayout from '../layouts/converterLayout.js';

/** CURRENT LENGTH LAYOUT AND OPTIONS FOR THE LENGTH MODEL  */
export const renderPackage = {
  layout: converterLayout,
  options: [
    'Nanometers',
    'Microns',
    'Centimeters',
    'Meters',
    'Kilometers',
    'Inches',
    'Feet',
    'Yards',
    'Miles',
    'Nautical Miles',
  ],
};

/** STATE FOR CONTROLLER */
export const state = {
  activeDisplay: 0,
  firstUnitType: renderPackage.options[0],
  secondUnitType: renderPackage.options[0],
  activeContent: '',
  nonContent: 0,
}; // end state

/** DATA FOR COMPUTATION */
export const data = {
  curExpression: '',
  result: undefined,
}; // end data

/** STATE METHODS  */

export const getActiveDisplay = function () {
  return state.activeDisplay;
};

export const setActiveDisplay = function (controlUnit) {
  state.activeDisplay = controlUnit;
};

export const setFirstUnitType = function (firstUnit) {
  state.firstUnitType = firstUnit;
};

export const setSecondUnitType = function (secondUnit) {
  state.secondUnitType = secondUnit;
};

////// EXPRESSION METHODS

const _getCurrentExpression = function () {
  return data.curExpression;
}; // _getCurrentExpression

const _setCurrentExpression = function (updateValue) {
  data.curExpression = updateValue;
};

/** ------------------------ OUTPUT SECTION ------------------------ */

// RESULTS/INPUT SUBSECTION

const _generateString = function (input) {
  console.log(input);
  if (isFinite(input)) {
    return _removeTrailingZeros(bigDecimal.getPrettyValue(input));
  }
}; // end _generateResultString

const _removeTrailingZeros = function (str) {
  return str.replace(/(?:\.0+|(\.\d+?)0+)$/, '$1');
};

/** ------------------------ CONVERTER SECTION ------------------------ */

export const inputDelegatory = function (inputVal) {
  // check if button pressed is a number or decimal
  if (isFinite(inputVal) || inputVal === '.') {
    _numberDelegatory(inputVal);
  } // end number check if

  _commandDelegatory(inputVal);
};

const _numberDelegatory = function (inputVal) {
  // 1. process the input
  _setCurrentExpression(_validateInput(_getCurrentExpression(), inputVal));
  // 2. generate string output of expression to active display
  state.activeContent = _generateString(_getCurrentExpression());
  // 3. convert active display expression to selected convert unit
  state.nonContent = _generateString(_getNanometerConversation());
  // 4. generate string output of exppression for non-active displau
}; // end _numberDelegatory

const _validateInput = function (val, inputVal) {
  if (val === '0' && inputVal !== '.') {
    return (val = inputVal);
  }

  if (inputVal === '.' && !val.includes('.')) {
    return (val += inputVal);
  }

  if (inputVal !== '.') {
    return (val += inputVal);
  }

  return val;
}; // end _validateInput

const _commandDelegatory = function (inputVal) {}; // end _commandDelegatory

const converstionMap = function () {
  // options: [
  //   'Nanometers',
  //   'Microns',
  //   'Centimeters',
  //   'Meters',
  //   'Kilometers',
  //   'Inches',
  //   'Feet',
  //   'Yards',
  //   'Miles',
  //   'Nautical Miles',
  // ],
};
/** ------------------------ CONVERTER FORMULAS SECTION ------------------------ */

////// NANOMETERS METHODS

const _getNanometerConversation = function () {
  // 1. check if converting to self

  if (state.firstUnitType === state.secondUnitType) {
    return _getCurrentExpression();
  }

  const nanometerMap = new Map([
    ['Microns', nanometersToMicrons],
    ['Centimeters', nanometersToCentimeters],
    ['Meters', nanometersToMeters],
    ['Kilometers', nanometersToKilometers],
    ['Inches', nanometersToInches],
    ['Feet', nanometersToFeet],
    ['Yards', nanometersToYards],
    ['Miles', nanometersToMiles],
    ['Nautical Miles', nanometersToNauticalMiles],
  ]);

  const result = nanometerMap.get(state.secondUnitType)?.();
  console.log(result);
  return result;
};

const nanometersToMicrons = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1000);
};
const nanometersToCentimeters = function () {
  return bigDecimal.divide(_getCurrentExpression(), 10000000);
};
const nanometersToMeters = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1000000000);
};
const nanometersToKilometers = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1000000000000);
};
const nanometersToInches = function () {
  return bigDecimal.divide(_getCurrentExpression(), 25400000);
};
const nanometersToFeet = function () {
  return bigDecimal.divide(_getCurrentExpression(), 304800000);
};
const nanometersToYards = function () {
  return bigDecimal.divide(_getCurrentExpression(), 914400000);
};
const nanometersToMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1609344000000);
};
const nanometersToNauticalMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1852000000000);
};
