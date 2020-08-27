import { $ } from '../../core/dom';

function resizeHandler($root, { target }) {
	const $resizer = $(target);
	const type = $resizer.data.resize;
	const $parent = $resizer.closest('[data-type="resizable"]');
	const coords = $parent.getCoords();
	$resizer.setStyle({ opacity: 1 });
	let newBorder;
	document.onmousemove = (e) => {
		if (type === 'col') {
			const delta = e.pageX - coords.right;
			newBorder = coords.width + delta;
			$resizer.setStyle({ right: `${-delta}px` });
		} else {
			const delta = e.pageY - coords.bottom;
			newBorder = coords.height + delta;
			$resizer.setStyle({ bottom: `${-delta}px` });
		}
	};

	document.onmouseup = (e) => {
		document.onmousemove = null;
		document.onmouseup = null;
		if (type === 'col') {
			$root.findAll(`[data-col="${$parent.data.col}"]`)
				.forEach((el) => { $(el).setStyle({ width: `${newBorder}px` }); });
		} else {
			$parent.setStyle({ height: `${newBorder}px` });
		}
		$resizer.setStyle({
			opacity: 0,
			right: 0,
			bottom: 0,
		});
	};
}

export default resizeHandler;
