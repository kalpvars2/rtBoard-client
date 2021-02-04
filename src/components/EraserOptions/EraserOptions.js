import React, { useEffect } from 'react';
import './EraserOptions.css';

const EraserOptions = () => {
	useEffect(() => {
		const board = document.getElementById('board');
		const ctx = board.getContext('2d');
		const eraserOptions = document.getElementById('rangeInputEraser');

		eraserOptions.addEventListener('change', (event) => {
			ctx.lineWidth = event.target.value;
		});
	}, []);
	return (
		<div className={"eraserOptions"}>
			<div>
				<input id={"rangeInputEraser"} defaultValue='3' type="range" min="1" max="60" />
			</div>
		</div>
	);
};

export default EraserOptions;