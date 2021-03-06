/**
 * File player.js
 * implemented by Adelino Lobão
 * 10/01/2012
 */

 /**
  * Class Player
  */
function Player() {

	//image src
	var imgSrc = './images/rsz_nave.png';
	//width
	this.width = 104;
	//height
	this.height = 64;

	//indicates if the sprite is moving left
	this.movingLeft = false;
	//indicates if the sprite is moving right
	this.movingRight = false;

	this.life = 10;

	//create the player sprite
	var sprite = new Sprite(14);
	//set sprite image and size
	sprite.initImage('./images/rsz_nave.png', 104, 64);
	//set initial position of the sprite
	sprite.initPosition(WINDOW_WIDTH / 2, WINDOW_HEIGHT - 100);

	/**
	 * Draw the player
	 */
	this.draw = function() {
		sprite.draw();
	}

	/**
	 * Moves the player character to left
	 */
	this.moveLeft = function() {
		sprite.moveLeft();
	}

	/**
	 * Moves the player character to right
	 */
	 this.moveRight = function() {
	 	sprite.moveRight();
	 }

	 /**
	  * Return the position xx of the player
	  */
	 this.getPositionX = function() {
	 	return sprite.x;
	 }

	 /**
	  * Return the position yy of the player
	  */
	 this.getPositionY = function() {
	 	return sprite.y;
	 }
}