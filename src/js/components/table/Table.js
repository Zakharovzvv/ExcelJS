import { ExcelComponent } from '../../core/ExcelComponent';
import createTable from './table.template'
import resizeHandler from "./table.resize";
import canResize from "./table.functions";

class Table extends ExcelComponent {
  static  className='excel-table'
  constructor($root) {
    super($root,{name:'Table',listeners:['mousedown']});
  }
  toHTML() {
    return createTable(20)
  }
  onMousedown(event){
    if (canResize(event)) {
      resizeHandler(this.$root, event)
    }
  }
}
export default Table
