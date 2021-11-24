/**
 * File keyhandler.js
 * implemented by Adelino Lobão
 * 14/01/2012
 */

/**
 * Class KeyHandler
 */
function KeyHandler() {
	//define the Z key
 	this.Z_KEY = 97;
 	this.z_KEY = 65;
 	//define the X key
 	this.X_KEY = 100;
 	this.x_KEY = 68;
 	//define the space key
	this.W_KEY = 119;
	//this.space_KEY = 87;
	var canFire = true
 	

 	/**
 	 * Handle the events when a key is pressed
 	 * @param e - event
 	 * @param player - player
 	 */
 	this.keyPress = function(e) {
 		keyPressed = e.which ? e.which : window.event.keyCode;
		console.log(window.event.keyCode)
 		switch(keyPressed) {
 			case this.Z_KEY:
 			case this.z_KEY:
 				player.movingLeft = true;
 				break;
 			case this.X_KEY:
 			case this.x_KEY:
 				player.movingRight = true;
 				break;
			/*case this.SPACE_KEY:
 			case this.space_KEY:
 				lasers[lasers.length] = new Laser(player);
 				break;*/
 		}


 	}

 	/**
 	 * Handle the events when a key is pressed
 	 * @param e - event
 	 * @param player - player
 	 */

  	this.keyPress2 = function(e) {
 		keyPressed = e.which ? e.which : window.event.keyCode;
		console.log(window.event.keyCode)
		if(keyPressed==this.W_KEY && canFire == true){
			canFire = false;
			lasers[lasers.length] = new Laser(player);
			setTimeout(Fire, 200);
		}


 	}

 	function Fire() {
 		canFire = true
 	}

 	/**
 	 * Handle events when key is released
 	 * @param e - event
 	 */
 	this.keyUp = function(e) {
 		keyPressed = e.which ? e.which : window.event.keyCode;

 		switch(keyPressed) {
 			case this.Z_KEY:
 			case this.z_KEY:
 				player.movingLeft = false;
 				break;
 			case this.X_KEY:
 			case this.x_KEY:
 				player.movingRight = false;
 				break;
 		}
 	}
}