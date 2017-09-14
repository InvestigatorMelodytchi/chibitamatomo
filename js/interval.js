//

// Interval function.
function gameInterval() {
	// Drawing.
	drawInterval();
	
	// Transition.
	if (objTransition != undefined) objTransition.Act();
	
	// Holding mouse button.
	if (mouseState == 2) mouseState = 1;
	
	// Moving menu background.
	if (menuBackTick > 0) menuBackTick--;
	else {
		menuBackTick = 3;
		if (menuBackScroll > -24) menuBackScroll--;
		else menuBackScroll += 23;
	}
}