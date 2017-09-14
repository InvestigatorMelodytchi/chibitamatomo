// Seeing if the character has been selected.
function checkForChar(fChar) {
	for (fi = 0; fi < 4; fi++) {
		if (playerChar[fi] == fChar) return(true);
	}
	return(false);
}