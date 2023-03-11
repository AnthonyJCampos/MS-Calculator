import converterButtonLayout from './converterButtonLayout.js';
import { dropdownIcon } from '../../img/icons.js';

const converterCmdLayout = `
  <button class="btn cmd" value="clear entry">CE</button>
  <button class="btn cmd" value="back">Back</button>`;

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
      <button class="converter_unit_dropdown ">
        Centimeters ${dropdownIcon}
      </button>  
    </div>
    <div class="convert_unit_section">
      <div class=" display_container display_container--converter">
      <p class="display_unit">0</p>
      </div>
      <button class="converter_unit_dropdown">
        Centimeters ${dropdownIcon}
      </button>  
    </div>
    <div class="convert_unit_section">
      <div class="display_container display_container--converter">
      <p class="display_unit">Stuff For Now</p>
      </div>
    </div>
    
    ${converterBtnLayout}
  </main>`;

export default converterLayout;
