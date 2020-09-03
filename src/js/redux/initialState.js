import { clone, storage } from '../core/utils';
import { defaultFileName } from '../constants';

const defaultState = {
	rowState: {},
	colState: {},
	dataState: {},
	currentText: '',
	cellStyles: {},
	currentStyles: {},
	fileName: defaultFileName,
	lastChangeDate: new Date().toJSON(),

};
export function initialState(storageName) {
	return storage(storageName) ? storage(storageName) : clone(defaultState);
}
