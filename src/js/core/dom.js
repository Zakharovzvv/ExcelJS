class Dom {
	constructor(selector) {
		this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
	}

	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}
		return this.$el.outerHTML.trim();
	}

	text(text) {
		if (typeof text !== 'undefined') {
			this.$el.textContent = text;
			return this;
		}
		if (this.$el.tagName.toLowerCase() === 'input') {
			return this.$el.value.trim();
		}
		return this.$el.textContent.trim();
	}

	clear() {
		this.html = '';
		return this;
	}

	append(node) {
		if (node instanceof Dom) {
			// eslint-disable-next-line no-param-reassign
			node = node.$el;
		}
		if (Element.prototype.append) {
			this.$el.append(node);
		} else {
			this.$el.appendChild(node);
		}
		return this;
	}

	/**
	 * Function set event listener
	 * @param event
	 * @param callback
	 */
	on(event, callback) {
		this.$el.addEventListener(event, callback);
	}

	off(event, callback) {
		this.$el.removeEventListener(event, callback);
	}

	data(dataName = '', data = null) {
		if (data) {
			this.$el.setAttribute(dataName, data);
		}
		return this.$el.dataset;
	}

	closest(selector) {
		// eslint-disable-next-line no-use-before-define
		return $(this.$el.closest(selector));
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	setStyle(properties = {}) {
		Object.keys(properties).forEach((key) => {
			this.$el.style[key] = properties[key];
		});
		// Object.entries(properties).forEach(([key, value]) => {
		// 	this.$el.style.setProperty(key, value);
		// });
	}

	getStyles(styles) {
		return styles.reduce((acc, styleKey) => {
			const prop = this.$el.style[styleKey];
			if (prop) acc[styleKey] = prop;
			return acc;
		}, {});
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector);
	}

	find(selector) {
		// eslint-disable-next-line no-use-before-define
		return $(this.$el.querySelector(selector));
	}

	focus() {
		this.$el.focus();
		return this;
	}

	addClass(className) {
		this.$el.classList.add(className);
	}

	removeClass(className) {
		this.$el.classList.remove(className);
	}

	id(parse) {
		if (parse) {
			const parsed = this.id().split(':');
			return {
				row: +parsed[0],
				col: +parsed[1],
			};
		}
		return this.data().id;
	}
}

export function $(selector) {
	return new Dom(selector);
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	if (classes) {
		el.classList.add(classes);
	}
	return $(el);
};
