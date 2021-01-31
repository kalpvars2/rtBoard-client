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
			ctx.lineTo(x, y);
			ctx.stroke();
		} else if(identifier === 'mousedown'){
			ctx.beginPath();
			ctx.moveTo(x, y);
		}
	}
};