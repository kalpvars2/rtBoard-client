import React, { useEffect } from 'react';
import './PencilOptions.css';

const handleColorChange = (ctx, color) => {
	ctx.strokeStyle = color;
};

const PencilOptions = () => {
	useEffect(() => {
		const board = document.getElementById('board');
		const ctx = board.getContext('2d');
		const pencilOptions = document.getElementById('rangeInputPencil');

		pencilOptions.addEventListener('change', (event) => {
			ctx.lineWidth = event.target.value;
		});

		const black = document.getElementsByClassName('blackPencil')[0];
		const blue = document.getElementsByClassName('bluePencil')[0];
		const red = document.getElementsByClassName('redPencil')[0];
		const green = document.getElementsByClassName('greenPencil')[0];
		black.addEventListener('click', () => {
			handleColorChange(ctx, 'black');
		});
		blue.addEventListener('click', () => {
			handleColorChange(ctx, 'blue');
		});
		red.addEventListener('click', () => {
			handleColorChange(ctx, 'red');
		});
		green.addEventListener('click', () => {
			handleColorChange(ctx, 'green');
		});
	}, []);
	return (
		<div className={"pencilOptions"}>
			<div>
				<input id={"rangeInputPencil"} defaultValue='3' type="range" min="1" max="10" />
			</div>
			<div className={"colorPalette"}>
				<div className={"blackPencil color"}></div>
				<div className={"bluePencil color"}></div>
				<div className={"redPencil color"}></div>
				<div className={"greenPencil color"}></div>
			</div>
		</div>
	);
};

export default PencilOptions;