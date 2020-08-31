import { $ } from '../../core/dom';
import { setColWidth } from './table.functions';

function resizeHandler($root, { target }) {
	return new Promise((resolve) => {
		const $resizer = $(target);
		const type = $resizer.data().resize;
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

		document.onmouseup = () => {
			document.onmousemove = null;
			document.onmouseup = null;
			if (type === 'col') {
				setColWidth($root, $parent.data().col, newBorder);
			} else {
				$parent.setStyle({ height: `${newBorder}px` });
			}

			resolve({
				value: newBorder,
				type,
				id: $parent.data()[type],

			});
			$resizer.setStyle({
				opacity: 0,
				right: 0,
				bottom: 0,
			});
		};
	});
}

export default resizeHandler;
