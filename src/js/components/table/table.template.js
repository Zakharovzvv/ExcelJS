const CODES = {
	A: 65,
	Z: 90,
};

// function createTable(rows) {
// 	let template = '';
// 	for (let i = 0; i < rows; i++) {
// 		template += createRow(i);
// 	}
// 	return template;
// }
// function createRow(index) {
// 	let row = '<div class="row">';
// 	row += `<div class="row-info cell">${index > 0 ? index : ''}</div>`;
// 	row += '<div class="row-data">';
// 	for (let i = CODES.A; i < CODES.Z; i++) {
// 		row += `<div class="${index === 0 ? `cell-header">${toChar(i)}` : 'cell" contenteditable>'}</div>`;
// 	}
// 	row += '</div></div>';
// 	return row;
// }

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
    <div class="row" data-type="resizable">
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

	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(toCell(i))
			.join('');

		rows.push(createRow(i + 1, cells));
	}

	return rows.join('');
}
export default createTable;
