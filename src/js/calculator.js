import buttonView from './views/buttonView.js';
import historyView from './views/historyView.js';
import calcDisplayView from './views/calcDisplayView.js';
import * as standardModel from './models/standardModel.js';

class Calculator {
  processButtonPadInput() {
    // 1. process input
    standardModel.inputDelegatory(btnVal);

    // 2. update tool display
    calcDisplayView.update(standardModel.state);

    // 3. update history display
    historyView.update(standardModel.state.history);
  } // end controlBtnPress

  clearBtnPress = function () {
    standardModel.clearHistory();
  };
  getUniqueComponents() {
    return { calcDisplay: calcDisplayView, historyComp: historyView };
  } // end getUniqueComponents
} // end of Calculator

export default new Calculator();
