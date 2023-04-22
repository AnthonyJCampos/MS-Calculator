import {
  INPUT_LIMIT,
  DISPLAY_LIMIT,
  AVAILABLE_CONVERTERS_MAP,
} from '../configs/config.js';

/** ------------------------ DATA SECTION ------------------------ */

/** DATA FOR COMPUTATION */
export const data = {
  curExpression: '0',
  result: '0',
}; // end data

////// EXPRESSION METHODS

const _getCurrentExpression = function () {
  return data.curExpression;
}; // _getCurrentExpression

const _setCurrentExpression = function (updateValue) {
  // 1. the user character limit is 19 or 15 numbers

  if (updateValue.length <= INPUT_LIMIT) {
    data.curExpression = updateValue;
  }
};

const _getResult = function () {
  return data.result;
};

const _setResult = function (result) {
  data.result = result;
};

const _clearExpression = function () {
  data.curExpression = '0';
};

const _clearResult = function () {
  data.result = '0';
};

const _clearData = function () {
  _clearExpression();
  _clearResult();
};

const _getAssignedConverter = function () {
  return AVAILABLE_CONVERTERS_MAP.get(state.converterType);
}; // end _getAssignedConverter

/** ------------------------ API SECTION ------------------------ */

export const getApiRenderData = function () {
  const converter = _getAssignedConverter();
  if (!converter.apiRenderData) {
    return undefined;
  }
  return converter.apiRenderData;
};

const _updateApiRenderData = function () {
  const converter = _getAssignedConverter();
  if (!converter.apiRenderData) {
    return undefined;
  }
  converter.setExample(_getActiveUnit(), _getNonActiveUnit());
}; // end updateApiRenderData

export const updateApi = async function () {
  const converter = _getAssignedConverter();
  if (!converter.apiRenderData) {
    return undefined;
  }

  // 1. make API call
  await converter.updateExchangeRates();

  try {
  } catch (error) {
    console.error(error);
  }
};

/** ------------------------ STATE SECTION ------------------------ */

/** STATE FOR CONTROLLER */
export const state = {
  converterType: '',
  activeDisplay: 0,
  // position 0 is first unit, position 1 is second unit
  unitTypeArray: [],
  activeContent: '0',
  nonContent: '0',
}; // end state

/** STATE METHODS  */

export const setConverterType = function (toolSubType) {
  if (AVAILABLE_CONVERTERS_MAP.has(toolSubType)) {
    state.converterType = toolSubType;

    return true;
  }

  return false;
};

export const getLayout = function () {
  const converter = _getAssignedConverter();
  return converter.renderPackage.layout;
};

export const getOptions = function () {
  const converter = _getAssignedConverter();
  return converter.renderPackage.options;
};

export const setStateInitialOptions = function (initialOption) {
  state.unitTypeArray = [initialOption, initialOption];
};

const _clearStateContent = function () {
  state.activeContent = '0';
  state.nonContent = '0';
};

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
  _clearData();
  state.activeDisplay = controlUnit;
};

export const getNonActiveDisplay = function () {
  return state.activeDisplay === 0 ? 1 : 0;
};

const _getFirstUnitType = function () {
  return state.unitTypeArray[0];
};

const _getSecondUnitType = function () {
  return state.unitTypeArray[1];
};

const _sameUnitCheck = function () {
  return state.unitTypeArray[0] === state.unitTypeArray[1];
};

function _getActiveUnit() {
  return state.unitTypeArray[state.activeDisplay];
}

function _getNonActiveUnit() {
  return state.activeDisplay === 0
    ? state.unitTypeArray[1]
    : state.unitTypeArray[0];
}

export const setFirstUnitType = function (firstUnit) {
  // 1. check if unit type is different from current
  if (state.unitTypeArray[0] === firstUnit) {
    return;
  }

  state.unitTypeArray[0] = firstUnit;
  // 2. update non active display
  _updateNonActiveState();

  // 3. update api render data if converter uses api
  _updateApiRenderData();
};

export const setSecondUnitType = function (secondUnit) {
  // 1. check if unit type is different from current
  if (state.unitTypeArray[1] === secondUnit) {
    return;
  }
  // 2. chech if first unit type is current active unit
  state.unitTypeArray[1] = secondUnit;

  // 2. update non active display
  _updateNonActiveState();

  // 3. update api render data if converter uses api
  _updateApiRenderData();
};

/** ------------------------ DATA & STATE RESET ------------------------ */

export const modelReset = function () {
  _clearData();
  _clearStateContent();
  setActiveDisplay(0);
  state.unitTypeArray = [];
  state.converterType = '';
};
/** ------------------------ OUTPUT SECTION ------------------------ */

// RESULTS/INPUT SUBSECTION

const _generateString = function (input) {
  if (isFinite(input)) {
    let inputString = _removeTrailingZeros(bigDecimal.getPrettyValue(input));

    if (inputString.length > DISPLAY_LIMIT) {
      inputString = inputString.slice(0, DISPLAY_LIMIT);
    }

    return inputString;
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

  _updateNonActiveState();
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

function _updateNonActiveState() {
  if (_sameUnitCheck()) {
    _setResult(_getCurrentExpression());
  } else {
    _setResult(_convert());
  }
  // generate string output of exppression for non-active display
  state.nonContent = _generateString(_getResult());
}

const _convert = function () {
  // 1. get the conversation to from the available converters in config
  const conversationTool = _getAssignedConverter().conversationTool;

  // 2. call conversation tool, base, target, current expression
  const result = conversationTool(
    _getActiveUnit(),
    _getNonActiveUnit(),
    _getCurrentExpression()
  );
  if (result === undefined) {
    console.error('Error In Convert Method, Result is undefined');
    return;
  }

  return result;
};

////// COMMAND METHODS

const _commandDelegatory = function (inputVal) {
  const cmdMap = new Map([
    ['clear entry', _clearEntry],
    ['back', _back],
  ]);

  const cmd = cmdMap.get(inputVal);
  if (!cmd) {
    return;
  } // end of

  cmd();
}; // end _commandDelegatory

const _clearEntry = function () {
  _clearData();
  _clearStateContent();
};

const _back = function () {
  const currentExpression = Number(_getCurrentExpression());
  // 1. check if there is only 1 digit
  if (currentExpression > -10 && currentExpression < 10) {
    _clearEntry();
  }
  // 2. remove one digit from number
  const formatedNum = currentExpression.toString().slice(0, -1);
  _setCurrentExpression(formatedNum);
  state.activeContent = _generateString(_getCurrentExpression());
  // 3. update non-active unit
  _updateNonActiveState();
};

/** ------------------------ END OF CONVERT MODEL ------------------------ */
