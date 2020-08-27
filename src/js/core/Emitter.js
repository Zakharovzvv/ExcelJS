export class Emitter {
	constructor() {
		this.listeners = {};
	}

	/**
   *Notify listeners
   * @param event
   * @param args
   */
	emit(event, ...args) {
		if (!Array.isArray(this.listeners[event])) {
			return false;
		}

		this.listeners[event].forEach((listener) => { listener(...args); });
		return true;
	}

	/**
   * Subscribe to event and unsubscribe
   * @param event
   * @param fn
   */
	subscribe(event, fn) {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(fn);
		return () => {
			this.listeners[event] = this.listeners[event].filter((listener) => listener !== fn);
		};
	}
}
