import buttonView from '../views/buttonView.js';
import DropdownUnitComponent from '../components/dropdownUnitComponent.js';
import ConverterDisplayComponent from '../components/converterDisplayComponent.js';
import { CONVERTER_TOOLS_KEYS } from '../configs/config.js';

import * as converterModel from '../models/converterModel.js';

export default class Converter {
  // current tool model that is in use
  _currentToolModel;
  _displayComponents = [];

  getLayoutPackage(toolSubType = CONVERTER_TOOLS_KEYS[0]) {
    // reset state in event is was prev used
    converterModel.modelReset();

    // get tool model from current converter tools set in the config file
    if (!converterModel.setConverterType(toolSubType)) {
      return;
    }

    return {
      toolType: 'converter',
      toolTitle: toolSubType,
      toolLayout: converterModel.getLayout(),
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

  initTool() {
    // Safely add new events to be used by converter
    buttonView.addHandlerBtnPress(this._processButtonPadInput.bind(this));
    // buttonView.addHandlerBtnPress(this._processButtonPadInput);
    // init top unit dropdown
    this._dropdownElTop.addHandlerDropdownClicked();
    this._dropdownElTop.addHanlderOptionClick(this._setFirstUnit.bind(this));

    // init bottom unit dropdown
    this._dropdownElBottom.addHandlerDropdownClicked();
    this._dropdownElBottom.addHanlderOptionClick(
      this._setSecondUnit.bind(this)
    );

    this._displayComponents.forEach(displayComponent => {
      displayComponent.addHandlerClick(this._processDisplayClick.bind(this));
    });
  }

  _buildDropdownComponents() {
    // get models current options from its renderPackage
    const options = converterModel.getOptions();
    converterModel.setStateInitialOptions(options[0]);
    this._dropdownElTop = new DropdownUnitComponent('dropdown--1', options);
    this._dropdownElBottom = new DropdownUnitComponent('dropdown--2', options);

    // set display units
    this._displayComponents.push(
      new ConverterDisplayComponent(
        'display_unit--0',
        converterModel.getActiveDisplay()
      )
    );

    this._displayComponents.push(
      new ConverterDisplayComponent(
        'display_unit--1',
        converterModel.getActiveDisplay()
      )
    );
  } // end _buildDropdownComponents

  _processDisplayClick(controlUnit) {
    // check if display unit is already active unit, if so do nothing
    if (converterModel.getActiveDisplay() === controlUnit) {
      return;
    } else {
      converterModel.setActiveDisplay(controlUnit);
    }

    this._displayComponents.forEach(displayComponent => {
      displayComponent.setActive(controlUnit);
    });
  } // end _processDisplayClick

  _processButtonPadInput(btnVal) {
    // 1. process input
    converterModel.inputDelegatory(btnVal);
    // 2. update active display with expression
    // 3. update non active display with result
    this._displayComponents.forEach(displayComponent => {
      displayComponent.update(converterModel.state);
    });
  } // end controlBtnPress

  _setFirstUnit(topVal) {
    converterModel.setFirstUnitType(topVal);
    this._displayComponents[converterModel.getNonActiveDisplay()].update(
      converterModel.state
    );
  }

  _setSecondUnit(botVal) {
    converterModel.setSecondUnitType(botVal);
    this._displayComponents[converterModel.getNonActiveDisplay()].update(
      converterModel.state
    );
  }
} // end converter
