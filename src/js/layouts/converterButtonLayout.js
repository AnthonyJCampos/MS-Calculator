import { backIcon } from '../../img/icons.js';

const converterButtonLayout = `
<div class="btn_spacer"></div>
<button class="btn cmd btn--converter" value="clear entry">CE</button>
<button class="btn cmd btn--converter" value="back">${backIcon}
</button>
<button class="btn number btn--converter" value="7">7</button>
<button class="btn number" value="8">8</button>
<button class="btn number" value="9">9</button>
<button class="btn number" value="4">4</button>
<button class="btn number" value="5">5</button>
<button class="btn number" value="6">6</button>
<button class="btn number" value="1">1</button>
<button class="btn number" value="2">2</button>
<button class="btn number" value="3">3</button>
<div class="btn_spacer"></div>
<button class="btn number" value="0">0</button>
<button class="btn number" value=".">.</button>
`;

export default converterButtonLayout;
