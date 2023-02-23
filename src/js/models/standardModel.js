/** STATE FOR CONTROLLER */

'use strict';

export const state = {
  result: '',
  expression: '',
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

/** HELPER METHODS */

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

const _getSolvedState = function () {
  return data.solvedFlag;
}; // end _getSolvedState

const _updateSolvedState = function (bool) {
  data.solvedFlag = bool;
}; // end _updateSolvedState

const _setCurrentPosition = function (pos) {
  data.curExpPos = pos;
}; // end _setCurrentPosition

const _getPositionInExpression = function () {
  return data.curExpPos;
}; // end _getPositionInExpression

const _incrementPosition = function () {
  data.curExpPos++;
}; // end _incrementPosition

const _setCurrentPosValue = function (val) {
  data.curExpression[_getPositionInExpression()] = val;
}; // end _setCurrentPosValue

const _getCurrentPosValue = function () {
  return data.curExpression[_getPositionInExpression()];
}; // end _getCurrentPosValue

const _resetExpression = function () {
  data.curExpression = ['0'];
  data.leftOprendStack = [];
  data.rightOprendStack = [];
  data.setCurrentPosition(0);
}; // end _resetExpression

const _leftStackIsEmpty = function () {
  return data.leftOprendStack.length === 0;
}; // end _leftStackIsEmpty

const _rightStackIsEmpty = function () {
  return data.rightOprendStack.length === 0;
}; // end _rightStackIsEmpty

const _resetData = function () {
  data.curExpPos = 0;
  data.curExpression = ['0'];
  data.leftOprendStack = [];
  data.rightOprendStack = [];
  data.result = undefined;
  data.solvedFlag = false;
}; // end _resetData

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
    return bigDecimal.getPrettyValue(result);
  }
}; // end _generateResultString

const _generateInputString = function (input) {
  if (isFinite(input)) {
    return bigDecimal.getPrettyValue(input);
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
    output = _buildSpecialExpression(
      data.leftOprendStack,
      data.curExpression[0]
    );
  } else {
    output = data.curExpression[0];
  }

  if (_getPositionInExpression() >= 1) {
    output += ` ${data.curExpression[1]} `;
  }

  if (_getPositionInExpression() === 2) {
    if (!_rightStackIsEmpty()) {
      output += _buildSpecialExpression(
        data.rightOprendStack,
        data.curExpression[2]
      );
    } else {
      output += data.curExpression[2];
    } // end if
  } // end if

  return output;
}; // end generateExpressionString

/** CALCULATION METHODS */

const _computeSpecialOp = function () {
  let result = data.curExpression[pos];
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
  if (data.curExpPos === 0) {
    data.leftOprendStack.push(inputVal);
    result = _computeSpecialOp(data.leftOprendStack, 0);
  } // end if

  if (data.curExpPos === 2) {
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
    _incrementPosition();
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
  data.rightOprendStack = [];

  return [result, _generateExpressionString()];
}; // end _percent

/** COMMAND METHODS */

const _negate = function () {
  // if current position is 1, do nothing
  if (data.curExpPos === 1) {
    return [];
  }

  // data.curExpression[data.curExpPos] = bigDecimal.negate(
  //   data.curExpression[data.curExpPos]
  // );

  _setCurrentPosValue(bigDecimal.negate(_getCurrentPosValue()));

  //this._updateDisplayInput(this.#curExpression[this.#curExpPos]);
  return [_getCurrentPosValue()];
}; // end _negate

const _back = function () {
  // if current position is 1 do nothing
  if (data.curExpPos === 1) {
    return [];
  }

  // if full expression solved
  // e.i the display contains a '=' sign
  // clear special stacks, and display
  if (_getSolvedState()) {
    _updateSolvedState(false);
    data.leftOprendStack = [];
    data.rightOprendStack = [];
    //this._updateDisplayExpress("");
    return [, ' '];
  }

  // this is for special operations
  if (data.calcResult) {
    return [];
  }

  // get current position value and remove a single char
  // let curVal = this.#curExpression[this.#curExpPos];
  let curVal = _getCurrentPosValue();
  // if there is only a single char, turn it to 0
  if (curVal.length === 1) {
    curVal = '0';
  } else {
    // else remove last char
    curVal = curVal.slice(0, -1);
  }

  // update the current expression
  // this.#curExpression[this.#curExpPos] = curVal;
  _setCurrentPosValue(curVal);
  //updated display Input
  //this._updateDisplayInput(curVal);
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
    //this._clear();
    return _clear();
  }
  // don't clear operators
  if (data.curExpPos !== 1) {
    // this.#curExpression[this.#curExpPos] = "0";
    _setCurrentPosValue('0');
  }

  //this._updateDisplayInput("0");
  return [_getCurrentPosValue()];
}; // end _clearEntry

const _calcInput = function () {
  const expression = data.curExpression;
  const opMap = new Map([
    ['+', bigDecimal.add],
    ['-', bigDecimal.subtract],
    ['*', bigDecimal.multiply],
    ['/', bigDecimal.divide],
  ]);

  let result;
  // its a special event when the user tries to compute already solved special operator
  let specialEvent = false;
  // index 1 should always be the operator
  if (expression.length === 1) {
    // if there is only a single oprend, then return itself

    if (_leftStackIsEmpty()) {
      result = expression[0];
    } else {
      result = _computeSpecialOp(data.leftOprendStack, 0);
      // we set it to true, as this special case has occured
      specialEvent = true;
    }
  } // end if

  if (expression.length === 2) {
    // if there is only one oprend then make this oprend the 2nd one as well
    //expression.push(expression[0]);
    _copyLeftOprendToRight();
  }

  let error = false;
  if (expression.length === 3) {
    const [oprendL, operator, oprendR] = _determineExpression();

    if (operator === '/' && oprendR === '0') {
      // display error message
      error = true;
      result = 'Cannot divide by zero';
    }

    if (!error) {
      // compute results
      result = opMap.get(operator)(oprendL, oprendR);
    }
  }

  let output = ' ';
  if (!error) {
    output = _generateExpressionString() + ' =';
    // this.#calcResult = result;
    _setResult(result);
    // after getting results store in history
    // this._addToHistory();
    _updateSolvedState(true);
  } else {
    _updateSolvedState(false);
    _resetData();
  } // end if

  // update result display field
  //this._updateDisplayInput(result);
  //this._updateDisplayExpress(output);

  // take care of special event
  if (specialEvent) {
    // set left oprend to result
    expression[0] = result;
    // and clear any special operations
    data.leftOprendStack = [];
  } // end if

  // update result display field
  return [result, output];
}; // end _calcInput

const _commandDelegatory = function (inputVal) {
  const cmdMap = new Map([
    ['clear', _clear],
    ['clear entry', _clearEntry],
    ['=', _calcInput],
    ['back', _back],
    ['+/-', _negate],
    ['%', _percent],
  ]);

  const cmd = cmdMap.get(inputVal);
  /** TEST CODE */
  console.log(cmd);
  if (!cmd) {
    return;
  } // end of guard

  // const [displayInput, displayExpression] = cmd();

  /** TEST CODE */
  // console.log(displayInput, displayExpression);
  // displayInput && this._updateDisplayInput(displayInput);
  // displayExpression && this._updateDisplayExpress(displayExpression);
}; // end commandDelegatory

/** Input Handlers METHODS */
const _numberDelegatory = function (inputVal) {
  // Check if expression already solved
  if (_getSolvedState()) {
    _resetData();
  }

  // if right hand oprend  & has special op -> replace
  if (_getPositionInExpression() === 2 && !_rightStackIsEmpty()) {
    data.rightOprendStack = [];
    _setCurrentPosition(1);
    // update expression display
    // _updateDisplayExpress(this._output());
    state.expression = _generateExpressionString();
  }
  // if result is defined and only input (special op)
  if (!_resultIsEmpty() && _getPositionInExpression() === 0) {
    // store to history
    // this._addToHistory();

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

  // _updateDisplayInput(_getCurrentPosValue());
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
  // this.#curExpression[++this.#curExpPos] = inputVal;
  _incrementPosition();
  _setCurrentPosValue(inputVal);
  // update current expression display
  state.expression = _generateExpressionString();
}; // end _processOprend

const _operatorDelegatory = function (inputVal) {
  /** Refactored Code */
  // so if expression is full & there is a result
  // or if operator is 4th input process expression
  if (_getPositionInExpression() === 2) {
    // if operator is 4th input process expression
    !data.calcResult && _commandDelegatory('=');
    // save the result as the first value, and add the operator to the expression
    _resetExpression();
    _setCurrentPosValue(data.calcResult);
    _processOprend(inputVal);
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
  // if currently positioned on a operator,
  // take first left oprend and use it
  if (data.curExpPos === 1) {
    if (!_leftStackIsEmpty()) {
      data.curExpression.push(data.calcResult);
    } else {
      data.curExpression.push(data.curExpression[0]);
    }
    // this.#curExpPos++;
    _incrementPosition();
  }

  let output = ' ';
  let result;
  if (
    inputVal === 'inverse' &&
    // this.#curExpression[this.#curExpPos] === "0"
    _getCurrentPosValue() === '0'
  ) {
    _resetData();
    output = '1/(0)';
    result = 'Cannot divide by zero';
  } else {
    result = _performSpecialOp(inputVal);
    output = _generateExpressionString();
    // this.#calcResult = result;
    _setResult(result);
  }
  // this._updateDisplayInput(result);
  // this._updateDisplayExpress(output);
  state.result = result;
  state.expression = output;
};

export const inputDelegatory = function (inputVal) {
  // check if button pressed is a number or decimal
  if (isFinite(inputVal) || inputVal === '.') {
    _numberDelegatory(inputVal);
  } // end number check if

  if (OPERATORS.includes(inputVal)) {
    _operatorDelegatory(inputVal);
  } // end of operator check

  const specialOps = ['sqrt', 'sqr', 'inverse'];
  if (specialOps.includes(inputVal)) {
    _specialOpsDelegatory(inputVal);
  } // end of special operation check

  // we can just run the commmand at the end for now
  // this._commandMap(inputVal);
  _commandDelegatory(inputVal);
}; // end inputDelegatory
