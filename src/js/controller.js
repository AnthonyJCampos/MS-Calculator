import toolView from './views/toolView.js';
import navView from './views/navView.js';
import calculator from '../tools/calculator.js';
import Converter from '../tools/converter.js';

import {
  CONVERTER_TOOLS_KEYS,
  CALCULATOR_TOOLS_KEYS,
  INITIAL_SETUP,
} from './config.js';

function changeTool(tool, selection) {
  // 1. get render package
  const { toolType, toolTitle, toolLayout } = tool.getLayoutPackage(selection);
  // 2. update main container layout to fit tool type, and update title listed in nav
  navView.update({ type: toolType, title: toolTitle });
  // 3. clear out the old tool layout and render new layout
  toolView.render(toolLayout);
  // 4. init the components required for the given tool
  toolView.initComponents(tool.getUniqueComponents());
  tool.initTool();
}

function menuBtnPress(selection) {
  // change tool to calculator
  if (CALCULATOR_TOOLS_KEYS.has(selection)) {
    changeTool(calculator, selection);
  }

  // change tool to converter
  if (CONVERTER_TOOLS_KEYS.has(selection)) {
    changeTool(new Converter(), selection);
  }
} // end menuBtnPress

// when app first loads the tool is set to standard calculator
const initialInit = function () {
  // defualt is calculator - standard
  navView.render(INITIAL_SETUP);
  navView.addHandlerNav();
  navView.addHandlerWindowClick();
  navView.addHandlerMenuSelection(menuBtnPress);
  const renderPackage = calculator.getLayoutPackage();
  toolView.render(renderPackage.toolLayout);
  toolView.initComponents(calculator.getUniqueComponents());
  calculator.initTool();
};

initialInit();
