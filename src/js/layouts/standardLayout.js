import calcNumButtonLayout from './calcNumButtonLayout.js';
import calcDisplayLayout from './calcDisplayLayout.js';
import historyLayout from './historyLayout.js';
import { backIcon } from '../../img/icons.js';

const standardCmdLayout = `
  <button class="btn" value="%">&percnt;</button>
  <button class="btn" value="clear entry">CE</button>
  <button class="btn" value="clear">C</button>
  <button class="btn btn--svg" value="back">${backIcon}</button>
  <button class="btn" value="inverse">
    x<span class="expo--standard">-1</span>
  </button>
  <button class="btn cmd" value="sqr">
    x<span class="expo--standard">2</span>
  </button>
  <button class="btn" value="sqrt">&Sqrt;</button>
  <button class="btn" value="/">&divide;</button>
  <button class="btn" value="*">&times;</button>
  <button class="btn" value="-">&minus;</button>
  <button class="btn" value="+">&plus;</button>
  <button class="btn" value="=">&equals;</button>`;

const standardBtnLayout = `
  <div class="btn_container">
    ${standardCmdLayout}
    <div class="number_pad number_pad--standard">
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
