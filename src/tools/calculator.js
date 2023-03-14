import buttonView from '../js/views/buttonView.js';
import historyView from '../js/views/historyView.js';
import calcDisplayView from '../js/views/calcDisplayView.js';
import * as standardModel from '../js/models/standardModel.js';
import standardLayout from '../js/layouts/standardLayout.js';

class Calculator {
  getLayoutPackage(layoutString = 'Standard') {
    const layoutMap = new Map([['Standard', standardLayout]]);

    const layout = layoutMap.get(layoutString);

    if (!layout) {
      return;
    }

    return {
      toolType: 'calculator',
      toolTitle: layoutString,
      toolLayout: layout,
    };
  } // end getLayout

  getUniqueComponents() {
    return {
      calcDisplay: calcDisplayView,
      historyComp: historyView,
      btnComp: buttonView,
    };
  } // end getUniqueComponents

  initTool(ToolType) {
    buttonView.addHandlerBtnPress(this._processButtonPadInput);
    historyView.addHandlerClear(this._clearBtnPress);
  }

  _processButtonPadInput(btnVal) {
    // 1. process input
    standardModel.inputDelegatory(btnVal);

    // 2. update tool display
    calcDisplayView.update(standardModel.state);

    // 3. update history display
    historyView.update(standardModel.state.history);
  } // end controlBtnPress

  _clearBtnPress = function () {
    standardModel.clearHistory();
  };
} // end of Calculator

export default new Calculator();
