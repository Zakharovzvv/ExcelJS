import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.unsubscriber = [];
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

	init() {
		this.initDOMListeners();
	}

	destroy() {
		this.removeDOMListeners();
		this.unsubscriber.forEach((unsub) => unsub());
	}
}
