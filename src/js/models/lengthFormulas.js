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

/** ------------------------ CONVERTER FORMULAS SECTION ------------------------ */

////// NANOMETERS METHODS

const _getNanometerConversation = function (expression, nonActiveUnit) {
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

  const result = nanometerMap.get(nonActiveUnit)?.(expression);
  return result;
};

const nanometersToMicrons = function (expression) {
  return bigDecimal.divide(expression, 1000);
};
const nanometersToCentimeters = function (expression) {
  return bigDecimal.divide(expression, 10000000, 15);
};
const nanometersToMeters = function (expression) {
  return bigDecimal.divide(expression, 1000000000, 15);
};
const nanometersToKilometers = function (expression) {
  return bigDecimal.divide(expression, 1000000000000, 15);
};
const nanometersToInches = function (expression) {
  return bigDecimal.divide(expression, 25400000, 15);
};
const nanometersToFeet = function (expression) {
  return bigDecimal.divide(expression, 304800000, 15);
};
const nanometersToYards = function (expression) {
  return bigDecimal.divide(expression, 914400000, 15);
};
const nanometersToMiles = function (expression) {
  return bigDecimal.divide(expression, 1609344000000, 15);
};
const nanometersToNauticalMiles = function (expression) {
  return bigDecimal.divide(expression, 1852000000000, 15);
};

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

////// MICRONS METHODS

const _getMicronsConversation = function (expression, nonActiveUnit) {
  const micronsMap = new Map([
    ['Nanometers', micronstoNanometers],
    ['Centimeters', micronsToCentimeters],
    ['Meters', micronsToMeters],
    ['Kilometers', micronsToKilometers],
    ['Inches', micronsToInches],
    ['Feet', micronsToFeet],
    ['Yards', micronsToYards],
    ['Miles', micronsToMiles],
    ['Nautical Miles', micronsToNauticalMiles],
  ]);

  const result = micronsMap.get(nonActiveUnit)?.(expression);
  return result;
};

const micronstoNanometers = function (expression) {
  return bigDecimal.multiply(expression, 1000);
};
const micronsToCentimeters = function (expression) {
  return bigDecimal.divide(expression, 10000, 15);
};
const micronsToMeters = function (expression) {
  return bigDecimal.divide(expression, 1000000, 15);
};
const micronsToKilometers = function (expression) {
  return bigDecimal.divide(expression, 1000000000, 15);
};
const micronsToInches = function (expression) {
  return bigDecimal.divide(expression, 25400, 15);
};
const micronsToFeet = function (expression) {
  return bigDecimal.divide(expression, 304800, 15);
};
const micronsToYards = function (expression) {
  return bigDecimal.divide(expression, 914400, 15);
};
const micronsToMiles = function (expression) {
  return bigDecimal.divide(expression, 1609344000, 15);
};
const micronsToNauticalMiles = function (expression) {
  return bigDecimal.divide(expression, 1852000000, 15);
};

////// CENTIMETERS METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getCentimetersConversation = function (expression, nonActiveUnit) {
  const centimetersMap = new Map([
    ['Nanometers', centimeterstoNanometers],
    ['Microns', centimetersToMicrons],
    ['Meters', centimetersToMeters],
    ['Kilometers', centimetersToKilometers],
    ['Inches', centimetersToInches],
    ['Feet', centimetersToFeet],
    ['Yards', centimetersToYards],
    ['Miles', centimetersToMiles],
    ['Nautical Miles', centimetersToNauticalMiles],
  ]);

  const result = centimetersMap.get(nonActiveUnit)?.(expression);
  return result;
};

const centimeterstoNanometers = function (expression) {
  return bigDecimal.multiply(expression, 10000000);
};
const centimetersToMicrons = function (expression) {
  return bigDecimal.multiply(expression, 10000);
};
const centimetersToMeters = function (expression) {
  return bigDecimal.divide(expression, 100);
};
const centimetersToKilometers = function (expression) {
  return bigDecimal.divide(expression, 100000);
};
const centimetersToInches = function (expression) {
  return bigDecimal.divide(expression, 2.54);
};
const centimetersToFeet = function (expression) {
  return bigDecimal.divide(expression, 30.48);
};
const centimetersToYards = function (expression) {
  return bigDecimal.divide(expression, 91.44);
};
const centimetersToMiles = function (expression) {
  return bigDecimal.divide(expression, 160900);
};
const centimetersToNauticalMiles = function (expression) {
  return bigDecimal.divide(expression, 185200);
};

////// METERS METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getMetersConversation = function (expression, nonActiveUnit) {
  const metersMap = new Map([
    ['Nanometers', meterstoNanometers],
    ['Microns', metersToMicrons],
    ['Centimeters', metersToCentimeters],
    ['Kilometers', metersToKilometers],
    ['Inches', metersToInches],
    ['Feet', metersToFeet],
    ['Yards', metersToYards],
    ['Miles', metersToMiles],
    ['Nautical Miles', metersToNauticalMiles],
  ]);

  const result = metersMap.get(nonActiveUnit)?.(expression);
  return result;
};

const meterstoNanometers = function (expression) {
  return bigDecimal.multiply(expression, 1000000000);
};
const metersToMicrons = function (expression) {
  return bigDecimal.multiply(expression, 1000000);
};
const metersToCentimeters = function (expression) {
  return bigDecimal.multiply(expression, 100);
};
const metersToKilometers = function (expression) {
  return bigDecimal.divide(expression, 1000);
};
const metersToInches = function (expression) {
  return bigDecimal.multiply(expression, 39.37);
};
const metersToFeet = function (expression) {
  return bigDecimal.multiply(expression, 3.2808);
};
const metersToYards = function (expression) {
  return bigDecimal.multiply(expression, 1.0936);
};
const metersToMiles = function (expression) {
  return bigDecimal.divide(expression, 1609.344);
};
const metersToNauticalMiles = function (expression) {
  return bigDecimal.divide(expression, 1852);
};

////// KILOMETERS METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getKilometersConversation = function (expression, nonActiveUnit) {
  const kilometersMap = new Map([
    ['Nanometers', kilometerstoNanometers],
    ['Microns', kilometersToMicrons],
    ['Centimeters', kilometersToCentimeters],
    ['Meters', kilometersToMeters],
    ['Inches', kilometersToInches],
    ['Feet', kilometersToFeet],
    ['Yards', kilometersToYards],
    ['Miles', kilometersToMiles],
    ['Nautical Miles', kilometersToNauticalMiles],
  ]);

  const result = kilometersMap.get(nonActiveUnit)?.(expression);
  return result;
};

const kilometerstoNanometers = function (expression) {
  return bigDecimal.multiply(expression, 1000000000000);
};
const kilometersToMicrons = function (expression) {
  return bigDecimal.multiply(expression, 1000000000);
};
const kilometersToCentimeters = function (expression) {
  return bigDecimal.multiply(expression, 100000);
};
const kilometersToMeters = function (expression) {
  return bigDecimal.multiply(expression, 1000);
};
const kilometersToInches = function (expression) {
  return bigDecimal.multiply(expression, 39370);
};
const kilometersToFeet = function (expression) {
  return bigDecimal.multiply(expression, 3280.8);
};
const kilometersToYards = function (expression) {
  return bigDecimal.multiply(expression, 1093.6);
};
const kilometersToMiles = function (expression) {
  return bigDecimal.multiply(expression, 0.62137);
};
const kilometersToNauticalMiles = function (expression) {
  return bigDecimal.divide(expression, 1.852);
};

////// INCHES METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getInchesConversation = function (expression, nonActiveUnit) {
  const inchesMap = new Map([
    ['Nanometers', inchestoNanometers],
    ['Microns', inchesToMicrons],
    ['Centimeters', inchesToCentimeters],
    ['Meters', inchesToMeters],
    ['Kilometers', inchesToKilometers],
    ['Feet', inchesToFeet],
    ['Yards', inchesToYards],
    ['Miles', inchesToMiles],
    ['Nautical Miles', inchesToNauticalMiles],
  ]);

  const result = inchesMap.get(nonActiveUnit)?.(expression);
  return result;
};

const inchestoNanometers = function (expression) {
  return bigDecimal.multiply(expression, 25400000);
};
const inchesToMicrons = function (expression) {
  return bigDecimal.multiply(expression, 25400);
};
const inchesToCentimeters = function (expression) {
  return bigDecimal.multiply(expression, 2.54);
};
const inchesToMeters = function (expression) {
  return bigDecimal.divide(expression, 39.37);
};
const inchesToKilometers = function (expression) {
  return bigDecimal.divide(expression, 39370);
};
const inchesToFeet = function (expression) {
  return bigDecimal.divide(expression, 12);
};
const inchesToYards = function (expression) {
  return bigDecimal.divide(expression, 36);
};
const inchesToMiles = function (expression) {
  return bigDecimal.divide(expression, 63360);
};
const inchesToNauticalMiles = function (expression) {
  return bigDecimal.divide(expression, 72910);
};

////// FEET METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getFeetConversation = function (expression, nonActiveUnit) {
  const feetMap = new Map([
    ['Nanometers', feettoNanometers],
    ['Microns', feetToMicrons],
    ['Centimeters', feetToCentimeters],
    ['Meters', feetToMeters],
    ['Kilometers', feetToKilometers],
    ['Inches', feetToInches],
    ['Yards', feetToYards],
    ['Miles', feetToMiles],
    ['Nautical Miles', feetToNauticalMiles],
  ]);

  const result = feetMap.get(nonActiveUnit)?.(expression);
  return result;
};

const feettoNanometers = function (expression) {
  return bigDecimal.multiply(expression, 304800000);
};
const feetToMicrons = function (expression) {
  return bigDecimal.multiply(expression, 304800);
};
const feetToCentimeters = function (expression) {
  return bigDecimal.multiply(expression, 30.48);
};
const feetToMeters = function (expression) {
  return bigDecimal.divide(expression, 3.2808);
};
const feetToKilometers = function (expression) {
  return bigDecimal.divide(expression, 3280.8);
};
const feetToInches = function (expression) {
  return bigDecimal.multiply(expression, 12);
};
const feetToYards = function (expression) {
  return bigDecimal.divide(expression, 3);
};
const feetToMiles = function (expression) {
  return bigDecimal.divide(expression, 5280);
};
const feetToNauticalMiles = function (expression) {
  return bigDecimal.divide(expression, 6076);
};

////// YARDS METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getYardsConversation = function (expression, nonActiveUnit) {
  const yardsMap = new Map([
    ['Nanometers', yardstoNanometers],
    ['Microns', yardsToMicrons],
    ['Centimeters', yardsToCentimeters],
    ['Meters', yardsToMeters],
    ['Kilometers', yardsToKilometers],
    ['Inches', yardsToInches],
    ['Feet', yardsToFeet],
    ['Miles', yardsToMiles],
    ['Nautical Miles', yardsToNauticalMiles],
  ]);

  const result = yardsMap.get(nonActiveUnit)?.(expression);
  return result;
};

const yardstoNanometers = function (expression) {
  return bigDecimal.multiply(expression, 914400000);
};
const yardsToMicrons = function (expression) {
  return bigDecimal.multiply(expression, 914400);
};
const yardsToCentimeters = function (expression) {
  return bigDecimal.multiply(expression, 91.44);
};
const yardsToMeters = function (expression) {
  return bigDecimal.divide(expression, 1.0936);
};
const yardsToKilometers = function (expression) {
  return bigDecimal.multiply(expression, 0.000914);
};
const yardsToInches = function (expression) {
  return bigDecimal.multiply(expression, 36);
};
const yardsToFeet = function (expression) {
  return bigDecimal.multiply(expression, 3);
};
const yardsToMiles = function (expression) {
  return bigDecimal.divide(expression, 1760);
};
const yardsToNauticalMiles = function (expression) {
  return bigDecimal.divide(expression, 2025);
};

////// MILES METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getMilesConversation = function (expression, nonActiveUnit) {
  const milesMap = new Map([
    ['Nanometers', milestoNanometers],
    ['Microns', milesToMicrons],
    ['Centimeters', milesToCentimeters],
    ['Meters', milesToMeters],
    ['Kilometers', milesToKilometers],
    ['Inches', milesToInches],
    ['Feet', milesToFeet],
    ['Yards', milesToYards],
    ['Nautical Miles', milesToNauticalMiles],
  ]);

  const result = milesMap.get(nonActiveUnit)?.(expression);
  return result;
};

const milestoNanometers = function (expression) {
  return bigDecimal.multiply(expression, 1609344000000);
};
const milesToMicrons = function (expression) {
  return bigDecimal.multiply(expression, 1609344000);
};
const milesToCentimeters = function (expression) {
  return bigDecimal.multiply(expression, 160934.4);
};
const milesToMeters = function (expression) {
  return bigDecimal.multiply(expression, 1609.344);
};
const milesToKilometers = function (expression) {
  return bigDecimal.multiply(expression, 1.609344);
};
const milesToInches = function (expression) {
  return bigDecimal.multiply(expression, 63360);
};
const milesToFeet = function (expression) {
  return bigDecimal.multiply(expression, 5280);
};
const milesToYards = function (expression) {
  return bigDecimal.multiply(expression, 1760);
};
const milesToNauticalMiles = function (expression) {
  return bigDecimal.divide(expression, 1.151);
};

////// NAUTICAL MILES METHODS

/**  Nanometers, Microns, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles, Nautical Miles*/

const _getNauticalMilesConversation = function (expression, nonActiveUnit) {
  const nauticalMilesMap = new Map([
    ['Nanometers', nauticalMilestoNanometers],
    ['Microns', nauticalMilesToMicrons],
    ['Centimeters', nauticalMilesToCentimeters],
    ['Meters', nauticalMilesToMeters],
    ['Kilometers', nauticalMilesToKilometers],
    ['Inches', nauticalMilesToInches],
    ['Feet', nauticalMilesToFeet],
    ['Yards', nauticalMilesToYards],
    ['Miles', nauticalMilesToMiles],
  ]);

  const result = nauticalMilesMap.get(nonActiveUnit)?.(expression);
  return result;
};

const nauticalMilestoNanometers = function (expression) {
  return bigDecimal.multiply(expression, 1.852e12);
};
const nauticalMilesToMicrons = function (expression) {
  return bigDecimal.multiply(expression, 1.852e9);
};
const nauticalMilesToCentimeters = function (expression) {
  return bigDecimal.multiply(expression, 185200);
};
const nauticalMilesToMeters = function (expression) {
  return bigDecimal.multiply(expression, 1852);
};
const nauticalMilesToKilometers = function (expression) {
  return bigDecimal.multiply(expression, 1.852);
};
const nauticalMilesToInches = function (expression) {
  return bigDecimal.multiply(expression, 72913);
};
const nauticalMilesToFeet = function (expression) {
  return bigDecimal.multiply(expression, 6076.1);
};
const nauticalMilesToYards = function (expression) {
  return bigDecimal.multiply(expression, 2025.4);
};
const nauticalMilesToMiles = function (expression) {
  return bigDecimal.multiply(expression, 1.1508);
};

/** ------------------------ CONVERSATION MAP SECTION ------------------------ */

export const conversationMap = new Map([
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

export const conversationTool = function (base, target, expression) {
  return conversationMap.get(base)?.(expression, target);
};
