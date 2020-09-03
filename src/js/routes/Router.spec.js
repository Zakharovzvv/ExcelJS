import Page from '../core/Page';
import Router from './Router';

class DashboardPage extends Page {
	getRoot() {
		const $root = document.createElement('div');
		$root.innerHTML = 'dashboard';
		return $root;
	}
}
describe('Router:', () => {
	let router;
	let $root;
	beforeEach(() => {
		$root = document.createElement('div');
		router = new Router($root, {
			dashboard: DashboardPage,
		});
	});

	test('should be defined', () => {
		expect(router).toBeDefined();
	});
	test('should render dashboard page', () => {
		router.onChangePage();
		expect($root.innerHTML).toBe('<div>dashboard</div>');
	});
});
