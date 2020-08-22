import { ExcelComponent } from '../../core/ExcelComponent';

class Header extends ExcelComponent {
  static  className='excel-header'
  constructor($root) {
    super($root,{name:"Header"});
  }
  toHTML() {
    return `   
                <input type="text" class="file-name">
                <div class="icons">
                    <span class="material-icons button">delete</span>
                    <span class="material-icons button">exit_to_app</span>
                </div>
`;
  }
}
export default Header