import '../style/style.sass';

import DashboardPage from './views/DashboardPage';
import ExcelPage from './views/ExcelPage';
import Router from './routes/Router';

// eslint-disable-next-line no-new
new Router('#app', {
	dashboard: DashboardPage,
	excel: ExcelPage,
});
