import { ExcelComponent } from '../../core/ExcelComponent';

class Toolbar extends ExcelComponent {
  static  className='excel-toolbar'
	constructor($root,options) {
		super(
			$root,
			{name:'Toolbar',listeners:['click'],...options}
			);
	}
	toHTML() {
		return `    <span class="material-icons button">format_align_left</span>
                <span class="material-icons button">format_align_center</span>
                <span class="material-icons button">format_align_right</span>
                <span class="material-icons button">format_bold</span>
                <span class="material-icons button">format_italic</span>
                <span class="material-icons button">format_underlined</span>`;
	}
	onClick(){

	}
}
export default Toolbar
