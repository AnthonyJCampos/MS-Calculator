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

export const state = {
  firstUnitType: renderPackage.options[0],
  secondUnitType: renderPackage.options[0],
  result: '',
}; // end state

export const setFirstUnitType = function (firstUnit) {
  state.firstUnitType = firstUnit;
};

export const setSecondUnitType = function (secondUnit) {
  state.secondUnitType = secondUnit;
};

export const inputDelegatory = function (inputVal) {
  // check if button pressed is a number or decimal
  if (isFinite(inputVal) || inputVal === '.') {
    // _numberDelegatory(inputVal);
  } // end number check if

  _commandDelegatory(inputVal);
};

const _numberDelegatory = function (inputVal) {}; // end _numberDelegatory

const _setCurrentFocuedUnitValue = function () {};

const _validateOprend = function (val, inputVal) {
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
}; // end _validateOprend

const _commandDelegatory = function (inputVal) {}; // end _commandDelegatory
