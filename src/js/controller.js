import toolView from './views/toolView.js';
import buttonView from './views/buttonView.js';
import historyView from './views/historyView.js';
import calcDisplayView from './views/calcDisplayView.js';

import * as standardModel from './models/standardModel.js';

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

const menuBtnPress = function () {
  console.log('Menu Change');
};

const initCalc = function () {
  toolView.setTool('Converter');
  // toolView.setTool('Standard');
  toolView.render();
  const Components = {
    calcDisplay: calcDisplayView,
    btnComp: buttonView,
    historyComp: historyView,
  };
  toolView.initComponents(Components);
  toolView.addHandlerNav(menuBtnPress);
  buttonView.addHandlerBtnPress(controlBtnPress);
  historyView.addHandlerClear(clearBtnPress);
}; // end initCalc

initCalc();

//DisplayView.render();
