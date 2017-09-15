// Generic menu function.
function MenuDraw(fSpr) {
	// Title and background.
	drawSpriteNormal(spr_menu_back, 0, 0, menuBackScroll, menuBackScroll);
	drawSpriteNormal(spr_menu_title, 0, 0, 94, 8);
	
	// Menu buttons.
	if (fSpr != undefined) drawSpriteNormal(fSpr, menuLanguage, 0, 0, 120);
}

// Test controller.
function ControlTest() {
	// Clicky.
	this.Click = function() {
		if (MousePointNormal(0, 120, 171, 146)) TransGo(new ControlMainMenu());
	}
	
	// Drawing.
	this.Draw = function() {
		MenuDraw(spr_menu_button_test);
	}
}

// Main menu controller.
function ControlMainMenu() {
	// Reset.
	resetPlayers();
	
	// Clicky.
	this.Click = function() {
		if (MousePointNormal(0, 120, 171, 146)) TransGo(new ControlSetupMenu());
		else if (MousePointNormal(0, 154, 171, 180)) TransGo(new ControlViewMenu());
		else if (MousePointNormal(282, 208, 318, 236) && menuLanguageEnable) menuLanguage = !(menuLanguage);
	}
	
	// Drawing.
	this.Draw = function() {
		// Menu.
		MenuDraw(spr_menu_button_main);
		
		// Language.
		if (menuLanguageEnable) drawSpriteNormal(spr_menu_flag, menuLanguage, 0, 282, 208);
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
			else TransGo(new ControlMainMenu());
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
		drawSpriteNormal(spr_menu_button_setup, menuLanguage, 0, 0, 8);
		if (this.menuPlayer > 1) drawSpriteNormal(spr_menu_button_setup, menuLanguage, 1, 0, 42);
		drawSpriteNormal(spr_menu_speed, menuLanguage, gameSpeed, 215, 25);
		
		// Players.
		for (i = 0; i < 4; i++) {
			if (this.menuPlayer >= i) drawSpriteNormal(spr_menu_player, i, 0, 8, 75 + (i * 41));
			if (this.menuPlayer == i) drawSpriteNormal(spr_menu_char_locked, 0, 0, 40, 75 + (i * 41));
			else if (this.menuPlayer > i) drawSpriteNormal(spr_menu_char, 0, playerChar[i], 40, 75 + (i * 41));
		}
		
		// Characters.
		this.menuChar = -1;
		for (j = 0; j < 3; j++) {
			for (i = 0; i < 4; i++) {
				drawSpriteNormal(spr_menu_char, checkForChar(i + (j * 4)), i + (j * 4), 113 + (i * 48), 102 + (j * 41));
				if (MousePointNormal(113 + (i * 48), 102 + (j * 41), 160 + (i * 48), 140 + (j * 41)) && !checkForChar(i + (j * 4)) && this.menuPlayer < 4) {
					this.menuChar = i + (j * 4);
					drawSpriteNormal(spr_menu_char_select, 0, 0, 113 + (i * 48), 102 + (j * 41));
				}
			}
		}
		
		// Character name.
		if (this.menuChar > -1 && this.menuPlayer < 4 && !checkForChar(this.menuChar)) drawSpriteNormal(spr_menu_name, menuLanguage, this.menuChar, 154, 75);
	}
}

// View tamatomo menu controller.
function ControlViewMenu() {
	// Clicky.
	this.Click = function() {
		if (MousePointNormal(0, 120, 171, 146)) TransGo(new ControlMainMenu());
	}
	
	// Drawing.
	this.Draw = function() {
		// Menu.
		MenuDraw(spr_menu_button_setup);
		
		// Prompt.
		drawSpriteNormal(spr_menu_tamatomo_prompt, 0, 0, 203, 114);
		
		// Podium.
		drawSpriteNormal(spr_menu_tamatomo_podium, 0, 0, 134, 223);
		
		// Tamatomo.
	}
}