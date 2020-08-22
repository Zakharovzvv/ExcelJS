import {$} from '../../core/dom'
class Excel {
  constructor(selector, options) {
    //this.container = document.querySelector(selector);
    this.$container = $(selector);
    this.contentElements = options.components||[];
  }
// createEl(classname, content){
//     const el=document.createElement('div');
//     el.classList.add(classname);
//     el.insertAdjacentHTML('afterbegin',content);
//     return el;
// }
//   getContent() {
//     const fragment=document.createDocumentFragment();
//     this.contentElements.forEach(el=>{
//       const elInstance=new el();
//       fragment.append(this.createEl(el.className,elInstance.toHTML()))
//     })
//     return fragment;
//   }
  getContent() {
    const $root=$.create('div', 'excel')
    this.contentElements= this.contentElements.map(El=>{
      const $el=$.create('div',El.className)
      const elInstance=new El($el);
      //debugger
      $el.html(elInstance.toHTML())
      $root.append($el)
      return elInstance
    })
    return $root;
  }
  render() {
    this.$container.append( this.getContent());
    this.contentElements.forEach(el=>el.init())

  }

}

export default Excel
