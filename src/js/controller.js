import toolView from './views/toolView.js';
import buttonView from './views/buttonView.js';
import dropdownView from './views/dropdownView.js';
import historyView from './views/historyView.js';
import calcDisplayView from './views/calcDisplayView.js';
import * as standardModel from './models/standardModel.js';

// when app first loads the tool is set to standard calculator

const controlBtnPress = function (btnVal) {
  // 1. process input
  standardModel.inputDelegatory(btnVal);

  // 2. update tool display
  calcDisplayView.update(standardModel.state);

  // 3. update history display
  historyView.update(standardModel.state.history);
}; // end controlBtnPress

const clearBtnPress = function () {
  standardModel.clearHistory();
};

const menuBtnPress = function (selection) {
  toolView.setTool(selection);
  toolView.render();
  /// development code
};

const initCalc = function () {
  // toolView.setTool('Length');
  toolView.setTool('Standard');
  toolView.render();
  const Components = {
    calcDisplay: calcDisplayView,
    btnComp: buttonView,
    historyComp: historyView,
  };
  toolView.initComponents(Components);
  toolView.addHandlerMenuSelection(menuBtnPress);
  buttonView.addHandlerBtnPress(controlBtnPress);
  historyView.addHandlerClear(clearBtnPress);
}; // end initCalc

initCalc();
