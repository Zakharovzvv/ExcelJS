import {
	CHANGE_FILENAME, CHANGE_STYLES, CHANGE_TEXT, TABLE_RESIZE,
} from './types';

function value(state, field, action) {
	const val = state[field] || {};
	val[action.data.id] = action.data.value;
	return val;
}
function rootReducer(state, action) {
	let field;
	switch (action.type) {
	case TABLE_RESIZE:
		field = action.data.type === 'row' ? 'rowState' : 'colState';
		return { ...state, [field]: value(state, field, action) };
	case CHANGE_TEXT:
		field = 'dataState';
		return {
			...state,
			currentText: action.data.value,
			[field]: value(state, field, action),
		};
	case CHANGE_STYLES:
		field = 'cellStyles';
		return {
			...state,
			currentStyles: action.data.value,
			[field]: value(state, field, action),
		};
	case CHANGE_FILENAME:
		field = 'fileName';
		return {
			...state,
			[field]: action.data.value,
		};
	default: return state;
	}
}

export default rootReducer;
