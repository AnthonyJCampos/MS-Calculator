import * as lengthFormulas from './models/lengthFormulas.js';

export const INPUT_LIMIT = 15;
export const DISPLAY_LIMIT = 19;

export const CONVERTER_TOOLS_KEYS = new Set(['Length']);

// export const CONVERTER_MODELS = new Map([['Length', lengthModel]]);
export const AVAILABLE_CONVERTERS_MAP = new Map([['Length', lengthFormulas]]);

export const CALCULATOR_TOOLS = new Set(['Standard']);
