import converterButtonLayout from './converterButtonLayout.js';

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
        Centimeters
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="svg_dropdown">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>  
    </div>
    <div class="convert_unit_section">
      <div class=" display_container display_container--converter">
      <p class="display_unit">0</p>
      </div>
      <button class="converter_unit_dropdown">
        Centimeters
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="svg_dropdown">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
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
