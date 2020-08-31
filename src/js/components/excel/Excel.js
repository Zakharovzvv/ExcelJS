import { $ } from '../../core/dom';
import { Emitter } from '../../core/Emitter';
import StoreSubscriber from '../../core/StoreSubscriber';

class Excel {
	constructor(selector, options) {
		// this.container = document.querySelector(selector);
		this.$container = $(selector);
		this.contentElements = options.components || [];
		this.emitter = new Emitter();
		this.store = options.store;
		// this.components = options.components || [];
		this.subscriber = new StoreSubscriber(this.store);
	}

	getContent() {
		const $root = $.create('div', 'excel');

		const componentOptions = {
			emitter: this.emitter,
			store: this.store,
		};
		this.contentElements = this.contentElements.map((El) => {
			const $el = $.create('div', El.className);
			const elInstance = new El($el, componentOptions);
			$el.html(elInstance.toHTML());
			$root.append($el);
			return elInstance;
		});
		return $root;
	}

	render() {
		const $root = this.getContent();
		this.$container.append($root);
		this.subscriber.subscribe(this.contentElements);
		const data = this.store.getState();
		this.contentElements.forEach((el) => el.init(data));
	}

	destroy() {
		this.subscriber.unsubscribe();
		this.contentElements.forEach((c) => c.destroy());
	}
}

export default Excel;
