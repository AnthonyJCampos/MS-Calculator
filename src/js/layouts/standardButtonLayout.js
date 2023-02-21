import StandardCmdLayout from './standardCmdLayout.js';
import CalcNumButtonLayout from './calcNumButtonLayout.js';

class StandardButtonLayout {
  _generateLayout() {
    return `
    ${StandardCmdLayout._generateButtons()}
    <div class="number_pad number_pad_standard">
      ${CalcNumButtonLayout._generateButtons()}
    </div>
    `;
  }
} // end StandardButtonLayout

export default new StandardButtonLayout();
