import { range } from '../../core/utils';
import { $ } from '../../core/dom';

function canResize({ target }) {
	return target.dataset.resize;
}

function isCell(event) {
	return event.target.dataset.type === 'cell';
}

function matrix($target, $current) {
	const target = $target.id(true);
	const current = $current.id(true);
	const cols = range(current.col, target.col);
	const rows = range(current.row, target.row);
	return cols.reduce((acc, col) => {
		rows.forEach((row) => acc.push(`${row}:${col}`));
		return acc;
	}, []);
}
function nextSelector(key, { col, row }) {
	const MIN_VALUE = 0;
	// eslint-disable-next-line default-case
	switch (key) {
	case 'Enter':
	case 'ArrowDown':
		row++;
		break;
	case 'Tab':
	case 'ArrowRight':
		col++;
		break;
	case 'ArrowLeft':
		col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
		break;
	case 'ArrowUp':
		row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
		break;
	}

	return `[data-id="${row}:${col}"]`;
}

function setColWidth(root, col, width) {
	root.findAll(`[data-col="${col}"]`)
		.forEach((el) => {
			$(el).setStyle({ width: `${width}px` });
		});
}
export {
	canResize, isCell, matrix, nextSelector, setColWidth,
};
