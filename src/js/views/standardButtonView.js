import ButtonView from './buttonView.js';
import CalcStandardCmdPadView from './calcStandardCmdPadView.js';
import CalcNumButtonView from './calcNumButtonView.js';

class StandardButtonView extends ButtonView {
  _parentEl = document.querySelector('.btn_container');

  _generateMarkup() {
    return `
    ${CalcStandardCmdPadView._generateButtons()}
    <div class="number_pad number_pad_standard">
      ${CalcNumButtonView._generateButtons()}
    </div>
    `;
  } // end generateMarkup
} // end StandardButtonView

export default new StandardButtonView();
