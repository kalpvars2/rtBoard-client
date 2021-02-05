import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as JoinSVG} from '../../assets/svg/joinBackground.svg';
import {ReactComponent as LogoSVG} from '../../assets/svg/blackboard.svg';
import './Join.css';

const Join = () => {
	const [room, setRoom] = useState('');

	const handleInputChange = (event) => {
		if(event.which === 13)
			document.querySelector('.button').click();
		else
			setRoom(event.target.value);
	};

	return(
		<div className="outermostContainer">
			<div className={"joinOuterContainer"}>
				<div className={"logoContainer"}><LogoSVG className={"logoSVG"} /><strong>eSlate</strong></div>
				<JoinSVG className={"joinSVG"}/>
				<div className={"joinInnerContainer"}>
					<div><input type="text" className={"joinInput"} placeholder="Enter class code." onKeyUp={(event) => handleInputChange(event)}/></div>
					<Link onClick={(event) => (!room) ? event.preventDefault() : null} to={`/board?room=${room}`}>
						<button className={"button"} type={"submit"}>Join</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Join;
