class Page {
	constructor(params) {
		this.params = params;
	}

	getRoot() {
		throw new Error('Method GetRoot must be implemented');
	}

	afterRender() {}

	destroy() {}
}
export default Page;
