import { $ } from '../../core/dom';
import { Emitter } from '../../core/Emitter';

class Excel {
	constructor(selector, options) {
		// this.container = document.querySelector(selector);
		this.$container = $(selector);
		this.contentElements = options.components || [];
		this.emitter = new Emitter();
	}

	getContent() {
		const $root = $.create('div', 'excel');

		const componentOptions = { emitter: this.emitter };
		this.contentElements = this.contentElements.map((El) => {
			const $el = $.create('div', El.className);
			const elInstance = new El($el, componentOptions);
			// debugger
			$el.html(elInstance.toHTML());
			$root.append($el);
			return elInstance;
		});
		return $root;
	}

	render() {
		this.$container.append(this.getContent());
		this.contentElements.forEach((el) => el.init());
	}
}

export default Excel;
