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

	clear() {
		this.html = '';
		return this;
	}

	append(node) {
		if (node instanceof Dom) {
			node = node.$el;
		}
		if (Element.prototype.append) {
			this.$el.append(node);
		} else {
			this.$el.appendChild(node);
		}
		return this;
	}

	on(event, callback) {
		this.$el.addEventListener(event, callback);
	}

	off(event, callback) {
		this.$el.removeEventListener(event, callback);
	}

	get data() {
		return this.$el.dataset;
	}

	closest(selector) {
		return $(this.$el.closest(selector));
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	setStyle(properties = {}) {
		// Object.keys(properties).forEach((key) => {
		// 	this.$el.style[key] = properties[key];
		// });
		Object.entries(properties).forEach(([key, value]) => {
			this.$el.style.setProperty(key, value);
		});
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector);
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
