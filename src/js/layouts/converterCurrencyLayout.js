import converterButtonLayout from './converterButtonLayout.js';
import { dropdownIcon } from '../../img/icons.js';

const converterBtnLayout = `
  <div class="btn_container btn_container--converter">
    ${converterButtonLayout}
  </div>`;

const converterCurrencyLayout = `
  <main class="tool tool--converter">
    <div class="convert_unit_section">
      <div class="display_container display_container--converter" id="display_unit--0">
      <p class="display_unit">0</p>
      </div>
      <div class="dropdown dropdown--1">
        <button class="btn--unit">
          United States - Dollar ${dropdownIcon}
        </button> 
        <ul class="dropdown-content hidden">
          <li><button class="list_btn">Centimeters</button></li>
          <li><button class="list_btn">Millimeters</button></li>
        </ul> 
      </div>
    </div>
    <div class="convert_unit_section">
      <div class="display_container display_container--converter" id="display_unit--1">
      <p class="display_unit">0</p>
      </div>
      <div class="dropdown dropdown--2">
      <button class="btn--unit">
        Europe - Euro ${dropdownIcon}
      </button> 
      <ul class="dropdown-content hidden">
        <li><button class="list_btn">Centimeters</button></li>
        <li><button class="list_btn">Millimeters</button></li>
      </ul> 
    </div>
    <div class="api_box">
      <p class="api_example">1 USD = 0.9109 EUR</p>
      <p class="api_timestamp">Updated 4/21/2023 10:19 AM</p>
      <button class="btn btn--api" title="Update Currency Rates" aria-label="Update Currency Rates">Update Rates</button>
    </div>
    </div>
    ${converterBtnLayout}
  </main>`;

export default converterCurrencyLayout;
