import { $ } from '../core/dom';
import ActiveRoute from './ActiveRoute';
import { Loader } from '../components/Loader';

class Router {
	constructor(selector, routes) {
		if (!selector) {
			throw new Error('Selector is not provided in Router');
		}
		this.$container = $(selector);
		this.routes = routes;
		this.loader = new Loader();
		this.page = null;
		this.onChangePage = this.onChangePage.bind(this);
		this.init();
	}

	async init() {
		window.addEventListener('hashchange', this.onChangePage);
		await this.onChangePage();
	}

	async	onChangePage() {
		if (this.page) {
			this.page.destroy();
		}

		this.$container.clear().append(this.loader);
		let Page;
		if (ActiveRoute.path) {
			Page = this.routes.excel;
		} else {
			Page = this.routes.dashboard;
		}
		this.page = new Page(ActiveRoute.param);
		const root = await this.page.getRoot();
		this.$container.clear().append(root);
		this.page.afterRender();
	}

	destroy() {
		window.removeEventListener('hashchange', this.onChangePage);
	}
}
export default Router;
