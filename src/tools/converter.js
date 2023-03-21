import buttonView from '../js/views/buttonView.js';
import DropdownUnitComponent from '../js/compenet/dropdownUnitComponent.js';
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
    const { dropdownElTop, dropdownElBottom } = this._getDropdownComponents();
    return {
      btnComp: buttonView,
      dropdownTop: dropdownElTop,
      dropdownBottom: dropdownElBottom,
    };
  } // end getUniqueComponents

  initTool(ToolType) {
    buttonView.addHandlerBtnPress(this._processButtonPadInput);
  }

  _getDropdownComponents() {
    // temp code
    const options = [
      'Nanometers',
      'Microns',
      'Millimeters',
      'Centimeter',
      'Meters',
      'Kilometers',
      'Inches',
      'Feet',
      'Yards',
      'Miles',
    ];

    const dropdownElTop = new DropdownUnitComponent('dropdown--1', options);
    const dropdownElBottom = new DropdownUnitComponent('dropdown--2', options);

    return { dropdownElTop, dropdownElBottom };
  } // end _initDropdownComponents

  _processButtonPadInput(btnVal) {
    console.log(btnVal);
  } // end controlBtnPress

  _initDropdownOptions() {}
} // end converter

export default new Converter();
