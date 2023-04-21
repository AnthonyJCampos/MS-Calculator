import * as lengthFormulas from './models/lengthFormulas.js';
import * as currencyForumlas from './models/currencyFormulas.js';

/** ------------------------ FETCH SECTION ------------------------ */
export const TIMEOUT_SEC = 10;

export const CURRENCY_URL = 'https://api.apilayer.com/exchangerates_data/';
export const CURRENCY_API_KEY = 'JvhGI10xYKOM5m2xMCRtAIxVGrrMh1dn';
/** ------------------------ DISPLAY SECTION ------------------------ */
export const INPUT_LIMIT = 15;
export const DISPLAY_LIMIT = 19;

/** ------------------------ TOOL SECTION ------------------------ */

export const CONVERTER_TOOLS_KEYS = new Set(['Length', 'Currency']);
export const AVAILABLE_CONVERTERS_MAP = new Map([
  ['Length', lengthFormulas],
  ['Currency', currencyForumlas],
]);
export const CALCULATOR_TOOLS_KEYS = new Set(['Standard']);

export const INITIAL_SETUP = {
  defaultTool: { type: 'Calculator', tool: 'Standard' },
  toolSelections: [
    { type: 'Calculator', tools: [...CALCULATOR_TOOLS_KEYS] },
    { type: 'Converter', tools: [...CONVERTER_TOOLS_KEYS] },
  ],
};
