// Generic menu function.
function MenuDraw(fSpr) {
	// Title and background.
	drawSpriteNormal(spr_menu_back, 0, 0, menuBackScroll, menuBackScroll);
	drawSpriteNormal(spr_menu_title, 0, 0, 94, 8);
	
	// Menu buttons.
	if (fSpr != undefined) drawSpriteNormal(fSpr, menuLanguage, 0, 0, 120);
}

// Minimal menu function.
function MenuDrawMini() {
	// Background.
	drawSpriteNormal(spr_menu_back, 0, 0, menuBackScroll, menuBackScroll);
	
	// Back Button.
	drawSpriteNormal(spr_menu_button_setup, menuLanguage, 0, 0, 8);
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
	
	// Music.
	this.conMusic = msc_menu;
	
	// Clicky.
	this.Click = function() {
		if (MousePointNormal(0, 120, 171, 146)) {TransGo(new ControlSetupMenu()); snd_menu_confirm.Play();}
		else if (MousePointNormal(0, 150, 171, 176)) {TransGo(new ControlViewMenu()); snd_menu_confirm.Play();}
		else if (MousePointNormal(0, 210, 171, 236)) {TransGo(new ControlMiniCharMenu()); snd_menu_confirm.Play();}
		else if (MousePointNormal(282, 208, 318, 236) && menuLanguageEnable) {menuLanguage = !(menuLanguage); snd_menu_confirm.Play();}
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
	
	// Music.
	this.conMusic = msc_menu;
	
	// Clicky.
	this.Click = function() {
		// Cancel.
		if (MousePointNormal(0, 8, 171, 34)) {
			if (this.menuPlayer > 0) {
				this.menuPlayer--;
				playerChar[this.menuPlayer] = -1;
			}
			else TransGo(new ControlMainMenu());
			snd_menu_cancel.Play();
		}
		
		// Game speed.
		else if (MousePointNormal(215, 25, 320, 51)) {
			if (gameSpeed < 4) gameSpeed++;
			else gameSpeed = 0;
			snd_menu_select.Play();
		}
		
		// Selecting.
		else if (this.menuChar > -1 && this.menuPlayer < 4 && !checkForChar(this.menuChar)) {
			playerChar[this.menuPlayer] = this.menuChar;
			this.menuPlayer++;
			snd_menu_select.Play();
		}
	}
	
	// Drawing.
	this.Draw = function() {
		// Menu.
		MenuDrawMini();
		
		// Buttons.
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
	// Music.
	this.conMusic = msc_menu;
	
	// Clicky.
	this.Click = function() {
		if (MousePointNormal(0, 120, 171, 146)) {
			TransGo(new ControlMainMenu());
			snd_menu_cancel.Play();
		}
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


// Online tamatomo menu controller.

// Minigame character menu controller.
function ControlMiniCharMenu() {
	// Setup handling.
	this.menuChar = -1;
	this.objMommy = new Mommy(0);
	
	// Music.
	this.conMusic = msc_menu;
	
	// Clicky.
	this.Click = function() {
		// Cancel.
		if (MousePointNormal(0, 8, 171, 34) && !gameDemoMode) {
			playerChar[0] = -1;
			this.objMommy.mommyFace = 0;
			TransGo(new ControlMainMenu());
			snd_menu_cancel.Play();
		}
		
		// Selecting.
		else if (this.menuChar > -1) {
			playerChar[0] = this.menuChar;
			this.objMommy.mommyFace = 2;
			TransGo(new ControlMiniPickMenu());
			snd_menu_confirm.Play();
		}
	}
	
	// Drawing.
	this.Draw = function() {
		// Menu.
		if (gameDemoMode) drawSpriteNormal(spr_menu_back, 0, 0, menuBackScroll, menuBackScroll);
		else MenuDrawMini();
		
		// Characters.
		this.menuBlink = !(this.menuBlink);
		if (playerChar[0] == -1) this.menuChar = -1;
		else this.menuChar = playerChar[0];
		for (j = 0; j < 2; j++) {
			for (i = 0; i < 6; i++) {
				drawSpriteNormal(spr_menu_char, (playerChar[0] != i + (j * 6) && playerChar[0] != -1), i + (j * 6), 17 + (i * 48), 65 + (j * 41));
				if (MousePointNormal(17 + (i * 48), 65 + (j * 41), 64 + (i * 48), 103 + (j * 41)) && playerChar[0] == -1) {
					this.menuChar = i + (j * 6);
					drawSpriteNormal(spr_menu_char_select, 0, 0, 17 + (i * 48), 65 + (j * 41));
				}
			}
		}
		
		// Character name.
		if (this.menuChar > -1 || playerChar[0] > -1) drawSpriteNormal(spr_menu_name, menuLanguage, this.menuChar, 106, 38);
		
		// Mommy.
		this.objMommy.Draw();
	}
}

// Minigame selection menu controller.
function ControlMiniPickMenu() {
	// Setup handling.
	this.menuChar = playerChar[0];
	this.menuGame = -1;
	this.menuLock = false;
	this.objMommy = new Mommy(1);
	
	// Music.
	this.conMusic = msc_menu;
	
	// Clicky.
	this.Click = function() {
		// Cancel.
		if (MousePointNormal(0, 8, 171, 34)) {
			playerChar[0] = -1;
			this.objMommy.mommyFace = 0;
			TransGo(new ControlMiniCharMenu());
			snd_menu_cancel.Play();
		}
		
		// Selecting.
		else if (this.menuGame > -1) {
			this.menuLock = true;
			this.objMommy.mommyFace = 2;
			TransGo(new ControlMinigame(this.menuGame, 0, true));
			snd_menu_confirm.Play();
		}
	}
	
	// Drawing.
	this.Draw = function() {
		// Resetting.
		this.Reset();
		
		// Menu.
		MenuDrawMini();
		
		// Selected character.
		drawSpriteNormal(spr_menu_char, 0, this.menuChar, 270, 2);
		
		// Minigames.
		if (!this.menuLock) this.menuGame = -1;
		for (i = 0; i < Math.ceil(minigameControl.length / 2); i++) this.DrawGame(Math.ceil(minigameControl.length / 2), 0);
		for (i = 0; i < Math.floor(minigameControl.length / 2); i++) this.DrawGame(Math.floor(minigameControl.length / 2), 1);
		
		// Minigame name.
		if (this.menuGame > -1) drawSpriteNormal(spr_menu_minigame_name, menuLanguage, this.menuGame, 106, 38);
		
		// Mommy.
		this.objMommy.Draw();
	}
	
	// Drawing minigame.
	this.DrawGame = function(fWid, fRow) {
		tX = 160 - ((fWid * 48) / 2) + (i * 48);
		tId = i + (fRow * Math.ceil(minigameControl.length / 2));
		drawSpriteNormal(spr_menu_minigame_icon, tId, fRow, tX, 65 + (fRow * 41));
		if (MousePointNormal(tX, 65 + (fRow * 41), tX + 47, 103 + (fRow * 41)) && !this.menuLock) this.menuGame = tId;
		if (this.menuGame == tId) drawSpriteNormal(spr_menu_char_select, 0, 0, tX, 65 + (fRow * 41));
	}
	
	// Resetting.
	this.Reset = function() {
		if (objTransition != undefined) {
			if (objTransition.nextControl == this) {
				this.menuGame = -1;
				this.menuLock = false;
				this.objMommy = new Mommy(1);
			}
		}
	}
}