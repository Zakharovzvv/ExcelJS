import {
	CHANGE_FILENAME, CHANGE_STYLES, CHANGE_TEXT, TABLE_RESIZE,
} from './types';

/**
 * Action creator
 * @param data
 * @returns {{data: *, type: string}}
 */
export function tableResize(data) {
	return {
		type: TABLE_RESIZE,
		data,
	};
}
export function changeText(data) {
	return {
		type: CHANGE_TEXT,
		data,
	};
}
export function changeStyles(data) {
	return {
		type: CHANGE_STYLES,
		data,
	};
}
export function changeFileName(data) {
	return {
		type: CHANGE_FILENAME,
		data,
	};
}
