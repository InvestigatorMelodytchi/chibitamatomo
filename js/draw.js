// Interval drawing function.
function drawInterval() {
	// Clearing canvas.
	env.clear();
	
	// Test cursor.
	//drawSprite(spr_test, mouseState, 0, mouseX, mouseY - 4);
	
	// Drawing from controller.
	objControl.Draw();
	
	// Drawing transition.
	if (objTransition != undefined) objTransition.Draw();
}

// Simpler drawing function.
function drawSpriteFull(fSpr, fLeft, fTop, fWidth, fHeight, fX, fY) {
	env.context.drawImage(fSpr, fLeft, fTop, fWidth, fHeight, Math.round(fX), Math.round(fY), fWidth, fHeight);
}

// Even simpler drawing function.
function drawSprite(fSpr, fCol, fRow, fX, fY) {
	// Unset dimensions.
	if (fSpr.sprWidth == 0 || fSpr.sprHeight == 0) {
		fSpr.sprWidth = fSpr.width / fSpr.sprCol;
		fSpr.sprHeight = fSpr.height / fSpr.sprRow;
		//console.log("Dimensions set. " + fSpr.src + " has sprite dimensions " + fSpr.sprWidth + "x" + fSpr.sprHeight + ".");
	}
	
	// Calling function.
	drawSpriteFull(fSpr, (fCol * fSpr.sprWidth), (fRow * fSpr.sprHeight), fSpr.sprWidth, fSpr.sprHeight, fX, fY);
}

// Calling simple drawing with 1x resolution given.
function drawSpriteNormal(fSpr, fCol, fRow, fX, fY) {
	drawSprite(fSpr, fCol, fRow, fX * 2, fY * 2);
}