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