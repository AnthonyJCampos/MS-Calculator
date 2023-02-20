import View from './View.js';
import HistoryView from './historyView.js';
import CalcDisplayView from './calcDisplayView.js';
import StandardButtonView from './standardButtonView.js';

class StandardToolView extends View {
  _parentEl = document.querySelector('.tool_container');

  _generateMarkup() {
    return `
      <nav class="nav">
        <div class="nav__drop"></div>
        <h2>Standard</h2>
      </nav>
      <aside class="history">
      </aside>
      <main class="standard_container">
        <div class="display_container">
        </div>
        <div class="btn_container">
          </div>
        </div>
      </main>`;
  } // end generateMarkup

  generateComponents() {
    HistoryView.render();
    CalcDisplayView.render();
    StandardButtonView.render();
  } // end generateCompenets
} // end StandardToolView

export default new StandardToolView();
