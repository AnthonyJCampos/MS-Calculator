import buttonView from '../js/views/buttonView.js';
import DropdownUnitComponent from '../js/components/dropdownUnitComponent.js';
import ConverterDisplayComponent from '../js/components/converterDisplayComponent.js';

import { CONVERTER_TOOLS_KEYS, CONVERTER_MODELS } from '../js/config.js';

class Converter {
  // current tool model that is in use
  _currentToolModel;
  _displayComponents = [];

  getLayoutPackage(toolSubType = CONVERTER_TOOLS_KEYS[0]) {
    // get tool model from current converter tools set in the config file
    this._currentToolModel = CONVERTER_MODELS.get(toolSubType);

    // update this later to throw and error
    if (!this._currentToolModel) {
      return;
    }

    // get layout from model
    const { layout } = this._currentToolModel.renderPackage;

    return {
      toolType: 'converter',
      toolTitle: toolSubType,
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

  initTool() {
    buttonView.addHandlerBtnPress(this._processButtonPadInput.bind(this));
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

  clearEvents() {
    this._dropdownElTop?.clearEvents();
    this._dropdownElBottom?.clearEvents();
  }
  _buildDropdownComponents() {
    // get models current options from its renderPackage
    const { options, firstUnitSelected, secondUnitSelected } =
      this._currentToolModel.renderPackage;
    this._dropdownElTop = new DropdownUnitComponent('dropdown--1', options);
    this._dropdownElBottom = new DropdownUnitComponent('dropdown--2', options);

    // set display units
    this._displayComponents.push(
      new ConverterDisplayComponent(
        'display_unit--0',
        this._currentToolModel.getActiveDisplay()
      )
    );

    this._displayComponents.push(
      new ConverterDisplayComponent(
        'display_unit--1',
        this._currentToolModel.getActiveDisplay()
      )
    );
  } // end _buildDropdownComponents

  _processDisplayClick(controlUnit) {
    // check if display unit is already active unit, if so do nothing
    if (this._currentToolModel.getActiveDisplay() === controlUnit) {
      return;
    } else {
      this._currentToolModel.setActiveDisplay(controlUnit);
    }

    this._displayComponents.forEach(displayComponent => {
      displayComponent.setActive(controlUnit);
    });
  } // end _processDisplayClick

  _processButtonPadInput(btnVal) {
    // 1. process input
    this._currentToolModel.inputDelegatory(btnVal);
    // 2. update active display with expression
    // 3. update non active display with result
    this._displayComponents.forEach(displayComponent => {
      displayComponent.update(this._currentToolModel.state);
    });
  } // end controlBtnPress

  _setFirstUnit(topVal) {
    this._currentToolModel.setFirstUnitType(topVal);
  }

  _setSecondUnit(botVal) {
    this._currentToolModel.setSecondUnitType(botVal);
  }
} // end converter

export default new Converter();
