import React, { useEffect } from 'react';

const Canvas = ({socket, undoStack, redoStack}) => {
	useEffect(() => {
		const board = document.getElementsByTagName('canvas')[0];
		board.height = window.innerHeight;
		board.width = window.innerWidth;
		const ctx = board.getContext('2d');
		ctx.lineWidth = 3;
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = "high";
		ctx.miterlimit = 1;
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, board.width, board.height);

		let isMouseDown = false;

		board.addEventListener('mousedown', (event) => {
			redoStack.length = 0;
			ctx.beginPath();
			const {top} = board.getBoundingClientRect();
			ctx.moveTo(event.clientX, event.clientY - top);
			isMouseDown = true;
			let point = {
				x: event.clientX,
				y: event.clientY - top,
				identifier: "mousedown",
				color: ctx.strokeStyle,
				width: ctx.lineWidth
			};
			undoStack.push(point);
			if(socket)
				socket.emit('mousedown', point);
		});

		board.addEventListener("mousemove", (event) => {
			if(isMouseDown){
				let {top} = board.getBoundingClientRect();
				ctx.lineTo(event.clientX, event.clientY - top);
				ctx.stroke();
				let point = {
					x: event.clientX,
					y: event.clientY - top,
					identifier: "mousemove",
					color: ctx.strokeStyle,
					width: ctx.lineWidth
				};
				undoStack.push(point);
				if(socket)
					socket.emit('mousemove', point);
			}
		});

		board.addEventListener("mouseup", (event) => {
			isMouseDown = false;
		});

	}, []);
	return (
		<div>
			<canvas id = {"board"} className={"board"}></canvas>
		</div>
	);
};

export default Canvas;