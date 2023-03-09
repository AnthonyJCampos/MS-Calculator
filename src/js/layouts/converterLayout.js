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
    ${converterBtnLayout}
  </main>`;

export default converterLayout;
