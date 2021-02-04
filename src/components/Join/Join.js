import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = (props) => {
	const [room, setRoom] = useState('');
	return(
		<div className={"joinOuterContainer"}>
			<div className={"joinInnerContainer"}>
				<h1 className={"heading"}>Join</h1>
				<div><input type="text" className={"joinInput"} placeholder="Enter class code." onChange={(event) => setRoom(event.target.value)}/></div>
				<Link onClick={(event) => (!room) ? event.preventDefault() : null} to={`/board?room=${room}`}>
					<button className={"button"} type={"submit"}>Join class</button>
				</Link>
			</div>
		</div>
	);
}

export default Join;
