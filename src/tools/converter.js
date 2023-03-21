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
    this._buildDropdownComponents();
    return {
      btnComp: buttonView,
      dropdownTop: this._dropdownElTop,
      dropdownBottom: this._dropdownElBottom,
    };
  } // end getUniqueComponents

  initTool(ToolType) {
    buttonView.addHandlerBtnPress(this._processButtonPadInput);
    this._dropdownElTop._addHandlerDropdownClicked();
    this._dropdownElBottom._addHandlerDropdownClicked();
  }

  clearEvents() {
    this._dropdownElTop?.clearEvents();
    this._dropdownElBottom?.clearEvents();
  }
  _buildDropdownComponents() {
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

    this._dropdownElTop = new DropdownUnitComponent('dropdown--1', options);
    this._dropdownElBottom = new DropdownUnitComponent('dropdown--2', options);
  } // end _buildDropdownComponents

  _processButtonPadInput(btnVal) {
    console.log(btnVal);
  } // end controlBtnPress
} // end converter

export default new Converter();
