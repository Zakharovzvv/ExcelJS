const CODES = {
  A: 65,
  Z: 90
}

function createTable(rows){
let template='';
  for (let i = 0; i < rows; i++) {
   template+= createRow(i);
  }
  return template;
}
function toChar( index) {
  return String.fromCharCode( index)
}
function createRow(index){
let row='<div class="row">';
row+=`<div class="row-info cell">${index>0?index:''}</div>`
row+='<div class="row-data">'
  for (let i = CODES.A; i < CODES.Z; i++) {
    row+=`<div class="${index===0?'cell-header">'+toChar(i):'cell" contenteditable>'}</div>`
  }
  row+='</div></div>'
return row
}
export default createTable

function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `
}

function createRow1(index, content) {
  return `
    <div class="row">
      <div class="row-info">${index ? index : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar1(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable1(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
