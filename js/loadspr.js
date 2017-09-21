// Directory variable for easier loading strings.
var loadTempDir = "";

// Function for more convenient sprite loading.
function loadSpr(file, fCol, fRow) {
	this.tempRe = new Image();
	this.tempRe.src = "spr/" + file + ".png";
	this.tempRe.sprCol = fCol;
	this.tempRe.sprRow = fRow;
	this.tempRe.sprWidth = 0;
	this.tempRe.sprHeight = 0;
	return (tempRe);
}

// Test cursor sprite.
var spr_test = loadSpr("testcursor", 3, 1);

// Transition.
var spr_transition = loadSpr("transition", 1, 1);

// Menu sprites.
var spr_menu_title = loadSpr("menu_title", 1, 1);
var spr_menu_back = loadSpr("menu_background", 1, 1);
var spr_menu_button_test = loadSpr("menu_buttons_test", 1, 1);
var spr_menu_button_main = loadSpr("menu_buttons_main", 2, 1);
var spr_menu_button_setup = loadSpr("menu_buttons_setup", 2, 2);
var spr_menu_char = loadSpr("menu_char", 2, 12);
var spr_menu_char_locked = loadSpr("menu_char_locked", 1, 1);
var spr_menu_char_select = loadSpr("menu_char_select", 1, 1);
var spr_menu_player = loadSpr("menu_player", 4, 1);
var spr_menu_name = loadSpr("menu_name", 2, 12);
var spr_menu_speed = loadSpr("menu_speed", 2, 5);
var spr_menu_flag = loadSpr("menu_flag", 2, 1);
var spr_menu_tamatomo_prompt = loadSpr("menu_tamatomo_prompt", 1, 1);
var spr_menu_tamatomo_podium = loadSpr("menu_tamatomo_podium", 2, 1);
var spr_menu_minigame_icon = loadSpr("menu_minigame_icon", minigameControl.length, 1);
var spr_menu_minigame_name = loadSpr("menu_minigame_name", 1, minigameControl.length);

// Board sprites.
var spr_board_tile = loadSpr("board_tile", 7, 1);

// Player sprites.
var spr_player_shadow = loadSpr("player_shadow", 1, 1);
var playerFrames = 5;
var spr_player = [
	loadSpr("player_mero", playerFrames, 1),
	loadSpr("player_makiko", playerFrames, 1),
	loadSpr("player_ane", playerFrames, 1),
	loadSpr("player_kira", playerFrames, 1),
	loadSpr("player_chama", playerFrames, 1),
	loadSpr("player_wata", playerFrames, 1),
	loadSpr("player_piani", playerFrames, 1),
	loadSpr("player_gozaru", playerFrames, 1),
	loadSpr("player_imo", playerFrames, 1),
	loadSpr("player_uwasa", playerFrames, 1),
	loadSpr("player_nyoro", playerFrames, 1),
	loadSpr("player_neo", playerFrames, 1),
];

// Minigame sprites.
var spr_mini_mommy = loadSpr("mini_mommy", 4, 1);
var spr_mini_speech = loadSpr("mini_speech", 1, 1);
var spr_mini_back = loadSpr("mini_back", 1, 1);
var spr_mini_start = loadSpr("mini_start", 1, 1);
var spr_mini_score = loadSpr("mini_score", 1, 4);
var spr_mini_badminton_back = loadSpr("mini_badminton_back", 1, 1);

// Minigame sprites: Golf.
var spr_mini_golf_back = loadSpr("mini_golf_back", 1, 1);
var spr_mini_golf_ball = loadSpr("mini_golf_ball", 1, 1);
var spr_mini_golf_shadow = loadSpr("mini_golf_shadow", 1, 1);
var spr_mini_golf_hole = loadSpr("mini_golf_hole", 2, 1);
var spr_mini_golf_cursor = loadSpr("mini_golf_cursor", 1, 1);
var spr_mini_golf_marker = loadSpr("mini_golf_marker", 1, 1);
var spr_mini_golf_club = loadSpr("mini_golf_club", 3, 1);
var spr_mini_golf_score = loadSpr("mini_golf_score", 3, 1);

// Descriptions.
var spr_description_eng = [
	loadSpr("eng_mini_char", 1, 1),
	loadSpr("eng_mini_select", 1, 1),
	loadSpr("eng_mini_golf", 1, 3),
];
var spr_description_jap = spr_description_eng;