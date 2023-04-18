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

/** DATA FOR COMPUTATION */
export const data = {
  curExpression: '',
  result: undefined,
}; // end data

////// EXPRESSION METHODS

const _getCurrentExpression = function () {
  return data.curExpression;
}; // _getCurrentExpression

const _setCurrentExpression = function (updateValue) {
  data.curExpression = updateValue;
};

const _getResult = function () {
  return data.result;
};

const _setResult = function (result) {
  data.result = result;
};

const _clearExpression = function () {
  data.curExpression = '';
};

const _clearResult = function () {
  data.result = undefined;
};

const _clear = function () {
  _clearExpression();
  _clearResult();
};

/** STATE FOR CONTROLLER */
export const state = {
  activeDisplay: 0,
  firstUnitType: renderPackage.options[0],
  secondUnitType: renderPackage.options[0],
  // position 0 is first unit, position 1 is second unit
  unitTypeArray: [renderPackage.options[0], renderPackage.options[0]],
  activeContent: '',
  nonContent: 0,
}; // end state

/** STATE METHODS  */

export const getActiveDisplay = function () {
  return state.activeDisplay;
};

export const setActiveDisplay = function (controlUnit) {
  // 1. check if active is same, if so do nothing
  if (controlUnit === getActiveDisplay()) {
    return;
  }
  // 2 if controlUnit is different we need to clear data
  // however we do not clear what is displayed
  _clear();
  state.activeDisplay = controlUnit;
};

const _getFirstUnitType = function () {
  return state.unitTypeArray[0];
};

const _getSecondUnitType = function () {
  return state.unitTypeArray[1];
};

export const setFirstUnitType = function (firstUnit) {
  state.unitTypeArray[0] = firstUnit;
};

export const setSecondUnitType = function (secondUnit) {
  state.unitTypeArray[1] = secondUnit;
};

const _sameUnitCheck = function () {
  return state.unitTypeArray[0] === state.unitTypeArray[1];
};

const _getActiveUnit = function () {
  return state.unitTypeArray[state.activeDisplay];
};

const _getNonActiveUnit = function () {
  return state.activeDisplay === 0
    ? state.unitTypeArray[1]
    : state.unitTypeArray[0];
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

  if (_sameUnitCheck()) {
    _setResult(_getCurrentExpression());
  } else {
    _setResult(_convert());
  }
  // 4. generate string output of exppression for non-active display
  state.nonContent = _generateString(_getResult());
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

const _convert = function () {
  const lengthConvertMap = new Map([
    ['Nanometers', _getNanometerConversation],
    ['Microns', _getMicronsConversation],
    ['Centimeters', _getCentimetersConversation],
    ['Meters', _getMetersConversation],
    ['Kilometers', _getKilometersConversation],
    ['Inches', _getInchesConversation],
    ['Feet', _getFeetConversation],
    ['Yards', _getYardsConversation],
    ['Miles', _getMilesConversation],
    ['Nautical Miles', _getNauticalMilesConversation],
  ]);

  const result = lengthConvertMap.get(_getActiveUnit())?.(_getNonActiveUnit());

  if (result === undefined) {
    console.error('Error In Convert Method, Result is undefined');
    return;
  }

  return result;
};

const _commandDelegatory = function (inputVal) {}; // end _commandDelegatory

/** ------------------------ CONVERTER FORMULAS SECTION ------------------------ */

////// NANOMETERS METHODS

const _getNanometerConversation = function (nonActiveUnit) {
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

  const result = nanometerMap.get(nonActiveUnit)?.();
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

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

////// MICRONS METHODS

const _getMicronsConversation = function (nonActiveUnit) {
  const micronsMap = new Map([
    ['Nanometers,', micronstoNanometers],
    ['Centimeters', micronsToCentimeters],
    ['Meters', micronsToMeters],
    ['Kilometers', micronsToKilometers],
    ['Inches', micronsToInches],
    ['Feet', micronsToFeet],
    ['Yards', micronsToYards],
    ['Miles', micronsToMiles],
    ['Nautical Miles', micronsToNauticalMiles],
  ]);

  const result = micronsMap.get(nonActiveUnit)?.();
  return result;
};

const micronstoNanometers = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1000);
};
const micronsToCentimeters = function () {
  return bigDecimal.divide(_getCurrentExpression(), 10000);
};
const micronsToMeters = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1000000);
};
const micronsToKilometers = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1000000000);
};
const micronsToInches = function () {
  return bigDecimal.divide(_getCurrentExpression(), 25400);
};
const micronsToFeet = function () {
  return bigDecimal.divide(_getCurrentExpression(), 304800);
};
const micronsToYards = function () {
  return bigDecimal.divide(_getCurrentExpression(), 914400);
};
const micronsToMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1609344000);
};
const micronsToNauticalMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1852000000);
};

////// CENTIMETERS METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getCentimetersConversation = function (nonActiveUnit) {
  const centimetersMap = new Map([
    ['Nanometers,', centimeterstoNanometers],
    ['Microns', centimetersToMicrons],
    ['Meters', centimetersToMeters],
    ['Kilometers', centimetersToKilometers],
    ['Inches', centimetersToInches],
    ['Feet', centimetersToFeet],
    ['Yards', centimetersToYards],
    ['Miles', centimetersToMiles],
    ['Nautical Miles', centimetersToNauticalMiles],
  ]);

  const result = centimetersMap.get(nonActiveUnit)?.();
  return result;
};

const centimeterstoNanometers = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 10000000);
};
const centimetersToMicrons = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 10000);
};
const centimetersToMeters = function () {
  return bigDecimal.divide(_getCurrentExpression(), 100);
};
const centimetersToKilometers = function () {
  return bigDecimal.divide(_getCurrentExpression(), 100000);
};
const centimetersToInches = function () {
  return bigDecimal.divide(_getCurrentExpression(), 2.54);
};
const centimetersToFeet = function () {
  return bigDecimal.divide(_getCurrentExpression(), 30.48);
};
const centimetersToYards = function () {
  return bigDecimal.divide(_getCurrentExpression(), 91.44);
};
const centimetersToMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 160900);
};
const centimetersToNauticalMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 185200);
};

////// METERS METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getMetersConversation = function (nonActiveUnit) {
  const metersMap = new Map([
    ['Nanometers,', meterstoNanometers],
    ['Microns', metersToMicrons],
    ['Centimeters', metersToCentimeters],
    ['Kilometers', metersToKilometers],
    ['Inches', metersToInches],
    ['Feet', metersToFeet],
    ['Yards', metersToYards],
    ['Miles', metersToMiles],
    ['Nautical Miles', metersToNauticalMiles],
  ]);

  const result = metersMap.get(nonActiveUnit)?.();
  return result;
};

const meterstoNanometers = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1000000000);
};
const metersToMicrons = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1000000);
};
const metersToCentimeters = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 100);
};
const metersToKilometers = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1000);
};
const metersToInches = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 39.37);
};
const metersToFeet = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 3.2808);
};
const metersToYards = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1.0936);
};
const metersToMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1609.344);
};
const metersToNauticalMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1852);
};

////// KILOMETERS METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getKilometersConversation = function (nonActiveUnit) {
  const kilometersMap = new Map([
    ['Nanometers,', kilometerstoNanometers],
    ['Microns', kilometersToMicrons],
    ['Centimeters', kilometersToCentimeters],
    ['Meters', kilometersToMeters],
    ['Inches', kilometersToInches],
    ['Feet', kilometersToFeet],
    ['Yards', kilometersToYards],
    ['Miles', kilometersToMiles],
    ['Nautical Miles', kilometersToNauticalMiles],
  ]);

  const result = kilometersMap.get(nonActiveUnit)?.();
  return result;
};

const kilometerstoNanometers = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1000000000000);
};
const kilometersToMicrons = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1000000000);
};
const kilometersToCentimeters = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 100000);
};
const kilometersToMeters = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1000);
};
const kilometersToInches = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 39370);
};
const kilometersToFeet = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 3280.8);
};
const kilometersToYards = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1093.6);
};
const kilometersToMiles = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 0.62137);
};
const kilometersToNauticalMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1.852);
};

////// INCHES METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getInchesConversation = function (nonActiveUnit) {
  const inchesMap = new Map([
    ['Nanometers,', inchestoNanometers],
    ['Microns', inchesToMicrons],
    ['Centimeters', inchesToCentimeters],
    ['Meters', inchesToMeters],
    ['Kilometers', inchesToKilometers],
    ['Feet', inchesToFeet],
    ['Yards', inchesToYards],
    ['Miles', inchesToMiles],
    ['Nautical Miles', inchesToNauticalMiles],
  ]);

  const result = inchesMap.get(nonActiveUnit)?.();
  return result;
};

const inchestoNanometers = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 25400000);
};
const inchesToMicrons = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 25400);
};
const inchesToCentimeters = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 2.54);
};
const inchesToMeters = function () {
  return bigDecimal.divide(_getCurrentExpression(), 39.37);
};
const inchesToKilometers = function () {
  return bigDecimal.divide(_getCurrentExpression(), 39370);
};
const inchesToFeet = function () {
  return bigDecimal.divide(_getCurrentExpression(), 12);
};
const inchesToYards = function () {
  return bigDecimal.divide(_getCurrentExpression(), 36);
};
const inchesToMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 63360);
};
const inchesToNauticalMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 72910);
};

////// FEET METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getFeetConversation = function (nonActiveUnit) {
  const feetMap = new Map([
    ['Nanometers,', feettoNanometers],
    ['Microns', feetToMicrons],
    ['Centimeters', feetToCentimeters],
    ['Meters', feetToMeters],
    ['Kilometers', feetToKilometers],
    ['Inches', feetToInches],
    ['Yards', feetToYards],
    ['Miles', feetToMiles],
    ['Nautical Miles', feetToNauticalMiles],
  ]);

  const result = feetMap.get(nonActiveUnit)?.();
  return result;
};

const feettoNanometers = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 304800000);
};
const feetToMicrons = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 304800);
};
const feetToCentimeters = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 30.48);
};
const feetToMeters = function () {
  return bigDecimal.divide(_getCurrentExpression(), 3.2808);
};
const feetToKilometers = function () {
  return bigDecimal.divide(_getCurrentExpression(), 3280.8);
};
const feetToInches = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 12);
};
const feetToYards = function () {
  return bigDecimal.divide(_getCurrentExpression(), 3);
};
const feetToMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 5280);
};
const feetToNauticalMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 6076);
};

////// YARDS METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getYardsConversation = function (nonActiveUnit) {
  const yardsMap = new Map([
    ['Nanometers,', yardstoNanometers],
    ['Microns', yardsToMicrons],
    ['Centimeters', yardsToCentimeters],
    ['Meters', yardsToMeters],
    ['Kilometers', yardsToKilometers],
    ['Inches', yardsToInches],
    ['Feet', yardsToFeet],
    ['Miles', yardsToMiles],
    ['Nautical Miles', yardsToNauticalMiles],
  ]);

  const result = yardsMap.get(nonActiveUnit)?.();
  return result;
};

const yardstoNanometers = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 914400000);
};
const yardsToMicrons = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 914400);
};
const yardsToCentimeters = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 91.44);
};
const yardsToMeters = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1.0936);
};
const yardsToKilometers = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 0.000914);
};
const yardsToInches = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 36);
};
const yardsToFeet = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 3);
};
const yardsToMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1760);
};
const yardsToNauticalMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 2025);
};

////// MILES METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getMilesConversation = function (nonActiveUnit) {
  const milesMap = new Map([
    ['Nanometers,', milestoNanometers],
    ['Microns', milesToMicrons],
    ['Centimeters', milesToCentimeters],
    ['Meters', milesToMeters],
    ['Kilometers', milesToKilometers],
    ['Inches', milesToInches],
    ['Feet', milesToFeet],
    ['Yards', milesToYards],
    ['Nautical Miles', milesToNauticalMiles],
  ]);

  const result = milesMap.get(nonActiveUnit)?.();
  return result;
};

const milestoNanometers = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1609344000000);
};
const milesToMicrons = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1609344000);
};
const milesToCentimeters = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 160934.4);
};
const milesToMeters = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1609.344);
};
const milesToKilometers = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1.609344);
};
const milesToInches = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 63360);
};
const milesToFeet = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 5280);
};
const milesToYards = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1760);
};
const milesToNauticalMiles = function () {
  return bigDecimal.divide(_getCurrentExpression(), 1.151);
};

////// NAUTICAL MILES METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getNauticalMilesConversation = function (nonActiveUnit) {
  const nauticalMilesMap = new Map([
    ['Nanometers,', nauticalMilestoNanometers],
    ['Microns', nauticalMilesToMicrons],
    ['Centimeters', nauticalMilesToCentimeters],
    ['Meters', nauticalMilesToMeters],
    ['Kilometers', nauticalMilesToKilometers],
    ['Inches', nauticalMilesToInches],
    ['Feet', nauticalMilesToFeet],
    ['Yards', nauticalMilesToYards],
    ['Miles', nauticalMilesToMiles],
  ]);

  const result = nauticalMilesMap.get(nonActiveUnit)?.();
  return result;
};

const nauticalMilestoNanometers = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1.852e12);
};
const nauticalMilesToMicrons = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1.852e9);
};
const nauticalMilesToCentimeters = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 185200);
};
const nauticalMilesToMeters = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1852);
};
const nauticalMilesToKilometers = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1.852);
};
const nauticalMilesToInches = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 72913);
};
const nauticalMilesToFeet = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 6076.1);
};
const nauticalMilesToYards = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 2025.4);
};
const nauticalMilesToMiles = function () {
  return bigDecimal.multiply(_getCurrentExpression(), 1.1508);
};
