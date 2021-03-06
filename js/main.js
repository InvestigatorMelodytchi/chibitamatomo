// Actually starting the game.
function startGame() {
	env.start();
	if (gameDemoMode) objControl = new ControlMiniCharMenu();
	else objControl = new ControlMainMenu();
}

// Initializing canvas.
var env = {
	// Creating canvas.
	canvas : document.createElement("canvas"),
	
	// Start function.
	start : function() {
		// Dimensions.
		this.canvas.width = 640;
		this.canvas.height = 480;
		
		// Other settings.
		this.interval = setInterval(gameInterval, 1000/60);
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		
		// Key inputs.
		window.addEventListener('keydown', function (e) {
			env.keys = (env.keys || []);
			env.keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function (e) {
			env.keys[e.keyCode] = false; 
		})
		
		// Mouse inputs.
		window.addEventListener('mousemove', function (e) {
            getMousePos(e);
        })
		window.addEventListener('mousedown', function (e) {
			MouseClick();
        })
        window.addEventListener('mouseup', function (e) {
            mouseState = 0;
        })
        window.addEventListener('touchstart', function (e) {
			getMousePos(e);
			MouseClick();
        })
        window.addEventListener('touchend', function (e) {
            mouseState = 0;
        })
	},
	
	// Clear function.
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

// Transition object.
function Transition(fNext) {
	// Variables.
	this.x = -(spr_transition.width / 2);
	this.nextControl = fNext;
	this.doTick = 0;
	this.musicQueue = undefined;
	
	// Moving.
	this.Act = function() {
		if (this.doTick > 0) this.doTick--;
		else {
			this.x += 32;
			this.doTick = 1;
		}
		if (this.x == -256) {
			playMusic(this.nextControl.conMusic);
			objControl = this.nextControl;
		}
		else if (this.x >= 320) {
			objTransition = undefined;
		}
	}
	
	// Drawing.
	this.Draw = function() {
		drawSpriteNormal(spr_transition, 0, 0, this.x, 0);
	}
}

// Transition script.
function TransGo(fNext) {
	objTransition = new Transition(fNext);
}