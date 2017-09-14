// Generic menu function.
function MenuDraw(fSpr) {
	// Title and background.
	drawSpriteNormal(spr_menu_back, 0, 0, menuBackScroll, menuBackScroll);
	drawSpriteNormal(spr_menu_title, 0, 0, 94, 8);
	
	// Menu buttons.
	if (fSpr != undefined) drawSpriteNormal(fSpr, 0, 0, 0, 120);
}

// Test controller.
function ControlTest() {
	// Clicky.
	this.Click = function() {
		if (MousePointNormal(0, 120, 171, 146)) TransGo(ControlMainMenu);
	}
	
	// Drawing.
	this.Draw = function() {
		MenuDraw(spr_menu_button_test);
	}
}

// Main menu controller.
function ControlMainMenu() {
	// Clicky.
	this.Click = function() {
		if (MousePointNormal(0, 120, 171, 146)) TransGo(ControlSetupMenu);
	}
	
	// Drawing.
	this.Draw = function() {
		MenuDraw(spr_menu_button_main);
	}
}

// Setup menu controller.
function ControlSetupMenu() {
	// Setup handling.
	this.menuPlayer = 0;
	this.menuChar = -1;
	
	// Clicky.
	this.Click = function() {
		// Cancel.
		if (MousePointNormal(0, 8, 171, 34)) {
			if (this.menuPlayer > 0) {
				this.menuPlayer--;
				playerChar[this.menuPlayer] = -1;
			}
			else TransGo(ControlMainMenu);
		}
		
		// Game speed.
		else if (MousePointNormal(215, 25, 320, 51)) {
			if (gameSpeed < 4) gameSpeed++;
			else gameSpeed = 0;
		}
		
		// Selecting.
		else if (this.menuChar > -1 && this.menuPlayer < 4 && !checkForChar(this.menuChar)) {
			playerChar[this.menuPlayer] = this.menuChar;
			this.menuPlayer++;
		}
	}
	
	// Drawing.
	this.Draw = function() {
		// Background.
		drawSpriteNormal(spr_menu_back, 0, 0, menuBackScroll, menuBackScroll);
		
		// Buttons.
		drawSpriteNormal(spr_menu_button_setup, 0, 0, 0, 8);
		if (this.menuPlayer > 1) drawSpriteNormal(spr_menu_button_setup, 0, 1, 0, 42);
		drawSpriteNormal(spr_menu_speed, 0, gameSpeed, 215, 25);
		
		// Players.
		for (i = 0; i < 4; i++) {
			if (this.menuPlayer >= i) drawSpriteNormal(spr_menu_player, i, 0, 8, 75 + (i * 41));
			if (this.menuPlayer == i) drawSpriteNormal(spr_menu_char_locked, 0, 0, 40, 75 + (i * 41));
			else if (this.menuPlayer > i) drawSpriteNormal(spr_menu_char, 0, playerChar[i], 40, 75 + (i * 41));
		}
		
		// Characters.
		for (i = 0; i < 4; i++) drawSpriteNormal(spr_menu_char, checkForChar(i), i, 113 + (i * 48), 102);
		for (i = 0; i < 4; i++) drawSpriteNormal(spr_menu_char, checkForChar(i + 4), i + 4, 113 + (i * 48), 143);
		for (i = 0; i < 4; i++) drawSpriteNormal(spr_menu_char, checkForChar(i + 8), i + 8, 113 + (i * 48), 184);
		
		// Character name.
		this.menuChar = -1;
		if (MousePointNormal(113, 102, 304, 222)) {
			for (j = 0; j < 3; j++) {
				for (i = 0; i < 4; i++) {
					if (MousePointNormal(113 + (i * 48), 102 + (j * 41), 160 + (i * 48), 140 + (j * 41))) {
						this.menuChar = i + (j * 4);
						break;
					}
				}
			}
		}
		if (this.menuChar > -1 && this.menuPlayer < 4 && !checkForChar(this.menuChar)) drawSpriteNormal(spr_menu_name, 0, this.menuChar, 154, 75);
	}
}