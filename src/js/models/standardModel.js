export const state = {
  curExpression: ['0'],
  curExpPos: 0,
  result: undefined,
  solvedFlag: false,

  leftOprendStack: [],
  rightOprendStack: [],
};

/** HELPER METHODS */

const _setResult = function (val) {
  state.result = val;
}; // end _setResult

const _getResult = function () {
  return state.result;
}; // end _getResult

const _resultIsEmpty = function () {
  return state.result === undefined;
}; // end _resultIsEmpty

const _resetResult = function () {
  state.result = undefined;
}; // end _resetResult

const _getSolvedState = function () {
  return state.solvedFlag;
}; // end _getSolvedState

const _updateSolvedState = function (bool) {
  state.solvedFlag = bool;
}; // end _updateSolvedState

const _setCurrentPosition = function (pos) {
  state.curExpPos = pos;
}; // end _setCurrentPosition

const _getPositionInExpression = function () {
  return state.curExpPos;
}; // end _getPositionInExpression

const _incrementPosition = function () {
  state.curExpPos++;
}; // end _incrementPosition

const _setCurrentPosValue = function (val) {
  state.curExpression[_getPositionInExpression()] = val;
}; // end _setCurrentPosValue

const _getCurrentPosValue = function () {
  return state.curExpression[_getPositionInExpression()];
}; // end _getCurrentPosValue

const _resetExpression = function () {
  state.curExpression = ['0'];
  state.leftOprendStack = [];
  state.rightOprendStack = [];
  state.setCurrentPosition(0);
}; // end _resetExpression

const _leftStackIsEmpty = function () {
  return state.leftOprendStack.length === 0;
}; // end _leftStackIsEmpty

const _rightStackIsEmpty = function () {
  return state.rightOprendStack.length === 0;
}; // end _rightStackIsEmpty

const _resetData = function () {
  state.curExpPos = 0;
  state.curExpression = ['0'];
  state.leftOprendStack = [];
  state.rightOprendStack = [];
  state.result = undefined;
  state.solvedFlag = false;
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
      state.rightOprendStack = [];
      _setCurrentPosition(1);
      // update expression display
      this._updateDisplayExpress(this._output());
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
      //this.#curExpression[this.#curExpPos] = "0";
    }

    // const curVal = this.#curExpression[this.#curExpPos];
    _setCurrentPosValue(_validateOprend(_getCurrentPosValue(), inputVal));

    this._updateDisplayInput(_getCurrentPosValue());
    // set the value in the calcDisplay
  }

  if (operators.includes(inputVal)) {
    /** Refactored Code */
    // so if expression is full & there is a result
    // or if operator is 4th input process expression
    if (_getPositionInExpression() === 2) {
      // if operator is 4th input process expression
      !state.result && this._commandMap('=');
      // save the result as the first value, and add the operator to the expression
      _resetExpression();
      _setCurrentPosValue(state.result);
      _processOprend(inputVal);
    }
    // if operator is 1st or 2nd input and is not already in expression
    if (
      !this._hasOperator(operators, inputVal) &&
      // this.#curExpression.length < 2
      _getPositionInExpression() === 0
    ) {
      this._processOprend(inputVal);
    } // end if

    // if prev el is operator ignore
  } // end if
};
