import { INPUT_LIMIT, DISPLAY_LIMIT } from '../configs/config.js';
import {
  convertToExponential,
  removeTrailingZeros,
} from '../helpers/helper.js';
/** STATE FOR CONTROLLER */

export const state = {
  result: '',
  expression: '',
  history: [],
}; // end state

/** DATA FOR COMPUTATION */
const data = {
  curExpression: ['0'],
  curExpPos: 0,
  result: undefined,
  solvedFlag: false,

  leftOprendStack: [],
  rightOprendStack: [],
}; // end data

/** VALID OPERATORS */

const OPERATORS = ['/', '*', '-', '+'];

/** DATA METHODS  */

////// RESULTS METHODS
const _setResult = function (val) {
  data.result = val;
}; // end _setResult

const _getResult = function () {
  return data.result;
}; // end _getResult

const _resultIsEmpty = function () {
  return data.result === undefined;
}; // end _resultIsEmpty

const _resetResult = function () {
  data.result = undefined;
}; // end _resetResult

////// SOLVED STATE METHODS

const _getSolvedState = function () {
  return data.solvedFlag;
}; // end _getSolvedState

const _updateSolvedState = function (bool) {
  data.solvedFlag = bool;
}; // end _updateSolvedState

////// STACK METHODS

const _leftStackIsEmpty = function () {
  return data.leftOprendStack.length === 0;
}; // end _leftStackIsEmpty

const _rightStackIsEmpty = function () {
  return data.rightOprendStack.length === 0;
}; // end _rightStackIsEmpty

const _resetLeftStack = function () {
  data.leftOprendStack = [];
}; // end _resetLeftStack

const _resetRightStack = function () {
  data.rightOprendStack = [];
}; // end _resetRightStack

const _copyLeftOprendToRight = function () {
  _incrementPosition();
  _setCurrentPosValue(_computeSpecialOp(data.leftOprendStack, 0));
}; // end _copyLeftOprendToRight

////// EXPRESSION METHODS

const _setCurrentPosition = function (pos) {
  data.curExpPos = pos;
}; // end _setCurrentPosition

const _getPositionInExpression = function () {
  return data.curExpPos;
}; // end _getPositionInExpression

const _getValueAt = function (pos) {
  return data.curExpression[pos];
}; // end _getValueAt

const _setCurrentPosValue = function (val) {
  data.curExpression[_getPositionInExpression()] = val;
}; // end _setCurrentPosValue

const _getCurrentPosValue = function () {
  return data.curExpression[_getPositionInExpression()];
}; // end _getCurrentPosValue

const _getExpressionLength = function () {
  return data.curExpression.length;
}; // end _getExpressionLength

const _expressionLengthIs = function (length) {
  return data.curExpression.length === length;
}; // end _expressionLengthIs

const _resetExpression = function () {
  data.curExpression = ['0'];
  _resetLeftStack();
  _resetRightStack();
  _setCurrentPosition(0);
}; // end _resetExpression

////// POSITION METHODS

const _incrementPosition = function () {
  data.curExpPos++;
}; // end _incrementPosition

const _resetData = function () {
  _setCurrentPosition(0);
  _resetExpression();
  _resetResult();
  _updateSolvedState(false);
}; // end _resetData

export const modelReset = function () {
  _resetData();
  state.result = '';
  state.expression = '';
  state.history = [];
};

/** HELPER METHODS */

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

/** ------------------------ OUTPUT SECTION ------------------------ */

// RESULTS/INPUT SUBSECTION

const _generateResultString = function (result) {
  if (isFinite(result)) {
    if (result.toString().length >= DISPLAY_LIMIT) {
      return removeTrailingZeros(Number.parseFloat(result).toExponential());
    }

    return removeTrailingZeros(bigDecimal.getPrettyValue(result));
  } else {
    return result;
  }
}; // end _generateResultString

const _generateInputString = function (input) {
  if (isFinite(input)) {
    return removeTrailingZeros(bigDecimal.getPrettyValue(input));
  } else {
    return input;
  }
}; // end _generateInputString

// EXPRESSION SUBSECTION
const _buildSpecialExpression = function (stack, oprend) {
  stack.forEach(action => {
    oprend = `${action !== 'inverse' ? action : '1/'}(${oprend})`;
  });
  return oprend;
}; // end _buildSpecialExpression

const _generateExpressionString = function () {
  let output = ' ';
  if (!_leftStackIsEmpty()) {
    output = _buildSpecialExpression(data.leftOprendStack, _getValueAt(0));
  } else {
    output = removeTrailingZeros(convertToExponential(_getValueAt(0)));
  }

  if (_getPositionInExpression() >= 1) {
    output += ` ${_getValueAt(1)} `;
  }

  if (_getPositionInExpression() === 2) {
    if (!_rightStackIsEmpty()) {
      output += _buildSpecialExpression(data.rightOprendStack, _getValueAt(2));
    } else {
      output += removeTrailingZeros(convertToExponential(_getValueAt(2)));
    } // end if
  } // end if

  return output;
}; // end generateExpressionString

/** ------------------------ HISTORY SECTION ------------------------ */

const _addToHistory = function () {
  state.history.push({ expression: state.expression, result: state.result });
}; // end _addToHistory

export const clearHistory = function () {
  state.history = [];
}; // end _clearHistory

/** ------------------------ CALCULATION SECTION ------------------------ */

/** CALCULATION METHODS */

const _computeSpecialOp = function (stack, pos) {
  let result = _getValueAt(pos);

  stack.forEach(action => {
    if (action === 'inverse') {
      result = Math.pow(result, -1);
    }
    if (action === 'sqrt') {
      result = Math.sqrt(result);
    }
    if (action === 'sqr') {
      result = Math.pow(result, 2);
    }
  }); // end forEach

  return result;
}; // end _computeSpecialOp

const _determineExpression = function () {
  let [oprendL, operator, oprendR] = data.curExpression;
  if (!_leftStackIsEmpty()) {
    oprendL = _computeSpecialOp(data.leftOprendStack, 0);
  }

  if (!_rightStackIsEmpty()) {
    oprendR = _computeSpecialOp(data.rightOprendStack, 2);
  }

  return [oprendL, operator, oprendR];
}; // end  _determineExpression

const _performSpecialOp = function (inputVal) {
  let result;
  if (_getPositionInExpression() === 0) {
    data.leftOprendStack.push(inputVal);
    result = _computeSpecialOp(data.leftOprendStack, 0);
  } // end if

  if (_getPositionInExpression() === 2) {
    data.rightOprendStack.push(inputVal);
    result = _computeSpecialOp(data.rightOprendStack, 2);
  } // end if

  return result;
}; // end _performSpecialOp

const _percent = function () {
  // if position 0 set to zero
  const pos = _getPositionInExpression();
  if (pos === 0) {
    _setCurrentPosValue('0');
    return ['0', _getCurrentPosValue()];
  }

  // if POS 1, copy left oprend to right oprend
  if (pos === 1) {
    _copyLeftOprendToRight();
  }
  // account for special operations
  const [leftOp, , rightOp] = _determineExpression();

  // (POS1 * POS2 / 100), Then set POS2 to result
  const result = bigDecimal.divide(
    bigDecimal.multiply(leftOp, rightOp),
    '100',
    2
  );
  _setCurrentPosValue(result);
  // if right position has special operators, clear
  _resetRightStack();

  return [result, _generateExpressionString()];
}; // end _percent

/** COMMAND METHODS */

const _negate = function () {
  // if current position is 1, do nothing
  if (_getPositionInExpression() === 1) {
    return [];
  }

  // if expression has already been solved, then clear expression and negate result
  if (_getSolvedState()) {
    _resetExpression();
    _setCurrentPosValue(_getResult());
    _resetResult();
    _updateSolvedState(false);
  }

  _setCurrentPosValue(bigDecimal.negate(_getCurrentPosValue()));

  return [_getCurrentPosValue()];
}; // end _negate

const _back = function () {
  // if current position is 1 do nothing
  if (_getPositionInExpression() === 1) {
    return [];
  }

  // if full expression solved
  // e.i the display contains a '=' sign
  // clear special stacks and expression, and display
  if (_getSolvedState()) {
    _resetExpression();
    return [, ' '];
  }

  // this is for special operations
  if (data.result) {
    return [];
  }

  // get current position value and remove a single char
  let curVal = _getCurrentPosValue();
  // if there is only a single char, turn it to 0
  if (curVal.length === 1) {
    curVal = '0';
  } else {
    // else remove last char
    curVal = curVal.slice(0, -1);
  }

  // update the current expression
  _setCurrentPosValue(curVal);
  //updated display Input
  return [_getCurrentPosValue()];
}; // end _back

const _clear = function () {
  _resetData();
  // return input and expression
  return [_getCurrentPosValue(), ' '];
}; // end _clear

const _clearEntry = function () {
  // if the current state is solved, clear all
  if (_getSolvedState()) {
    return _clear();
  }
  // don't clear operators
  if (_getPositionInExpression() !== 1) {
    _setCurrentPosValue('0');
  }

  return [_getCurrentPosValue()];
}; // end _clearEntry

const _solveOneOperator = function () {
  // if there is only a single oprend, then return itself
  if (_leftStackIsEmpty()) {
    return { result: _getValueAt(0), specialEvent: false, error: false };
  } else {
    // we set it to true, as this special case has occured
    return {
      result: _computeSpecialOp(data.leftOprendStack, 0),
      specialEvent: true,
      error: false,
    };
  }
}; // end _solveOneOperator

const _solveTwoOperatorOprend = function () {
  const [oprendL, operator, oprendR] = _determineExpression();
  if (operator === '/' && oprendR === '0') {
    //  error message Cannot divide by zero
    return { result: undefined };
  } // end guard

  // operator map
  const opMap = new Map([
    ['+', bigDecimal.add],
    ['-', bigDecimal.subtract],
    ['*', bigDecimal.multiply],
    ['/', bigDecimal.divide],
  ]);
  // compute results
  return { result: opMap.get(operator)(oprendL, oprendR) };
}; // end _solveTwoOperatorOprend

const _equalSign = function () {
  // special case, when user hits enter on solved
  // expression, use the result as the left hand oprend
  if (_getSolvedState()) {
    data.curExpression[0] = _getResult();
    _resetLeftStack();
  }

  // index 1 should always be the operator
  let results;
  if (_expressionLengthIs(1)) {
    results = _solveOneOperator();
  }

  // if there is only one oprend then make this oprend the 2nd one as well
  // then process as a full expression in next block
  if (_expressionLengthIs(2)) {
    _copyLeftOprendToRight();
  }

  // solve complete expression
  if (_expressionLengthIs(3)) {
    results = _solveTwoOperatorOprend();
  }

  let output = ' ';
  if (results.result !== undefined) {
    output = _generateExpressionString() + ' =';
    _setResult(results.result);
    // after getting results store in history
    // _addToHistory();
    _updateSolvedState(true);
  } else {
    _updateSolvedState(false);
    _resetData();
    output = 'Cannot divide by zero';
  } // end if

  if (results.result === Infinity) {
    _updateSolvedState(false);
    _resetData();
    output = 'Overflow';
  }

  // its a special event when the user tries to compute already solved special operator
  if (results.specialEvent) {
    // set left oprend to result
    data.curExpression[0] = results.result;
    // and clear any special operations
    _resetLeftStack();
  } // end if

  // update result display field
  return [results.result, output];
}; // end _equalSign

const _commandDelegatory = function (inputVal) {
  const cmdMap = new Map([
    ['clear', _clear],
    ['clear entry', _clearEntry],
    ['=', _equalSign],
    ['back', _back],
    ['+/-', _negate],
    ['%', _percent],
  ]);

  const cmd = cmdMap.get(inputVal);
  if (!cmd) {
    return;
  } // end of guard

  const [displayInput, displayExpression] = cmd();

  displayInput && (state.result = _generateResultString(displayInput));
  displayExpression && (state.expression = displayExpression);

  // update calc history
  // possibly refactor to deal with duplicating back cmd
  if (_getSolvedState() && inputVal !== 'back') {
    _addToHistory();
  }
}; // end commandDelegatory

/** Input Handlers METHODS */
const _numberDelegatory = function (inputVal) {
  // Check if expression already solved
  if (_getSolvedState()) {
    _resetData();
  }

  // if right hand oprend  & has special op -> replace
  if (_getPositionInExpression() === 2 && !_rightStackIsEmpty()) {
    _resetRightStack();
    _setCurrentPosition(1);
    // update expression display
    state.expression = _generateExpressionString();
  }
  // if result is defined and only input (special op)
  if (!_resultIsEmpty() && _getPositionInExpression() === 0) {
    // store to history
    _addToHistory();

    // reset result
    _resetResult();
    // reset expression
    _resetExpression();
  }

  // check if currently at operator
  if (_getPositionInExpression() === 1) {
    _incrementPosition();
    _setCurrentPosValue('0');
  }

  _setCurrentPosValue(_validateOprend(_getCurrentPosValue(), inputVal));

  state.result = _generateInputString(_getCurrentPosValue());
  // set the value in the calcDisplay
}; // end numberDelegatory

const _hasOperator = function (operators, inputVal) {
  data.curExpression.forEach(el => {
    if (operators.findIndex(op => op === el) > -1) {
      return true;
    }
  });
  return false;
}; // end _hasOperator

const _processOprend = function (inputVal) {
  _incrementPosition();
  _setCurrentPosValue(inputVal);
  // update current expression display
  state.expression = _generateExpressionString();
}; // end _processOprend

const _operatorDelegatory = function (inputVal) {
  // if the expression has been solved and the expression has been reset
  if (_getSolvedState() && _getPositionInExpression() === 0) {
    _setCurrentPosValue(_getResult());
    _updateSolvedState(false);
  }

  // so if expression is full
  if (_getPositionInExpression() === 2) {
    // compute result
    _commandDelegatory('=');
    // save the result as the first value, and add the operator to the expression
    _resetExpression();

    _setCurrentPosValue(data.result);
    _processOprend(inputVal);

    _updateSolvedState(false);
  }

  // if operator is 1st or 2nd input and is not already in expression
  if (
    !_hasOperator(OPERATORS, inputVal) &&
    // this.#curExpression.length < 2
    _getPositionInExpression() === 0
  ) {
    _processOprend(inputVal);
  }
}; // end operatorDelegatory

const _specialOpsDelegatory = function (inputVal) {
  if (_expressionLengthIs(3) && _getSolvedState()) {
    _resetExpression();
    _setCurrentPosValue(_getResult());
    _updateSolvedState(false);
  }

  if (_getSolvedState()) {
    _resetExpression();
    // in the event
    _updateSolvedState(false);
  }

  // if currently positioned on a operator,
  // take first left oprend and use it
  if (_expressionLengthIs(2)) {
    if (!_leftStackIsEmpty()) {
      data.curExpression.push(_getResult());
    } else {
      data.curExpression.push(_getValueAt(0));
    }

    _incrementPosition();
  }

  let output = ' ';
  let result;
  if (inputVal === 'inverse' && _getCurrentPosValue() === '0') {
    _resetData();
    output = '1/(0)';
    result = 'Cannot divide by zero';
  } else {
    result = _performSpecialOp(inputVal);
    output = _generateExpressionString();
    _setResult(result);
  }

  if (result === Infinity) {
    _resetData();
    result = 'Overflow';
    output = '';
  }

  state.result = _generateResultString(result);
  state.expression = output;
};

export const inputDelegatory = function (inputVal) {
  // check if button pressed is a number or decimal
  if (isFinite(inputVal) || inputVal === '.') {
    // set limit on input
    if (_getCurrentPosValue().length < INPUT_LIMIT) {
      _numberDelegatory(inputVal);
    }
  } // end number check if

  if (OPERATORS.includes(inputVal)) {
    _operatorDelegatory(inputVal);
  } // end of operator check

  const specialOps = ['sqrt', 'sqr', 'inverse'];
  if (specialOps.includes(inputVal)) {
    _specialOpsDelegatory(inputVal);
  } // end of special operation check

  // we can just run the commmand at the end for now
  _commandDelegatory(inputVal);

  /** TEST CODE */
  // console.log(data);
  // console.log(data.curExpression);
  // console.log(state);
  // console.log(_getSolvedState());
  // console.log(data.curExpPos);
}; // end inputDelegatory
