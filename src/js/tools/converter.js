import buttonView from '../views/buttonView.js';
import ApiComponent from '../components/apiComponent.js';
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
    this._buildComponents();
    return {
      btnComp: buttonView,
      dropdownTop: this._dropdownElTop,
      dropdownBottom: this._dropdownElBottom,
      apiComponent: this._apiComponent,
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

    this._apiComponent?.addHandlerClick(this._updateApi.bind(this));
  }

  _buildComponents() {
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

    const apiRenderData = converterModel.getApiRenderData();
    if (apiRenderData) {
      this._apiComponent = new ApiComponent('api_box', apiRenderData);
    }
  } // end _buildComponents

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
    // 1. set unit and update non-active display state
    converterModel.setFirstUnitType(topVal);
    this._displayComponents[converterModel.getNonActiveDisplay()].update(
      converterModel.state
    );

    // 2. if api converter update api example text
    this._apiComponent?.update(converterModel.getApiRenderData());
  }

  _setSecondUnit(botVal) {
    converterModel.setSecondUnitType(botVal);
    this._displayComponents[converterModel.getNonActiveDisplay()].update(
      converterModel.state
    );
    // 2. if api converter update api example text
    this._apiComponent?.update(converterModel.getApiRenderData());
  }

  async _updateApi() {
    // 1. update API data
    await converterModel.updateApi();
    // 2. update api component render details
    this._apiComponent.update(converterModel.getApiRenderData());
  }
} // end converter
