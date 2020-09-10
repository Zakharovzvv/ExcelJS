import { clone } from '../core/utils';
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
export function initialState(state) {
	return state || clone(defaultState);
}
