import { isEqual } from '../core/utils';

class StoreSubscriber {
	constructor(store) {
		this.store = store;
		this.sub = null;
		this.prevState = {};
	}

	subscribe(components) {
		this.prevState = this.store.getState();
		this.sub = this.store.subscribe((state) => {
			Object.keys(state).forEach((key) => {
				if (!isEqual(this.prevState[key], state[key])) {
					components.forEach((component) => {
						if (component.isWatching(key)) {
							component.storeChanged({ [key]: state[key] });
						}
					});
				}
			});
		});
		this.prevState = this.store.getState();
	}

	unsubscribe() {
		this.sub.unsubscribe();
	}
}

export default StoreSubscriber;
