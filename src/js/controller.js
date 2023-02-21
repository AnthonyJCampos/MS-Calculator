import toolView from './views/toolView.js';
import buttonView from './views/buttonView.js';
import historyView from './views/historyView.js';
import calcDisplayView from './views/calcDisplayView.js';

import * as standardModel from './models/standardModel.js';

const controlBtnPress = function (btnVal) {
  console.log(btnVal);
  standardModel.inputDelegatory(btnVal);
  console.log(standardModel.state);
}; // end controlBtnPress

const initCalc = function () {
  toolView.render();
  const Components = {
    calcDisplay: calcDisplayView,
    btnComp: buttonView,
    historyComp: historyView,
  };
  toolView.initComponents(Components);
  buttonView.addHandlerBtnPress(controlBtnPress);
}; // end initCalc

initCalc();

//DisplayView.render();
