import converterButtonLayout from './converterButtonLayout.js';
import { dropdownIcon } from '../../img/icons.js';

const converterBtnLayout = `
  <div class="btn_container btn_container--converter">
    ${converterButtonLayout}
  </div>`;

const converterLayout = `
  <main class="tool tool--converter">
    <div class="convert_unit_section">
      <div class=" display_container display_container--converter">
      <p class="display_unit">0</p>
      </div>
      <div class="dropdown dropdown--1">
        <button class="btn--unit">
          Centimeters ${dropdownIcon}
        </button> 
        <ul class="dropdown-content hidden">
          <li><button class="list_btn">Centimeters</button></li>
          <li><button class="list_btn">Millimeters</button></li>
        </ul> 
      </div>
    </div>
    <div class="convert_unit_section">
      <div class=" display_container display_container--converter">
      <p class="display_unit">0</p>
      </div>
      <div class="dropdown dropdown--2">
      <button class="btn--unit">
        Centimeters ${dropdownIcon}
      </button> 
      <ul class="dropdown-content hidden">
        <li><button class="list_btn">Centimeters</button></li>
        <li><button class="list_btn">Millimeters</button></li>
      </ul> 
    </div>
    </div>
    <div class="convert_unit_section">
      <div class="display_container display_container--converter">
      <p class="display_unit">Stuff For Now</p>
      </div>
    </div>
    ${converterBtnLayout}
  </main>`;

export default converterLayout;
