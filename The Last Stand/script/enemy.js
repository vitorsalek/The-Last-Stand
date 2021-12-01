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
function Enemy(initPosX, initPosY, amplitude, speed) {

	var initialPosX=initPosX;

	//image src
	var imgSrc = './images/rsz_enemy5.png';
	//width
	this.width = 44;
	//height
	this.height = 32;

	//enemy sprite
	var sprite = new Sprite(3.2);
	//set image and size
	sprite.initImage(imgSrc, this.width, this.height);
	//set initial position of the sprite
	sprite.initPosition(initPosX, initPosY);

	//initial action
	var currentAction = 'left';

	var previousAction = 'left';

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
	this.checkHeight = function(height) {
		if(sprite.y >= height+10)	return true;
		return false;		
	}

	/**
	 * Simulates one jump forward
	 */
	this.jump = function() {
		sprite.moveFront(speed);		
	}

	/**
	 * Verifies if the enemies needs to change of action
	 */
	this.checkStep = function() 
	{
		if(this.getPositionX() <= 10 && currentAction == 'left' ||  this.getPositionX()<=(initialPosX-amplitude) && currentAction == 'left') {
			currentAction = 'right';
			return true;
		}else if(this.getPositionX() >= (WINDOW_WIDTH - 10) && currentAction == 'right' || this.getPositionX()>=(initialPosX+amplitude) && currentAction == 'right') {
			currentAction = 'left';
			return true;
		}
		return false;
	}

	/**
	  * Return the position xx of the enemy
	  */
	 this.getPositionX = function() {
	 	return sprite.x-20;
	 }

	 /**
	  * Return the position yy of the enemy
	  */
	 this.getPositionY = function() {
	 	return sprite.y;
	 }
}