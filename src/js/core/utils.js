export function capitalizeFirstLetter(str) {
	if (typeof str !== 'string') {
		return '';
	}
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function range(start, end) {
	if (start > end) {
		// eslint-disable-next-line no-param-reassign
		[end, start] = [start, end];
	}
	return new Array(end - start + 1)
		.fill('')
		.map((_, index) => start + index);
}

export function storage(key, data = null) {
	if (!data) {
		return JSON.parse(localStorage.getItem(key));
	}
	return localStorage.setItem(key, JSON.stringify(data));
}
export function isEqual(a, b) {
	if (typeof a === 'object' && typeof b === 'object') {
		return JSON.stringify(a) === JSON.stringify(b);
	}
	return a === b;
}

export function debounce(fn, wait) {
	let timeout;
	return function (...args) {
		const later = () => {
			clearTimeout(timeout);
			fn.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}
export function evaluateExpression(exp) {
	let res;
	if (exp.startsWith('=')) {
		try {
			// eslint-disable-next-line no-eval
			res = eval(exp.slice(1));
		} catch (e) {
			res = exp;
		}
	}
	return res;
}
export function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}
