import Page from '../core/Page';
import { $ } from '../core/dom';
import { createDashboardHistoryTable } from './dashboard.functions';

class DashboardPage extends Page {
	getRoot() {
		const now = Date.now().toString();
		return $.create('div', 'home-screen').html(`
		       <div class="home-screen-header">
            <h1>Excel dashboard</h1>
        </div>
        <div class="new">
            <div class="new-header">
                <h3>Create table</h3>
            </div>
            <div class="new-content">
                <a href="#excel/${now}" class="create">New <br>table</a>
            </div>


        </div>
        <div class="home-screen-history">
        ${createDashboardHistoryTable()}
        </div>

		`);
	}
}
export default DashboardPage;
