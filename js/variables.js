// Global objects.
var objTransition = undefined;
var objControl;

// Game setup.
var playerChar = [];
var playerTamatomo = [];
for (i = 0; i < 4; i++) {
	playerChar[i] = -1;
	playerTamatomo[i] = -1;
}

// Global variables.
var menuBackScroll = 0;
var menuBackTick = 1;
var gameSpeed = 2;
var gameSpeedValues = [.25, .5, 1, 2, 4];