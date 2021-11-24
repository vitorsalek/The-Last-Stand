/**
 * File enemy.js
 * implemented by Adelino Lobão
 * 19/01/2012
 */

/**
 * Class Enemy
 * @param initPosX - initial position xx
 * @param initPosY - initial position yy
 * @param amplitude
 */
function Enemy(initPosX, initPosY, amplitude) {

	var initialPosX=initPosX;

	//image src
	var imgSrc = './images/rsz_enemy2.png';
	//width
	this.width = 44;
	//height
	this.height = 32;

	//enemy sprite
	var sprite = new Sprite(3);
	//set image and size
	sprite.initImage(imgSrc, this.width, this.height);
	//set initial position of the sprite
	sprite.initPosition(initPosX, initPosY);

	//initial action
	var currentAction = 'left';

	/**
	 * Draws the enemy sprite
	 */
	this.draw = function() {
		sprite.draw();
	}

	/**
	 * Simulates one step of the enemy
	 * @param action - indicates the action of the enemy
	 */
	this.step = function() {
		if(currentAction == 'left') {
			sprite.moveLeft();
		}else if(currentAction == 'right') {
			sprite.moveRight();
		}
	}

	/**
	 * Simulates one jump forward
	 */
	this.jump = function() {
		if(currentAction == 'left') {
			currentAction = 'right';
		}else {
			currentAction = 'left';
		}
		sprite.moveFront();
	}

	/**
	 * Verifies if the enemies needs to change of action
	 */
	this.checkStep = function() {
		if(sprite.x <= 10 && currentAction == 'left' ||  this.getPositionX()<=(initialPosX-amplitude)) {
			currentAction = 'right';
		}else if(sprite.x >= (WINDOW_WIDTH - 10) && currentAction == 'right' || this.getPositionX()>=(initialPosX+amplitude)) {
			currentAction = 'left';
		}
		
		return currentAction;
	}

	/**
	  * Return the position xx of the enemy
	  */
	 this.getPositionX = function() {
	 	return sprite.x;
	 }

	 /**
	  * Return the position yy of the enemy
	  */
	 this.getPositionY = function() {
	 	return sprite.y;
	 }
}