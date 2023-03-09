import calcNumButtonLayout from './calcNumButtonLayout.js';
import calcDisplayLayout from './calcDisplayLayout.js';
import historyLayout from './historyLayout.js';

const standardCmdLayout = `
  <button class="btn cmd" value="%">&percnt;</button>
  <button class="btn cmd" value="clear entry">CE</button>
  <button class="btn cmd" value="clear">C</button>
  <button class="btn cmd" value="back">Back</button>
  <button class="btn cmd" value="inverse">
    x<span class="standard_expo">-1</span>
  </button>
  <button class="btn cmd" value="sqr">
    x<span class="standard_expo">2</span>
  </button>
  <button class="btn cmd" value="sqrt">&Sqrt;</button>
  <button class="btn cmd" value="/">&divide;</button>
  <button class="btn cmd" value="*">&times;</button>
  <button class="btn cmd" value="-">&minus;</button>
  <button class="btn cmd" value="+">&plus;</button>
  <button class="btn cmd" value="=">&equals;</button>`;

const standardBtnLayout = `
  <div class="btn_container">
    ${standardCmdLayout}
    <div class="number_pad number_pad_standard">
      ${calcNumButtonLayout}
    </div>
  </div>`;

const standardLayout = `
  ${historyLayout}
  <main class="tool tool--standard">
    ${calcDisplayLayout}
    ${standardBtnLayout}
  </main>`;

export default standardLayout;
