import StandardCmdLayout from './standardCmdLayout.js';
import CalcNumButtonLayout from './calcNumButtonLayout.js';

const standardBtnLayout = `
${StandardCmdLayout._generateButtons()}
<div class="number_pad number_pad_standard">
  ${CalcNumButtonLayout._generateButtons()}
</div>
`;

export default standardBtnLayout;
