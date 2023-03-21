import buttonView from '../js/views/buttonView.js';
import dropdownView from '../js/views/dropdownView.js';
import converterLayout from '../js/layouts/converterLayout.js';

import { LENGTH_OPTIONS } from '../js/config.js';

class Converter {
  getLayoutPackage(layoutString = 'Length') {
    const layoutMap = new Map([['Length', converterLayout]]);

    const layout = layoutMap.get(layoutString);

    if (!layout) {
      return;
    }

    return {
      toolType: 'converter',
      toolTitle: layoutString,
      toolLayout: layout,
    };
  } // end getLayout

  getUniqueComponents() {
    return {
      btnComp: buttonView,
    };
  } // end getUniqueComponents

  initTool(ToolType) {
    buttonView.addHandlerBtnPress(this._processButtonPadInput);
  }

  _setOptions() {} // end _setOptions

  _processButtonPadInput(btnVal) {
    console.log(btnVal);
  } // end controlBtnPress

  _initDropdownOptions() {}
} // end converter

export default new Converter();
