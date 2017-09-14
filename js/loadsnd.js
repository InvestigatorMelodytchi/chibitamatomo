// Function for more convenient sound loading.
function loadSnd(file, ismusic) {
	if (ismusic) {this.tempRe = new Music("snd/" + file + ".ogg");}
	else {this.tempRe = new Sound("snd/" + file + ".ogg");}
	return (tempRe);
}