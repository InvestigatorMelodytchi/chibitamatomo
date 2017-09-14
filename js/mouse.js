// Mouse variables.
mouseX = 0;
mouseY = 0;
mouseState = 0;

// Getting mouse position.
function getMousePos(e) {
	tempBound = env.canvas.getBoundingClientRect();
	tempDom = document.documentElement;
    mouseX = e.clientX - tempBound.left - 4;
    mouseY = e.clientY - tempBound.top - 4;
}

// Mouse point.
function MousePoint(fXA, fYA, fXB, fYB) {
	return(mouseX >= fXA && mouseY >= fYA && mouseX < fXB && mouseY < fYB);
}

// Mouse point (scale up).
function MousePointNormal(fXA, fYA, fXB, fYB) {
	return(MousePoint(fXA * 2, fYA * 2, fXB * 2, fYB * 2));
}

// Clicking.
function MouseClick() {
	// State.
	mouseState = 2;
	
	// Control.
	if (objTransition == undefined) objControl.Click();
}