import { storage } from '../core/utils';
import { defaultFileName } from '../constants';

const defaultState = {
	rowState: {},
	colState: {},
	dataState: {},
	currentText: '',
	cellStyles: {},
	currentStyles: {},
	fileName: defaultFileName,

};
export const initialState = storage('excel-state') ? storage('excel-state') : defaultState;
