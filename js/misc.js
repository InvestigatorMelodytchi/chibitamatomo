// Resetting player variables.
function resetPlayers() {
	for (i = 0; i < 4; i++) {
		playerChar[i] = -1;
		playerTamatomo[i] = -1;
		playerPoints[i] = 0;
	}
}

// Seeing if the character has been selected.
function checkForChar(fChar) {
	for (fi = 0; fi < 4; fi++) {
		if (playerChar[fi] == fChar) return(true);
	}
	return(false);
}