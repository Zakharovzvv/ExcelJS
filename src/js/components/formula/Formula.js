import { ExcelComponent } from '../../core/ExcelComponent';

class Formula extends ExcelComponent {
  static  className='excel-formula'
  constructor($root) {
    super($root,{name:'Formula', listeners:['input','click']});
  }
  toHTML() {
    return `   
                <div class="label">fx</div>
                <div class="formula" contenteditable="true" spellcheck="false"></div>

`;
  }
  onClick(){
    console.log('click');
  }
  onInput(){
    console.log('input');
  }
}
export default Formula
