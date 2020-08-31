import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.store = options.store;
		this.unsubscriber = [];
		this.subscribe = options.subscribe || [];
		//		this.storeSub = null;
		this.prepare();
	}

	toHTML() {
		return '';
	}

	prepare() {}

	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}

	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn);
		this.unsubscriber.push(unsub);
	}

	$dispatch(action) {
		this.store.dispatch(action);
	}

	storeChanged() {}

	isWatching(key) {
		return this.subscribe.includes(key);
	}

	// $subscribe(fn) {
	// 	this.storeSub = this.store.subscribe(fn);
	// }

	init() {
		this.initDOMListeners();
	}

	destroy() {
		this.removeDOMListeners();
		this.unsubscriber.forEach((unsub) => unsub());
		//		this.storeSub.unsubscribe();
	}
}
