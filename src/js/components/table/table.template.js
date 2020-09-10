const CODES = {
	A: 65,
	Z: 90,
};

function toCell(row) {
	return function (_, col) {
		return `
    <div class="cell" contenteditable data-col="${col}" data-id="${row}:${col}" data-type="cell"></div>
  `;
	};
}

function toColumn(col, index) {
	return `
    <div class="column-header" data-type="resizable" data-col="${index}">${col} <div class="column-resizer" data-resize="col"></div></div>
  `;
}

function createRow(index, content) {
	return `
    <div class="row ${!index ? 'first-row' : ''}" data-type="resizable" data-row="${index}">
      <div class="row-info">${index ? `${index}<div class="row-resizer" data-resize="row"></div>` : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];

	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(toColumn)
		.join('');

	rows.push(createRow(null, cols));
	rows.push('<div class="table-content">');
	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(toCell(i))
			.join('');

		rows.push(createRow(i + 1, cells));
	}
	rows.push('</div>');
	return rows.join('');
}

export default createTable;
