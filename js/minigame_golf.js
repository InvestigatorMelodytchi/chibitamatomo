// Sub-controller object.
function MinigameGolf(fPlay, fMommy) {
	// Variables.
	this.objMommy = fMommy;
	this.gamePlayer = fPlay;
	this.gameActor = new Actor(spr_player[playerChar[this.gamePlayer]], 116, 102);
	this.gameBall = new MiniGolfBall();
	this.gameHole = new MiniGolfHole();
	this.gameScore = 0;
	this.gameLevel = 0;
	this.gameSheet = [false, false, false, false, false];
	this.gameWait = getSec(2.5);
	this.gameTick = this.gameWait + 1;
	this.gameDone = false;
	this.gameFinish = false;
	this.clubFrame = 0;
	this.clubTick = 0;
	this.clubPower = 3.5;
	this.aimTick = 0;
	this.aimWait = 0;
	this.aimMax = 5;
	this.animSplit = (1/1.5);
	
	// Running.
	this.Run = function() {
		// Aiming.
		if (this.aimWait > 0) this.aimWait--;
		else {
			this.aimWait = 4;
			if (this.aimTick < this.aimMax - 1) this.aimTick ++;
			else this.aimTick = 0;
		}
		
		// Game ended.
		if (this.gameFinish) {
			if (this.gameTick > 0) this.gameTick--;
			else objControl.End(100 * this.gameScore);
		}
		
		// After stroke.
		else if (this.gameDone) {
			// Ticking down.
			this.gameTick--;
			
			// Scoring.
			if (this.gameTick == this.gameWait - 30) {
				this.gameSheet[this.gameLevel] = (this.gameHole.holeFull);
				if (this.gameSheet[this.gameLevel]) this.gameActor.Perform(1, this.gameTick);
				else this.gameActor.Perform(3, this.gameTick);
				this.gameLevel++;
				if (this.gameBall == undefined) this.gameScore++;
			}
		
			// After reaction.
			else if (this.gameTick == 0) {
				// Reset.
				this.clubFrame = 0;
				
				// Moving on.
				if (this.gameLevel < 5) {
					this.gameBall = new MiniGolfBall();
					this.gameHole = new MiniGolfHole();

					this.gameTick = this.gameWait + 1;
					this.gameDone = false;
				}
				
				// Ending game.
				else {
					if (this.gameScore == 5) {
						this.gameActor.Perform(2, undefined);
						this.objMommy.mommyFace = 2;
					}
					else if (this.gameScore >= 1) {
						this.gameActor.Perform(1, undefined);
					}
					else {
						this.gameActor.Perform(3, undefined);
						this.objMommy.mommyFace = 3;
					}
					objControl.gameStatus = ((this.gameScore >= 1) + (this.gameScore >= 3) + (this.gameScore == 5));
					this.gameTick = getSec(3);
					this.gameFinish = true;
				}
			}
		}
		
		// Ball.
		else if (this.gameBall != undefined) {
			// Moving.
			this.gameBall.Move();
			
			// Hole interaction.
			if (valueBetween(this.gameHole.x - 2, this.gameBall.x, this.gameHole.x + 4) && valueBetween(this.gameHole.y - 1, this.gameBall.y, this.gameHole.y + 3) && this.gameBall.Grounded()) {
				// Skipping.
				if (Math.abs(this.gameBall.ballSpeed) >= .5) this.gameBall.Skip();
				
				// Sinking.
				else if (Math.abs(this.gameBall.ballSpeed) >= .01 || Math.abs(this.gameBall.x - (this.gameHole.x + 1)) > 1 || Math.abs(this.gameBall.y - (this.gameHole.y + 2)) > 1) this.gameBall.Sink(this.gameHole.x + 1, this.gameHole.y + 2);
				
				// Sunk.
				else {
					this.gameDone = true;
					this.gameBall = undefined;
					this.gameHole.holeFull = true;
				}
			}
			
			// Stopped.
			else if (this.gameBall.ballSpeed == 0 && this.gameBall.Grounded() && this.gameBall.ballHit) this.gameDone = true;
		}
		
		// Club animation.
		if (this.clubFrame == 1) {
			if (this.clubTick > 0) this.clubTick--;
			else this.clubFrame = 2;
		}
	}
	
	// Clicky.
	this.Click = function() {
		// Hitting ball.
		if (this.gameBall != undefined) {
			if (!this.gameBall.ballHit && this.gameBall.Grounded()) {
				if (MousePointNormal(156, 98, 221, 120)) {
					this.clubFrame = 1;
					this.clubTick = 4;
					this.gameBall.Hit(calcDistance(this.gameBall.x, this.gameBall.y, mouseX / 2, mouseY / 2), calcDirection(this.gameBall.x, this.gameBall.y, mouseX / 2, mouseY / 2), this.clubPower);
				}
			}
		}
	}
	
	// Drawing.
	this.Draw = function() {
		// Running.
		if (objTransition == undefined) this.Run();
		
		// Background.
		drawSpriteNormal(spr_mini_golf_back, 0, 0, 99, 28);
		
		// Hole.
		this.gameHole.Draw();
		
		// Tama.
		this.gameActor.Draw();
		
		// Golf club.
		drawSpriteNormal(spr_mini_golf_club, this.clubFrame, 0, this.gameActor.x - 16, (this.gameActor.y + this.gameActor.animY) - 5);
		
		// Ball.
		if (this.gameBall != undefined) {
			this.gameBall.Draw();
			
			// Aiming.
			if (!this.gameBall.ballHit && MousePointNormal(156, 98, 221, 120) && this.gameBall.Grounded()) {
				tempMax = (this.clubPower * 2) / .1;
				for(i = this.aimTick * this.animSplit; i < tempMax; i += this.aimMax * this.animSplit) {
					drawSpriteNormal(spr_mini_golf_marker, 0, 0, getBetween(this.gameBall.x, (mouseX / 2), i / tempMax), getBetween(this.gameBall.y - 2, (mouseY / 2) - 2, i / tempMax) - (65 * sin(180 * (i / tempMax))));
				}
				drawSpriteNormal(spr_mini_golf_cursor, 0, 0, (mouseX / 2) - 5, (mouseY / 2) - 15);
			}
		}
		
		// Score.
		for(i = 0; i < 5; i++) {
			drawSpriteNormal(spr_mini_golf_score, (this.gameLevel > i) + this.gameSheet[i], 0, 100 + (i * 12), 29);
		}
	}
}

// Ball object.
function MiniGolfBall() {
	// Variables.
	this.x = 115;
	this.y = 109;
	this.loft = -96;
	this.ballHit = false;
	this.ballDir = 0;
	this.ballSpeed = 0;
	this.ballGrav = 0;
	
	// In the rough.
	this.inRough = function() {
		return(false);
	}
	
	// Skipping.
	this.Skip = function() {
		this.ballGrav = -Math.sqrt(this.ballSpeed * 2);
		this.ballSpeed *= (1/3);
	}
	
	// Sinking.
	this.Sink = function(fX, fY) {
		this.ballGrav = -Math.max(Math.sqrt(this.ballSpeed * 2.5), .5);
		this.ballDir = calcDirection(this.x, this.y, fX, fY);
		this.ballSpeed = calcDistance(this.x, this.y, fX, fY) / ((Math.abs(this.ballGrav) * 2) / .1);
	}
	
	// Hitting.
	this.Hit = function(fDis, fDir, fPow) {
		this.ballHit = true;
		this.ballGrav = -fPow;
		this.ballDir = fDir;
		this.ballSpeed = fDis / ((fPow * 2) / .1);
		/*console.clear();
		console.log("Distance: " + fDis);
		console.log("Speed: " + this.ballSpeed);
		console.log("Direction: " + this.ballDir);
		console.log("X Movement: " + xDir(this.ballSpeed, this.ballDir));
		console.log("Y Movement: " + yDir(this.ballSpeed, this.ballDir));*/
	}
	
	// Grounded.
	this.Grounded = function() {
		return(this.loft >= 0 && this.ballGrav == 0);
	}
	
	// Moving.
	this.Move = function() {
		// Out of bounds.
		if (this.x >= 222) {
			this.loft = 0;
			this.ballGrav = 0;
			this.ballSpeed = 0;
		}
		
		// Falling/bouncing.
		else if (!this.Grounded()) {
			this.loft += this.ballGrav;
			this.ballGrav += .1;
			if (this.loft >= 0) {
				this.loft = 0;
				if (this.ballGrav >= 3 && !this.inRough()) {
					this.ballGrav = -(this.ballGrav * (1/5));
					this.ballSpeed *= .75;
				}
				else this.ballGrav = 0;
			}
		}
		
		// Rolling to a stop.
		else if (this.ballSpeed > 0) {
			if (this.ballSpeed > .01) {
				if (this.inRough()) this.ballSpeed *= .85;
				else this.ballSpeed *= .95;
			}
			else this.ballSpeed = 0;
		}
		
		// Moving.
		this.x += xDir(this.ballSpeed, this.ballDir);
		this.y += yDir(this.ballSpeed, this.ballDir);
	}
	
	// Drawing.
	this.Draw = function() {
		// Shadow.
		drawSpriteNormal(spr_mini_golf_shadow, 0, 0, this.x - 2, this.y - 2 + (9 * valueBetween(140, this.x, 150)));
		
		// Ball.
		drawSpriteNormal(spr_mini_golf_ball, 0, 0, this.x - 2, this.y - 4 + this.loft);
	}
}

// Hole object.
function MiniGolfHole() {
	// Variables.
	this.x = randomRange(177, 207);
	this.y = randomRange(104, 112);
	this.holeFull = false;
	
	// Drawing.
	this.Draw = function() {
		drawSpriteNormal(spr_mini_golf_hole, this.holeFull, 0, this.x - 1, this.y - 1);
	}
}