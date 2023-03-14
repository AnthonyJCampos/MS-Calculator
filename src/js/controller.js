import toolView from './views/toolView.js';
import dropdownView from './views/dropdownView.js';
import calculator from '../tools/calculator.js';
import converter from '../tools/converter.js';

import { CONVERTER_TOOLS, CALCULATOR_TOOLS } from './config.js';

// 1) get layout

// 2) render layout

// 3) init components of tool

// 4) set event menu

function changeTool(tool, selection) {
  const renderPackage = tool.getLayoutPackage(selection);
  if (!renderPackage) {
    console.error('TOOL NOT FOUND');
  }

  toolView.render(renderPackage);
  toolView.initComponents(tool.getUniqueComponents());
  tool.initTool();
}

function menuBtnPress(selection) {
  if (CALCULATOR_TOOLS.has(selection)) {
    changeTool(calculator, selection);
  }

  if (CONVERTER_TOOLS.has(selection)) {
    changeTool(converter, selection);
  }

  toolView.render();
  /// development code
}

// when app first loads the tool is set to standard calculator
const initialInit = function () {
  // defualt is standard
  const renderPackage = calculator.getLayoutPackage();
  toolView.render(renderPackage);
  toolView.addHandlerNav();
  toolView.initComponents(calculator.getUniqueComponents());
  calculator.initTool();
  toolView.addHandlerMenuSelection(menuBtnPress);
};

initialInit();
