function buttonTemplate(button) {
	return `
       <span class="material-icons button ${button.active ? 'active' : ''}"
        data-type="button" data-value='${JSON.stringify(button.value)}'>
${button.name}</span>
  	`;
}

export function toolbarTemplate(state) {
	const buttons = [
		{
			name: 'format_align_left',
			active: state.textAlign === 'left',
			value: { textAlign: 'left' },
		},
		{
			name: 'format_align_center',
			active: state.textAlign === 'center',
			value: { textAlign: 'center' },
		},
		{
			name: 'format_align_right',
			active: state.textAlign === 'right',
			value: { textAlign: 'right' },
		},
		{
			name: 'format_bold',
			active: state.fontWeight === 'bold',
			value: { fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold' },
		},
		{
			name: 'format_italic',
			active: state.fontStyle === 'italic',
			value: { fontStyle: state.fontStyle === 'italic' ? 'none' : 'italic' },
		},
		{
			name: 'format_underlined',
			active: state.textDecoration === 'underline',
			value: { textDecoration: state.textDecoration === 'underline' ? 'normal' : 'underline' },
		},
	];
	return buttons.map(buttonTemplate).join('');
}
