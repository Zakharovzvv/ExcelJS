import { storage } from '../core/utils';

function storageName(params) {
	return `excel:${params}`;
}

class LocalStorageClient {
	constructor(name) {
		this.name = storageName(name);
	}

	save(state) {
		storage(this.name, state);
		return Promise.resolve();
	}

	get() {
		return new Promise((resolve) => {
			const state = storage(this.name);
			//	debounce(resolve(state), 5000);
			setTimeout(() => resolve(state), 1000);
		});
	}
}

export default LocalStorageClient;
