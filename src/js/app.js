import '../style/style.sass';
import Excel from './components/excel/Excel';
import Formula from './components/formula/Formula';
import Header from './components/header/Header';
import Table from './components/table/Table';
import Toolbar from './components/toolbar/Toolbar';
import Store from './core/Store';
import { debounce, storage } from './core/utils';
import rootReducer from './redux/rootReduscer';
import { initialState } from './redux/initialState';
import { saveStateWait } from './constants';

const store = new Store(rootReducer, initialState);
const stateListener = debounce((state) => {
	storage('excel-state', state);
}, saveStateWait);

store.subscribe(stateListener);

const excel = new Excel('#app', { components: [Header, Toolbar, Formula, Table], store });

excel.render();
