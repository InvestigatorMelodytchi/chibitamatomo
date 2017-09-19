// Sub-controller object.
function MinigameTest(fPlay, fMommy) {
	// Variables.
	this.gamePlayer = fPlay;
	this.objMommy = fMommy;
	this.timeLeft = 3;
	this.timeTick = 60;
	this.bumpUp = false;
	this.bumpTick = 20;
	this.testLose = false;
	this.testActor = new Actor(spr_player[playerChar[this.gamePlayer]], 160, 128);
	
	// Running.
	this.Run = function() {
		// Timing out.
		if (this.timeTick > 0) {
			if (this.timeLeft > -2) this.timeTick--;
		}
		else {
			this.timeTick = 60;
			this.timeLeft--;
			if (this.timeLeft == 0 && !this.testLose) {
				this.testActor.Perform(2, undefined);
				this.objMommy.mommyFace = 2;
			}
			else if (this.timeLeft == -2) {
				objControl.End(1000 * (!this.testLose));
			}
		}
	}
	
	// Clicky.
	this.Click = function() {
		if (this.timeLeft > 0) {
			this.testActor.Perform(3, undefined);
			this.timeLeft = 0;
			this.timeTick = 60;
			this.testLose = true;
			this.objMommy.mommyFace = 3;
		}
	}
	
	// Drawing.
	this.Draw = function() {
		// Running.
		if (objTransition == undefined) this.Run();
		
		// Background.
		drawSpriteNormal(spr_menu_back, 0, 0, 99, 28);
		
		// Tama.
		this.testActor.Draw();
		
		// Text.
		env.context.font = "80px Consolas";
		env.context.fillText(Math.max(this.timeLeft, 0), 300, 120);
	}
}