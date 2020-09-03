class Store {
	constructor(rootReducer, initialState = {}) {
		this.rootReducer = rootReducer;
		this.state = this.rootReducer({ ...initialState }, { type: '__INIT__' });
		this.listeners = [];
	}

	subscribe(fn) {
		this.listeners.push(fn);
		return {
			unsubscribe: () => {
				this.listeners = this.listeners.find((l) => l !== fn);
			},
		};
	}

	dispatch(action) {
		this.state = this.rootReducer(this.state, action);
		this.listeners.forEach((l) => l(this.state));
	}

	getState() {
		return this.state;
	}
}

export default Store;
