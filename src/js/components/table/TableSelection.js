import * as actions from '../../redux/actions';

class TableSelection {
	static className = 'selected';

	constructor() {
		this.group = [];
		this.current = null;
	}

	select($el) {
		this.clear();
		$el.focus()
			.addClass(TableSelection.className);
		this.group.push($el);
		this.current = $el;
	}

	clear() {
		this.group.forEach((gr) => gr.removeClass(TableSelection.className));
		this.group = [];
	}

	selectGroup(group = []) {
		this.clear();
		this.group = group;
		this.group.forEach((gr) => gr.addClass(TableSelection.className));
	}

	setStyle(table, style) {
		this.group.forEach(($el) => {
			$el.setStyle(style);
			table.$dispatch(actions.changeStyles({
				value: style,
				id: $el.id(),
			}));
		});
	}
}

export default TableSelection;
