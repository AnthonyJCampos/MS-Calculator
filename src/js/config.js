import standardLayout from './layouts/standardLayout.js';
import converterLayout from './layouts/converterLayout.js';
// export const LAYOUT_MAP = new Map([
//   // ['Standard', standardLayout],
//   ['Standard', { layout: standardLayout, type: 'calculator' }],
//   ['Length', { layout: converterLayout, type: 'converter' }],
// ]);

// export const BtnContainer = 'btn_container';

export const CONVERTER_TOOLS = new Set(['Length']);
export const CALCULATOR_TOOLS = new Set(['Standard']);

export const LENGTH_OPTIONS = [
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
];
