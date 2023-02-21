/** STATE FOR CONTROLLER */

export const state = {
  input: '',
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
    state.result = bigDecimal.getPrettyValue(result);
  }
}; // end _generateResultString

const _generateInputString = function (input) {
  if (isFinite(input)) {
    state.input = bigDecimal.getPrettyValue(input);
  } else {
    state.input = input;
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

/** PUBLIC METHODS */

export const inputDelegatory = function (inputVal) {
  const operators = ['/', '*', '-', '+'];

  // check if button pressed is a number or decimal
  if (isFinite(inputVal) || inputVal === '.') {
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
      _incremenetPosition();
      _setCurrentPosValue('0');
    }

    _setCurrentPosValue(_validateOprend(_getCurrentPosValue(), inputVal));

    // _updateDisplayInput(_getCurrentPosValue());
    _generateInputString(_getCurrentPosValue());
    // set the value in the calcDisplay
  } // end number check if

  // if (operators.includes(inputVal)) {
  //   // so if expression is full & there is a result
  //   // or if operator is 4th input process expression
  //   if (_getPositionInExpression() === 2) {
  //     // if operator is 4th input process expression
  //     !data.result && this._commandMap('=');
  //     // save the result as the first value, and add the operator to the expression
  //     _resetExpression();
  //     _setCurrentPosValue(data.result);
  //     _processOprend(inputVal);
  //   }
  //   // if operator is 1st or 2nd input and is not already in expression
  //   if (
  //     !this._hasOperator(operators, inputVal) &&
  //     // this.#curExpression.length < 2
  //     _getPositionInExpression() === 0
  //   ) {
  //     this._processOprend(inputVal);
  //   } // end if

  //   // if prev el is operator ignore
  // } // end if
}; // end inputDelegatory
