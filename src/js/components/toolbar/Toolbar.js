import { toolbarTemplate } from './toolbar.template';
import ExcelStateComponent from '../../core/ExcelStateComponent';
import { $ } from '../../core/dom';
import { defaultCellStyles } from '../../constants';

class Toolbar extends ExcelStateComponent {
	static className = 'excel-toolbar';

	constructor($root, options) {
		super(
			$root,
			{
				name: 'Toolbar',
				listeners: ['click'],
				subscribe: ['changeStyles'],
				...options,
			},
		);
	}

	prepare() {
		this.initState(defaultCellStyles);
	}

	get template() {
		return toolbarTemplate(this.state);
	}

	toHTML() {
		return this.template;
	}

	init() {
		super.init();
		this.$on('table:select', (data) => {
			this.setState(data.styles);
		});
	}

	// storeChanged(changes) {
	//	  this.setState(changes.currentStyles)
	// }

	onClick(e) {
		const $target = $(e.target);
		if ($target.data().type === 'button') {
			const value = JSON.parse($target.data().value);

			const key = Object.keys(value)[0];
			this.setState({ [key]: value[key] });

			this.$emit('toolbar:changeState', this.state);
		}
	}
}

export default Toolbar;
