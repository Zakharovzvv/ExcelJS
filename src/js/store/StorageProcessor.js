import { debounce } from '../core/utils';
import { saveStateWait } from '../constants';

class StorageProcessor {
	constructor(client, delay = saveStateWait) {
		this.client = client;
		this.listen = debounce(this.listen.bind(this), delay);
	}

	listen(state) {
		this.client.save(state);
	}

	get() {
		return this.client.get();
	}
}

export default StorageProcessor;
