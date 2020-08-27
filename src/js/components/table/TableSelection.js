class TableSelection{
  static className='selected'
  constructor() {
    this.group=[]
    this.current=null
  }

  select($el){
    this.clear()
    $el.focus().addClass(TableSelection.className)
    this.group.push($el)
    this.current=$el
  }
  clear(){
    this.group.forEach(gr=>gr.removeClass(TableSelection.className))
    this.group=[]

  }
  selectGroup(group=[]){
    this.clear()
    this.group=group
    this.group.forEach(gr=>gr.addClass(TableSelection.className))
  }
}

export default TableSelection
