import Page from '../core/Page';
import Excel from '../components/excel/Excel';
import Formula from '../components/formula/Formula';
import Header from '../components/header/Header';
import Table from '../components/table/Table';
import Toolbar from '../components/toolbar/Toolbar';
import Store from '../store/Store';
import { debounce, storage } from '../core/utils';
import rootReducer from '../redux/rootReduscer';
import { initialState } from '../redux/initialState';
import { saveStateWait } from '../constants';

function storageName(params) {
	return `excel:${params}`;
}

class ExcelPage extends Page {
	getRoot() {
		const params = this.params ? this.params : Date.now().toString();

		const store = new Store(rootReducer, initialState(storageName(params)));
		const stateListener = debounce((state) => {
			storage(storageName(params), state);
		}, saveStateWait);

		store.subscribe(stateListener);

		this.excel = new Excel('#app', { components: [Header, Toolbar, Formula, Table], store });

		return this.excel.getContent();
	}

	afterRender() {
		this.excel.init();
	}

	destroy() {
		this.excel.destroy();
	}
}
export default ExcelPage;
