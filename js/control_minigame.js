// Minigame base controller.
function ControlMinigame(fMini, fPlay) {
	// Variables.
	this.objMommy = new Mommy(2 + fMini);
	this.objControl = objControl;
	this.gamePlayer = fPlay;
	this.gameControl = new minigameControl[0](fPlay, this.objMommy);
	
	// Ending minigame.
	this.End = function(fRew) {
		// Returning.
		TransGo(this.objControl);
	}
	
	// Clicky.
	this.Click = function() {
		this.gameControl.Click();
	}
	
	// Drawing.
	this.Draw = function() {
		// Minigame.
		this.gameControl.Draw();
		
		// Border.
		drawSpriteNormal(spr_mini_back, 0, 0, 0, 0);
		
		// Mommy.
		this.objMommy.Draw();
	}
}