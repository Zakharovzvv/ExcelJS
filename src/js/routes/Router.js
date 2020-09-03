import { $ } from '../core/dom';
import ActiveRoute from './ActiveRoute';

class Router {
	constructor(selector, routes) {
		if (!selector) {
			throw new Error('Selector is not provided in Router');
		}
		this.$container = $(selector);
		this.routes = routes;		this.onChangePage = this.onChangePage.bind(this);
		this.init();
	}

	init() {
		window.addEventListener('hashchange', this.onChangePage);
		this.onChangePage();
	}

	onChangePage() {
		if (this.page) {
			this.page.destroy();
		}
		this.$container.clear();
		let Page;
		if (ActiveRoute.path) {
			Page = this.routes.excel;
		} else {
			Page = this.routes.dashboard;
		}

		this.page = new Page(ActiveRoute.param);
		this.$container.append(this.page.getRoot());
		this.page.afterRender();
	}

	destroy() {
		window.removeEventListener('hashchange', this.onChangePage);
	}
}
export default Router;
