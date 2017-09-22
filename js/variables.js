// Global objects.
var objTransition = undefined;
var objControl;

// Game setup.
var playerChar = [];
var playerTamatomo = [];
var playerPoints = [];
resetPlayers();

// Global variables.
var menuLanguageEnable = false;
var menuLanguage = 0;
var menuBackScroll = 0;
var menuBackTick = 1;
var gameSpeed = 2;
var gameSpeedValues = [.25, .5, 1, 2, 4];
var gameVolume = .1;

// Minigame controllers.
var minigameControl = [MinigameGolf];