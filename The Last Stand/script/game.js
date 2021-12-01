
 //Draw the window game
var drawWindow = function() {
 	context.fillStyle = '#000';
	context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
	context.beginPath();
	context.rect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
	context.closePath();
	context.fill();
	context.drawImage(backGround, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
}

var updateLifeUi = function() {
	life_txt.innerHTML="Vidas: "+life.toString();
}
var updateHordeUi = function() {
	horde_txt.innerHTML="Onda: "+horde.toString();
}
var updatePointsUi = function() {
	points_txt.innerHTML="Pontos: "+points.toString();
}

var restartGame = function() {
	if(life<=0 || win){
		life=5
		horde=1
		win=false;
		points=0;
		enemysSpawned=0;
		updateHordeUi();
		updateLifeUi();
		updatePointsUi();
		enemies.splice(0,enemies.length);
		lasers.splice(0,lasers.length);
		gameLoop = setTimeout(Update, intervalTime);
	}
}

/**
 * Create an horde of enemies, the horde is divided in columns and rows
 * @param numRows - indicate the number of rows
 * @param numCols - indicate the number of columns
 */
var createEnemies = function(posX, amplitude, speed) {
	//add enemies horde
	enemies[enemies.length] = new Enemy(posX, (WINDOW_HEIGHT / 30), amplitude, speed);
}

//Animate elements
var animate = function() {

	if(player.movingLeft)	player.moveLeft();
	else if(player.movingRight)	player.moveRight();

	//iterate through all the lasers
	for(index in lasers) {
		//draw laser
		lasers[index].draw();
		//simulate one step
		if(lasers[index].step()){
			lasers.splice(index, 1);
		}
	}

	//check the movement of the enemies
	for(index in enemies) {
		if(enemies[index].checkStep()){
			enemies[index].jump()
			if(enemies[index].checkHeight(WINDOW_HEIGHT)){
				enemies.splice(index, 1);
				life-=1;
				updateLifeUi();
			}
		}else{
			//simulate step
			enemies[index].step();		
		}
		if(enemies[index]!=null)
			enemies[index].draw();
	}
}

//Detect colisions between the lasers and enemies
var detectColisions = function() {
	for(indexLaser in lasers) {
		for(indexEnemy in enemies) {
			if(colisionHandler.detectColisionBetweenObjects(lasers[indexLaser], enemies[indexEnemy])) {
				lasers.splice(indexLaser, 1);
				enemies.splice(indexEnemy, 1);
				points+=10;
				updatePointsUi();
				break;
			}
		}
	}
	for(indexEnemy in enemies) {
		if(colisionHandler.detectColisionBetweenObjects(player, enemies[indexEnemy])) {
			enemies.splice(indexEnemy, 1);
			life-=1;
			updateLifeUi();
			break;
		}
	}
}

function randomIntFromInterval(min, max) { 
	// min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}

//Detect colisions between the lasers and enemies
var nextHorde = function() {
	if(enemysSpawned<2*horde){
		enemysSpawned+=1;
		createEnemies(randomIntFromInterval(100,WINDOW_WIDTH-100), randomIntFromInterval(3,50),16);
		hordeLoop = setTimeout(nextHorde, intervalTime*(100-horde*6));
		
	}else{
		enemysSpawned=0
		horde+=1
		clearInterval(hordeLoop);
		hordeStarted=false;
		enemies.length==0
	}
}


//Detect colisions between the lasers and enemies
var hordeHandler = function() {
	if(enemies.length==0 && !hordeStarted){
		if(horde>1){
			points+=100;
			updatePointsUi();
		}
		if(horde>=11){
			win=true;
			return;
		}
		hordeStarted=true;
		updateHordeUi();
		setTimeout(nextHorde, 1000);
	}
}

 //Run the game
var Update = function() {
		//draw the window game
		drawWindow();
		//draw the player
		player.draw();
		//start horde
		hordeHandler();
		//animate all the elements
		animate();
		//check colisions
		detectColisions();
		//set timeout function
		gameLoop = setTimeout(Update, intervalTime);
		if(horde>=11){
			context.drawImage(youWin, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
			clearInterval(gameLoop);
			clearInterval(hordeLoop);
			win=true;
		}
		if(life<=0){
			context.drawImage(gameOver, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
			clearInterval(gameLoop);
			clearInterval(hordeLoop);
		}
	}

	var Start = function() {
		if(gameLoop==null){
			if(easy.checked){
				fireRateInterval=150
				console.log("0")
			}
			else if (medium.checked){
				fireRateInterval=350
				console.log("1")
			}
			else{
				fireRateInterval=550
				console.log("2")
			}
			Update();
		}
	}


//window width
const WINDOW_WIDTH = 800;
//window height
const WINDOW_HEIGHT = 600;
//frame rate
const FRAME_RATE = 50;

//game loop
var gameLoop;
//interval time
var intervalTime = 1000 / FRAME_RATE;

//get frame window
var frameWindow = document.getElementById("content");
//frame window width
frameWindow.width = WINDOW_WIDTH;
//frame window height
frameWindow.height = WINDOW_HEIGHT;
//get context
var context = frameWindow.getContext("2d");
//getting choices
var easy=document.getElementById("easy");
var medium=document.getElementById("medium");
var hard=document.getElementById("hard");


//Get ui texts and set its start values
var points_txt = document.getElementById("points");
var life_txt = document.getElementById("life");
var horde_txt = document.getElementById("horde");
var life = 5;
var horde = 1;

updateLifeUi();
updateHordeUi();

var points=0;
var enemysSpawned=0;
var hordeStarted=false;
var fireRateInterval=200;

var win=false;

//Load images objects
gameOver=new Image();
gameOver.src = "./images/gameOver.jpg";

youWin=new Image();
youWin.src = "./images/youwin.jpg";

play=new Image();
play.src = "./images/new_logo.png";

backGround=new Image();
backGround.src = "./images/space.jpg";

//Draw start window
backGround.onload = function() {
    context.drawImage(backGround, 0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
	context.drawImage(play, (WINDOW_WIDTH/2)-251, (WINDOW_HEIGHT/2)-11, 502, 227);
}

//keyhandler object
var keyHandler = new KeyHandler();
//colisionhandler object
var colisionHandler = new ColisionHandler();
//player object
var player = new Player();
//array that store the lasers
var lasers = new Array();
//array that store the enemies
var enemies = new Array();

//add enemies
//createEnemies(randomIntFromInterval(100,WINDOW_WIDTH-100), 200,10);


//handle events when the a key is pressed
document.onkeypress = function(e) {
	keyHandler.keyPress(e);
	keyHandler.keyPress2(e);		
}

//handle events when the key is released
document.onkeyup = function(e) {
	keyHandler.keyUp(e);
}

