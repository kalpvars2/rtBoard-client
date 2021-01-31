import React, { useEffect } from 'react';
import {ReactComponent as PencilSVG} from '../../assets/svg/pencil.svg';
import {ReactComponent as EraserSVG} from '../../assets/svg/eraser.svg';
import {ReactComponent as StickyNoteSVG} from '../../assets/svg/stickyNote.svg';
import {ReactComponent as DownloadSVG} from '../../assets/svg/download.svg';
import {ReactComponent as UndoSVG} from '../../assets/svg/undo.svg';
import {ReactComponent as RedoSVG} from '../../assets/svg/redo.svg';
import {ReactComponent as SaveSVG} from '../../assets/svg/save.svg';
import {ReactComponent as ToolExpanderSVG} from '../../assets/svg/toolExpander.svg';
import { Undo, Redo, Redraw } from '../../helperFunctions';
import './Toolbar.css';

const Toolbar = ({undoStack, redoStack}) => {
	useEffect(() => {
		const pencil = document.getElementById('pencil');
		const eraser = document.getElementById('eraser');
		const undo = document.getElementById('undo');
		const redo = document.getElementById('redo');
		const board = document.getElementById('board');
		const ctx = board.getContext('2d');
		
		pencil.addEventListener('click', () => {
			pencil.classList.add('selectedTool');
			eraser.classList.remove('selectedTool');
		});

		eraser.addEventListener('click', () => {
			eraser.classList.add('selectedTool');
			pencil.classList.remove('selectedTool');
		});

		undo.addEventListener('click', (event) => {
			Undo(undoStack, redoStack);
			Redraw(ctx, board, undoStack);
		});

		redo.addEventListener('click', (event) => {
			Redo(undoStack, redoStack);
			Redraw(ctx, board, undoStack);
		});

	}, []);

	return (
		<div className={"toolbar"}>
			<PencilSVG title="Pencil" id = {"pencil"} className={"tool"}/>
			<EraserSVG title="Eraser" id = {"eraser"} className={"tool"} />
			<StickyNoteSVG title="Sticky Note" style= {{width: "auto"}} className={"tool"} />
			<DownloadSVG title="Download Screenshot" style = {{width: "auto"}} className={"tool"} />
			<UndoSVG title="Undo" id={"undo"} className={"tool"} />
			<RedoSVG title="Redo" id={"redo"} className={"tool"} />
			<SaveSVG title="Save" style={{width: "auto"}} className={"tool"} />
		</div>
	);
};

export default Toolbar;