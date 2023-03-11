import standardLayout from './layouts/standardLayout.js';
import converterLayout from './layouts/converterLayout.js';
export const LAYOUT_MAP = new Map([
  // ['Standard', standardLayout],
  ['Standard', { layout: standardLayout, type: 'calculator' }],
  ['Length', { layout: converterLayout, type: 'converter' }],
]);
export const BtnContainer = 'btn_container';
