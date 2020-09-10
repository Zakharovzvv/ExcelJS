import Page from '../core/Page';
import Excel from '../components/excel/Excel';
import Formula from '../components/formula/Formula';
import Header from '../components/header/Header';
import Table from '../components/table/Table';
import Toolbar from '../components/toolbar/Toolbar';
import Store from '../store/Store';
// import { debounce, storage } from '../core/utils';
import rootReducer from '../redux/rootReduscer';
import { initialState } from '../redux/initialState';
// import { saveStateWait } from '../constants';
import StorageProcessor from '../store/StorageProcessor';
import LocalStorageClient from '../store/LocalStorageClient';

class ExcelPage extends Page {
	constructor(param) {
		super(param);
		this.storesub = null;
		this.processor = new StorageProcessor(new LocalStorageClient(this.params));
	}

	async getRoot() {
	//	const params = this.params ? this.params : Date.now().toString();
		const state = await this.processor.get();

		const store = new Store(rootReducer, initialState(state));
		// const stateListener = debounce((state) => {
		// 	storage(storageName(params), state);
		// }, saveStateWait);

		// this.storesub = store.subscribe(stateListener);
		this.storesub = store.subscribe(this.processor.listen);

		this.excel = new Excel('#app', { components: [Header, Toolbar, Formula, Table], store });

		return this.excel.getContent();
	}

	afterRender() {
		this.excel.init();
	}

	destroy() {
		this.excel.destroy();
		//		this.storesub.unsubscribe();
	}
}
export default ExcelPage;
