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
	drawSprite(fSpr, fCol, fRow, Math.round(fX) * 2, Math.round(fY) * 2);
}