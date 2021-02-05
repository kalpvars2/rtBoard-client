import React, {useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import {apiURL} from '../../services/config.js';
import Toolbar from '../Toolbar/Toolbar';
import Canvas from '../Canvas/Canvas';
import { Undo, Redo, Redraw, createBox } from '../../helperFunctions';

let socket;

const Board = ({history, location}) => {
	let undoStack = [], redoStack = [];
	socket = io(apiURL);
	useEffect(() => {
		const {room} = queryString.parse(location.search);
		socket.emit('join', {room});
		const board = document.getElementById('board');
		const ctx = board.getContext('2d');
		socket.on('onmousedown', point => {
			let currentCtxSpecs = {
				color: ctx.strokeStyle,
				width: ctx.lineWidth
			};
			const {x, y, color, width} = point;
			ctx.lineWidth = width;
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo(x, y);
			undoStack.push(point);
			ctx.strokeStyle = currentCtxSpecs.color;
			ctx.lineWidth = currentCtxSpecs.width;
		});

		socket.on('onmousemove', point => {
			let currentCtxSpecs = {
				color: ctx.strokeStyle,
				width: ctx.lineWidth
			}
			const {x, y, color, width} = point;
			ctx.lineWidth = width;
			ctx.strokeStyle = color;
			ctx.lineTo(x, y);
			ctx.stroke();
			undoStack.push(point);
			ctx.strokeStyle = currentCtxSpecs.color;
			ctx.lineWidth = currentCtxSpecs.width;
		});

		socket.on('onundo', () => {
			Undo(undoStack, redoStack);
			Redraw(ctx, board, undoStack);
		});

		socket.on('onredo', () => {
			Redo(undoStack, redoStack);
			Redraw(ctx, board, undoStack);
		});

		socket.on('oncreatesticky', ({id}) => {
			const writingPad = createBox();
			const textArea = document.createElement('textarea');
			writingPad.appendChild(textArea);
			textArea.id = id;
			textArea.addEventListener('input', (event) => {
				socket.emit('stickychange', {id, data: event.target.value});
			});
		});

		socket.on('onstickychange', ({id, data}) => {
			const textArea = document.getElementById(id);
			textArea.value = data;
		});

		socket.on('onshareimage', url => {
			const writingPad = createBox();
			const img = document.createElement('img');
			img.src = url;
			writingPad.appendChild(img);
		});

	}, []);
	return (
	    <div className="App">
	      <Toolbar history={history} socket={socket} undoStack={undoStack} redoStack={redoStack}/>
	      <Canvas socket={socket} undoStack={undoStack} redoStack={redoStack}/>
	    </div>
	);
};

export default Board;