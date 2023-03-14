import buttonView from '../js/views/buttonView.js';
import converterLayout from '../js/layouts/converterLayout.js';

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

  _processButtonPadInput(btnVal) {
    console.log(btnVal);
  } // end controlBtnPress
} // end converter

export default new Converter();
