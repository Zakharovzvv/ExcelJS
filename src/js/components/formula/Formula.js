import { ExcelComponent } from '../../core/ExcelComponent';
import {$} from '../../core/dom'

class Formula extends ExcelComponent {
  static  className='excel-formula'
  constructor($root, options) {
    super(
      $root,
      {name:'Formula',
        listeners:['input','keydown'],
        ...options}
        );
  }
  toHTML() {
    return `   
                <div class="label">fx</div>
                <div id="formula" class="formula" contenteditable="true" spellcheck="false"></div>

`;
  }
 init(){
    super.init()
   this.$formula=this.$root.find('#formula')
   this.$on('table:input',$cell=>{this.fillFormulaValue($cell)})
   this.$on('table:select',$cell=>{this.fillFormulaValue($cell)})
 }
 fillFormulaValue($cell){
   this.$formula.text($cell.text())
 }
  onInput({target}){
    this.$emit('formula:input',$(target).text())
  }
  onKeydown(event){
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }}
export default Formula
