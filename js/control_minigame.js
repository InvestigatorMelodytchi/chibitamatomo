// Minigame base controller.
function ControlMinigame(fMini, fPlay, fFree) {
	// Variables.
	this.objMommy = new Mommy(2 + fMini);
	this.objControl = objControl;
	this.gameStart = getSec(2);
	this.gamePlayer = fPlay;
	this.gameControl = new minigameControl[0](fPlay, this.objMommy);
	this.gameFree = fFree;
	this.gameStatus = -1;
	this.statusY = 0;
	this.statusGrav = 2.5;
	this.conMusic = this.gameControl.conMusic;
	
	// Status falling.
	this.Fall = function() {
		if (this.statusY < 79) this.statusGrav += .2;
		this.statusY += this.statusGrav;
		if (this.statusY >= 79) {
			if (this.statusGrav > 0) snd_gen_bounce.Play();
			this.statusY = 79;
			if (this.statusGrav > 1) this.statusGrav *= -.5;
			else this.statusGrav = 0;
		}
	}
	
	// Initiating grade.
	this.Grade = function(fIn) {
		this.gameStatus = fIn;
		if (fIn == 0) snd_gen_bad.Play();
		else if (fIn == 1) snd_gen_okay.Play();
		else if (fIn == 2) snd_gen_good.Play();
		else if (fIn == 3) snd_gen_great.Play();
	}
	
	// Ending minigame.
	this.End = function(fRew) {
		// Returning.
		TransGo(this.objControl);
	}
	
	// Clicky.
	this.Click = function() {
		// Back (free play).
		if (this.gameFree && MousePointNormal(0, 4, 83, 30)) {
			this.End(0);
			snd_menu_cancel.Play();
		}
		
		// Minigame specific.
		else this.gameControl.Click();
	}
	
	// Drawing.
	this.Draw = function() {
		// Minigame.
		this.gameControl.Draw();
		
		// Falling.
		this.Fall();
		
		// Start.
		if (this.gameStart > 0) {
			this.gameStart--;
			drawSpriteNormal(spr_mini_start, 0, 0, 125, this.statusY);
		}
		
		// Score.
		else if (this.gameStatus > -1) drawSpriteNormal(spr_mini_score, 0, this.gameStatus, 160 - Math.ceil(spr_mini_score.sprWidth / 4), this.statusY);
		
		// Reset.
		else {
			this.statusY = -22;
			this.statusGrav = 0;
		}
		
		// Border.
		drawSpriteNormal(spr_mini_back, 0, 0, 0, 0);
		
		// Mommy.
		this.objMommy.Draw();
		
		// Back button.
		if (this.gameFree) drawSpriteNormal(spr_menu_button_setup, menuLanguage, 0, -88, 4);
	}
}