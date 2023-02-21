import { LAYOUT_MAP } from '../config.js';
import View from './View.js';

class ToolView extends View {
  _parentEl = document.querySelector('.tool_container');
  _toolType = 'Standard';

  setTool(toolType = 'Standard') {
    this._toolType = toolType;
  } // end setTool

  _generateMarkup() {
    console.log(this._toolType);
    return `
      <nav class="nav">
        <div class="nav__drop"></div>
        <h2>${this._toolType}</h2>
      </nav>
      ${LAYOUT_MAP.get(this._toolType)}
      `;
  } // end generateMarkup
} // end ToolView

export default new ToolView();
