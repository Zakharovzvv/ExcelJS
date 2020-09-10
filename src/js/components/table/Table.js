import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import resizeHandler from './table.resize';
import {
	canResize, isCell, matrix, nextSelector, setColWidth,
} from './table.functions';
import { $ } from '../../core/dom';
import TableSelection from './TableSelection';
import * as actions from '../../redux/actions';
import { evaluateExpression } from '../../core/utils';
import { defaultCellStyles } from '../../constants';

class Table extends ExcelComponent {
	static className = 'excel-table';

	constructor($root, options) {
		super(
			$root,
			{
				name: 'Table',
				listeners: ['mousedown', 'keydown', 'input', 'focusout'],
				...options,
			},
		);
	}

	toHTML() {
		return createTable(30);
	}

	prepare() {
		this.selection = new TableSelection();
	}

	init(data) {
		super.init();
		if (data) {
			Object.entries(data.colState)
				.forEach(([key, value]) => {
					setColWidth(this.$root, key, value);
				});
			Object.entries(data.rowState)
				.forEach(([key, value]) => {
					this.$root.find(`[data-row="${key}"]`)
						.setStyle({ height: `${value}px` });
				});
			Object.entries(data.cellStyles)
				.forEach(([key, value]) => {
					this.$root.find(`[data-id="${key}"]`)
						.setStyle(value);
				});
			Object.entries(data.dataState)
				.forEach(([key, value]) => {
					const $el = this.$root.find(`[data-id="${key}"]`);
					$el.text(evaluateExpression(value));
					$el.data('data-cellFormula', value);
				});
		}
		this.selectCell(this.$root.find('[data-id="0:0"]'));
		this.$on('formula:input', (text) => {
			this.selection.current.text(evaluateExpression(text));
			this.updateTextInStore(text);
		});

		this.$on('formula:done', () => {
			this.selection.current.focus();
		});
		this.$on('toolbar:changeState', (style) => {
			this.selection.setStyle(this, style);
		});
	}

	selectCell($cell) {
		this.selection.select($cell);
		let styles = $cell.getStyles(Object.keys(defaultCellStyles));
		if (Object.keys(styles).length !== 0) {
			this.$dispatch(actions.changeStyles({
				styles,
				id: $cell.id(),
			}));
		} else {
			styles = defaultCellStyles;
		}

		const data = $cell.data().cellformula;
		if (data) {
			$cell.text(data);
		}
		this.$emit('table:select', {
			$cell,
			styles,
		});
	}

	async resizeTable(event) {
		try {
			const data = await resizeHandler(this.$root, event);
			this.$dispatch(actions.tableResize(data));
		} catch (e) {
			console.warn('Resize error', e.message);
		}
	}

	onMousedown(event) {
		if (canResize(event)) {
			this.resizeTable(event);
		} else if (isCell(event)) {
			const $target = $(event.target);
			if (event.shiftKey) {
				const $cells = matrix($target, this.selection.current)
					.map((id) => this.$root.find(`[data-id="${id}"]`));
				this.selection.selectGroup($cells);
			} else {
				this.selectCell($target);
			}
		}
	}

	onKeydown(event) {
		const keys = [
			'Enter',
			'Tab',
			'ArrowLeft',
			'ArrowRight',
			'ArrowDown',
			'ArrowUp',
		];

		const { key } = event;

		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault();
			const id = this.selection.current.id(true);
			const $next = this.$root.find(nextSelector(key, id));
			this.selectCell($next);
		}

		if (event.key === 'Enter') {
			this.calcCell(event);
		}
	}

	updateTextInStore(value) {
		this.$dispatch(actions.changeText({
			id: this.selection.current.id(),
			value,
		}));
		this.selection.current.data('data-cellFormula', value);
	}

	onInput({ target }) {
		// this.$emit('table:input',$(target))
		this.updateTextInStore($(target)
			.text());
	}

	onFocusout(event) {
		this.calcCell(event);
	}

	calcCell($el) {
		$($el.target)
			.text(evaluateExpression($($el.target)
				.text()));
	}
}

export default Table;
