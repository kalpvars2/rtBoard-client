import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import {apiURL} from '../../services/config.js';
import Toolbar from '../Toolbar/Toolbar';
import Canvas from '../Canvas/Canvas';

let socket;

const Board = ({location}) => {
	const [room, setRoom] = useState('');
	let undoStack = [], redoStack = [];
	useEffect(() => {
		const {room} = queryString.parse(location.search);
		socket = io(apiURL);
		console.log(socket);
		setRoom(room);
		socket.emit('join', {room});
		return () => {
			socket.emit('disconnect');
			socket.off();
		};
	}, [apiURL, location.search]);
	return (
	    <div className="App">
	      <Toolbar undoStack={undoStack} redoStack={redoStack}/>
	      <Canvas undoStack={undoStack} redoStack={redoStack}/>
	    </div>
	);
};

export default Board;