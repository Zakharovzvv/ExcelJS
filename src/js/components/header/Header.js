import { ExcelComponent } from '../../core/ExcelComponent';
import * as actions from '../../redux/actions';
import { defaultFileName, saveStateWait } from '../../constants';
import { debounce } from '../../core/utils';
import ActiveRoute from '../../routes/ActiveRoute';
import { $ } from '../../core/dom';

class Header extends ExcelComponent {
	static className = 'excel-header';

	constructor($root, options) {
		super(
			$root,
			{
				name: 'Header',
				subscribe: ['changeFileName'],
				listeners: ['input', 'click'],
				...options,
			},
		);
	}

	init() {
		super.init();
		this.$fileName = this.$root.find('#fileName');
	}

	prepare() {
		this.onInput = debounce(this.onInput, saveStateWait);
	}

	toHTML() {
		const filename = this.store.getState().fileName || defaultFileName;

		return `   
                <input type="text" class="file-name" id="file-name" value="${filename}">
                <div class="icons">
                    <span class="material-icons button" data-type="delete">delete</span>
                    <span class="material-icons button" data-type="exit">exit_to_app</span>
                </div>
`;
	}

	onInput({ target }) {
		this.$dispatch(actions.changeFileName({ value: target.value }));
	}

	onClick({ target }) {
		if ($(target)
			.data().type === 'delete') {
			// eslint-disable-next-line no-restricted-globals
			const decision = confirm('Are you sure delete this table?');
			if (decision) {
				localStorage.removeItem(`excel:${ActiveRoute.param}`);
				ActiveRoute.navigate('');
			}
		} else if (($(target)
			.data().type === 'exit')) {
			ActiveRoute.navigate('');
		}
	}
}

export default Header;
