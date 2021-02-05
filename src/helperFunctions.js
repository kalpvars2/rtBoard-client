export const Undo = (undoStack, redoStack) => {
	if(undoStack.length){
		while(undoStack.length && undoStack[undoStack.length-1].identifier !== "mousedown")
			redoStack.push(undoStack.pop());
		redoStack.push(undoStack.pop());
		return true;
	}
	return false;
}; 

export const Redo = (undoStack, redoStack) => {
	if(redoStack.length){
		undoStack.push(redoStack.pop());
		while(redoStack.length && redoStack[redoStack.length-1].identifier !== "mousedown")
			undoStack.push(redoStack.pop());
		return true;
	}
	return false;
}; 

export const Redraw = (ctx, board, undoStack) => {
	ctx.clearRect(0, 0, board.width, board.height);
	for(let i = 0; i < undoStack.length; ++i){
		const {x, y, identifier, color, width} = undoStack[i];
		if(identifier === 'mousemove'){
			ctx.strokeStyle = color;
			ctx.lineWidth = width;
			ctx.lineTo(x, y);
			ctx.stroke();
		} else if(identifier === 'mousedown'){
			ctx.beginPath();
			ctx.moveTo(x, y);
		}
	}
	const eraser = document.getElementById('eraser');
	if(eraser.classList[0] === 'selectedTool'){
		ctx.strokeStyle = "#ffffff";
		ctx.lineWidth = document.getElementById('rangeInputEraser').value;
	}
};

export const createBox = () => {
	const stickyPad = document.createElement('div');
	const minimize = document.createElement('div');
	const close = document.createElement('div');
	const navBar = document.createElement('div');
	const workArea = document.createElement('div');
	stickyPad.setAttribute("class", "stickyPad");
	navBar.setAttribute("class", "navBar");
	close.setAttribute("class", "close");
	minimize.setAttribute("class", "minimize");
	workArea.setAttribute("class", "workArea");
	navBar.appendChild(minimize);
	navBar.appendChild(close);
	stickyPad.appendChild(navBar);
	stickyPad.appendChild(workArea);
	document.body.appendChild(stickyPad);
	
	close.addEventListener('click', () => stickyPad.remove());

	let isMinimized = false;
	minimize.addEventListener('click', () => {
		isMinimized ? 
		(workArea.style.display = "block") : 
		(workArea.style.display = "none")
		isMinimized = !isMinimized;
	});

	let initialX = null, initialY = null, isStickyDown = false;

	navBar.addEventListener('mousedown', (e) => {
		initialX = e.clientX;
		initialY = e.clientY;
		isStickyDown = true;
	});

	navBar.addEventListener('mousemove', (e) => {
		if(isStickyDown){
			let finalX = e.clientX;
			let finalY = e.clientY;
			let diffX = finalX - initialX;
			let diffY = finalY - initialY;
			let {top, left} = stickyPad.getBoundingClientRect();
			stickyPad.style.top = top + diffY + "px";
			stickyPad.style.left = left + diffX + "px";
			initialX = finalX;
			initialY = finalY;
		};
	});

	navBar.addEventListener('mouseup', () => {
		isStickyDown = false;
	});

	navBar.addEventListener('mouseleave', () => {
		isStickyDown = false;
	});

	return workArea;
};

