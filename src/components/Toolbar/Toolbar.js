import React, { useState, useEffect } from 'react';
import PencilOptions from '../PencilOptions/PencilOptions';
import EraserOptions from '../EraserOptions/EraserOptions';
import {ReactComponent as PencilSVG} from '../../assets/svg/pencil.svg';
import {ReactComponent as EraserSVG} from '../../assets/svg/eraser.svg';
import {ReactComponent as StickyNoteSVG} from '../../assets/svg/stickyNote.svg';
import {ReactComponent as DownloadSVG} from '../../assets/svg/download.svg';
import {ReactComponent as UploadPhotoSVG} from '../../assets/svg/uploadPhoto.svg';
import {ReactComponent as UndoSVG} from '../../assets/svg/undo.svg';
import {ReactComponent as RedoSVG} from '../../assets/svg/redo.svg';
import {ReactComponent as ToolExpanderSVG} from '../../assets/svg/toolExpander.svg';
import {ReactComponent as ExitSVG} from '../../assets/svg/exit.svg';
import { Undo, Redo, Redraw, createBox } from '../../helperFunctions';
import './Toolbar.css';


const Toolbar = ({history, socket, undoStack, redoStack}) => {
	const [selectedTool, setSelectedTool] = useState(null);
	const [showPencilOptions, setShowPencilOptions] = useState(false);
	const [showEraserOptions, setShowEraserOptions] = useState(false);
	const createSticky = (event) => {
		const writingPad = createBox();
		const textArea = document.createElement('textarea');
		writingPad.appendChild(textArea);
		textArea.id = Date.now();
		if(socket)
			socket.emit('createSticky', {id: textArea.id});
		textArea.addEventListener('input', (event) => {
			if(socket)
				socket.emit('stickychange', {id: textArea.id, data: event.target.value});
		});
	};

	const handleExit = () => {
		const allCloseButtons = document.querySelectorAll('.close');
		for(let i = 0; i < allCloseButtons.length; ++i){
			allCloseButtons[i].click();
		}
		history.push('/');
	};

	let currentPencilColor = '#000000';
	
	useEffect(() => {
		const pencil = document.getElementById('pencil');
		const eraser = document.getElementById('eraser');
		const undo = document.getElementById('undo');
		const redo = document.getElementById('redo');
		const board = document.getElementById('board');
		const ctx = board.getContext('2d');
		
		pencil.addEventListener('click', () => {
			setSelectedTool('pencil');
			setShowEraserOptions(false);
			setShowPencilOptions(false);
			pencil.classList.add('selectedTool');
			eraser.classList.remove('selectedTool');
			ctx.lineWidth = document.getElementById('rangeInputPencil').value;
			ctx.strokeStyle = currentPencilColor;
		});

		eraser.addEventListener('click', () => {
			setSelectedTool('eraser');
			setShowEraserOptions(false);
			setShowPencilOptions(false);
			eraser.classList.add('selectedTool');
			pencil.classList.remove('selectedTool');
			ctx.lineWidth = document.getElementById('rangeInputEraser').value;
			currentPencilColor = ctx.strokeStyle;
			ctx.strokeStyle = "#ffffff";
		});

		undo.addEventListener('click', (event) => {
			Undo(undoStack, redoStack);
			Redraw(ctx, board, undoStack);
			if(socket) socket.emit('undo');
		});

		redo.addEventListener('click', (event) => {
			Redo(undoStack, redoStack);
			Redraw(ctx, board, undoStack);
			if(socket) socket.emit('redo');
		});

		const pencilExpander = document.getElementById('pencilExpander');
		const eraserExpander = document.getElementById('eraserExpander');
		pencilExpander.style.visibility = "visible";
		pencilExpander.addEventListener('click', () => setShowPencilOptions(true));
		eraserExpander.addEventListener('click', () => setShowEraserOptions(true));
		board.addEventListener('mousedown', () => {
			setShowPencilOptions(false);
			setShowEraserOptions(false);
		});

		const downloadTool = document.getElementById('downloadScreenshot');
		downloadTool.addEventListener('click', (event) => {
			const a = document.createElement('a');
			a.download = Date.now();
			a.href = board.toDataURL("image/png");
			a.click();
			a.remove();
		});

		const uploadImageSVG = document.getElementById('uploadImageSVG');
		uploadImageSVG.addEventListener('click', () => {
			const uploadImageDiv = document.getElementById('uploadImageDiv');
			uploadImageDiv.style.display = "flex";
			const shareImageButton = document.getElementById('shareImageButton');
			shareImageButton.addEventListener('click', (event) => {
				const imageURL = document.getElementById('uploadedImage');
				if(!imageURL.value)
					event.preventDefault();
				else{
					const writingPad = createBox();
					const img = document.createElement('img');
					img.src = imageURL.value;
					imageURL.value = "";
					writingPad.appendChild(img);
					uploadImageDiv.style.display = "none";
					if(socket)
						socket.emit('shareImage', img.src);
				}
			});
		});

	}, []);

	useEffect(() => {
		if(selectedTool){
			const selectableTools = document.getElementsByClassName("toolExpanderSVG");
			for(let i = 0; i < selectableTools.length; ++i){
				if(selectableTools[i].id === (selectedTool + 'Expander')){
					selectableTools[i].style.visibility = "visible";
				} else {
					selectableTools[i].style.visibility = "hidden";
				}
			}
		}
	}, [selectedTool]);

	useEffect(() => {
		const pencilOptions = document.getElementsByClassName('pencilOptions')[0];
		const eraserOptions = document.getElementsByClassName('eraserOptions')[0];
		
		if(showPencilOptions)
			pencilOptions.style.visibility = "visible";
		else
			pencilOptions.style.visibility = "hidden";
		
		if(showEraserOptions)
			eraserOptions.style.visibility = "visible";
		else
			eraserOptions.style.visibility = "hidden";
	}, [showPencilOptions, showEraserOptions]);	

	return (
		<div className={"toolbar"}>
			<div className={"tool expanderDiv"}>
				<PencilSVG title="Pencil" id = {"pencil"} className={"selectedTool"}/>
				<ToolExpanderSVG id = {"pencilExpander"} className={"toolExpanderSVG"} />
				<PencilOptions className={"pencilOptions"}/>
			</div>
			<div className={"tool expanderDiv"}>
				<EraserSVG title="Eraser" id = {"eraser"} />
				<ToolExpanderSVG id = {"eraserExpander"} className={"toolExpanderSVG"} />
				<EraserOptions className={"eraserOptions"}/>
			</div>
			<StickyNoteSVG onClick={createSticky} title="Sticky Note" style= {{width: "auto"}} className={"tool"} />
			<div className={"tool"}>
				<UploadPhotoSVG id={"uploadImageSVG"} title="Share Image" />
				<div id={"uploadImageDiv"} className={"uploadImageDiv"}>
					<input id={"uploadedImage"} type="text" placeholder="Enter image URL"/>
					<button id={"shareImageButton"} className="button">Share</button>
				</div>
			</div>
			<DownloadSVG title="Download Screenshot" id={"downloadScreenshot"} style = {{width: "auto"}} className={"tool"} />
			<UndoSVG title="Undo" id={"undo"} className={"tool"} />
			<RedoSVG title="Redo" id={"redo"} className={"tool"} />
			<ExitSVG style={{width: "auto"}} title="Leave" onClick={handleExit} id={"exit"} className={"tool"} />
		</div>
	);
};

export default Toolbar;