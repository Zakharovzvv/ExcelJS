import { ExcelComponent } from '../../core/ExcelComponent';
import * as actions from '../../redux/actions';
import { defaultFileName, saveStateWait } from '../../constants';
import { debounce } from '../../core/utils';

class Header extends ExcelComponent {
  static  className='excel-header'
  constructor($root,options) {
    super(
      $root,
      {name:"Header",
        subscribe:['changeFileName'],
        listeners:['input'],
        ...options,
      }

      );
  }
  init() {
    super.init();
    this.$fileName=this.$root.find('#fileName')
  }
  prepare() {
    this.onInput=debounce(this.onInput,saveStateWait)
  }

  toHTML() {
    const filename= this.store.getState().fileName || defaultFileName;

    return `   
                <input type="text" class="file-name" id="file-name" value="${filename}">
                <div class="icons">
                    <span class="material-icons button">delete</span>
                    <span class="material-icons button">exit_to_app</span>
                </div>
`;
  }
  onInput({target}){
    this.$dispatch(actions.changeFileName({value:target.value}))
  }
}
export default Header
