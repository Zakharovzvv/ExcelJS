import { ExcelComponent } from '../../core/ExcelComponent';
import createTable from './table.template'
class Table extends ExcelComponent {
  static  className='excel-table'
  constructor($root) {
    super($root,{name:'Table'});
  }
  toHTML() {
    return createTable(20)
  }
}
export default Table
