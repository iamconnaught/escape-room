//set up game canvas
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
let puzzleSolved = false;
let gameStarted = false;
//set up text box


// User Object//
const userSquare = {
	x: 55,
	y: 300,
	width: 30,
	height: 30,
	color: "burlywood",
	speed: 2,
	closeness: 5,
	direction: {
		up: false,
		right: false,
		down: false,
		left: false
	},
	draw(){
		ctx.beginPath();
		ctx.rect(this.x,this.y,this.width,this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
		let direction = "up"
		const playerSprite = new Image();
		playerSprite.src = "css/30pxUser1NoBackUp.png"
		ctx.drawImage(playerSprite,this.x, this.y);
		if(this.direction.up === true){
			playerSprite.src = "css/30pxUser1NoBackUp.png"
			ctx.drawImage(playerSprite,this.x, this.y);
		}
		if (this.direction.down === true){
			playerSprite.src = "css/30pxUser1NoBackDown.png"
			ctx.drawImage(playerSprite,this.x, this.y);
		}
		if(this.direction.left === true){
			playerSprite.src = "css/30pxUser1NoBackLeft.png"
			ctx.drawImage(playerSprite,this.x, this.y);
		}
		if(this.direction.right === true){
			playerSprite.src = "css/30pxUser1NoBackRight.png"
			ctx.drawImage(playerSprite,this.x, this.y);	
		}
		if(this.direction.right === true && this.direction.up === true){
			playerSprite.src = "css/30pxUser1NoBackUpRight.png"
			ctx.drawImage(playerSprite,this.x, this.y);	
		}
		if(this.direction.left === true && this.direction.up === true){
			playerSprite.src = "css/30pxUser1NoBackUpLeft.png"
			ctx.drawImage(playerSprite,this.x, this.y);	
		}
		if(this.direction.right === true && this.direction.down === true){
			playerSprite.src = "css/30pxUser1NoBackDownRight.png"
			ctx.drawImage(playerSprite,this.x, this.y);	
		}
		if(this.direction.left === true && this.direction.down === true){
			playerSprite.src = "css/30pxUser1NoBackDownLeft.png"
			ctx.drawImage(playerSprite,this.x, this.y);	
		}

	},
	setDirection(key){
		//console.log(key);
		if(key == "w") this.direction.up = true;
		if(key == "a") this.direction.left = true;
		if(key == "s") this.direction.down = true;
		if(key == "d") this.direction.right = true;
	},
	unsetDirection(key){
		//console.log(key);
		if(key == "w") this.direction.up = false;
		if(key == "a") this.direction.left = false;
		if(key == "s") this.direction.down = false;
		if(key == "d") this.direction.right = false;
	},
	canMoveUp() {

		const keys = Object.keys(obstacles)

		// if subtracting speed wouldn't put us off the top of the canvas
		if(this.direction.up && this.y - this.speed > 0) { 

			// see if moving up would cause us to intersect with any obstacle
			for(let i = 0; i < keys.length; i++){

				const obst = obstacles[keys[i]]

				if(
					// if top of this would hit bottom of obst -- if i'm beneathing
					this.y - this.speed < obst.y + obst.height && 
					// if this right edge is to the right of thing's left edge &&
					this.x + this.width > obst.x &&
					// if this left edge is to the left of thing's right edge &&
					this.x < obst.x + obst.width &&
					// if this is below thing &&
					this.y + this.height > obst.y

				) {
					
					return false
				}
			}

			// we're thru the loop -- so it's clear
			return true
		}		
	},
	canMoveDown() {
		const keys = Object.keys(obstacles)

		// if adding speed wouldn't put us off the bottom of the canvas
		if(this.direction.down && this.y + this.height + this.speed < canvas.height) { 

			// see if moving down would cause us to intersect with any obstacle
			for(let i = 0; i < keys.length; i++){

				const obst = obstacles[keys[i]]

				if(
					// if bottom of this would hit top of obst -- if i'm above
					this.y + this.height + this.speed > obst.y && 
					// if this right edge is to the right of thing's left edge &&
					this.x + this.width > obst.x &&
					// if this left edge is to the left of thing's right edge &&
					this.x < obst.x + obst.width &&
					// if this is above thing &&
					this.y < obst.y + obst.height

				) {
					
					return false
				}
			}

			// we're thru the loop -- so it's clear
			return true
		}		
	},
	canMoveLeft() {
		const keys = Object.keys(obstacles)

		// if subtracting speed wouldn't put us off the edge of the canvas
		if(this.direction.left && this.x - this.speed > 0) { 

			// see if moving left would cause us to intersect with any obstacle
			for(let i = 0; i < keys.length; i++){

				const obst = obstacles[keys[i]]

				if(
					// if leftside of this would hit rightside of obst -- if i'm right of
					this.x - this.speed < obst.x + obst.width && 
					// 
					this.y + this.height > obst.y &&
					// 
					this.y < obst.y + obst.height &&
					// if this is left of thing &&
					this.x + this.width > obst.x

				) {
					
					return false
				}
			}

			// we're thru the loop -- so it's clear
			return true
		}		
	}, 
	canMoveRight() {
		const keys = Object.keys(obstacles)

		// if adding speed wouldn't put us off the edge of the canvas
		if(this.direction.right && this.x + this.width + this.speed < canvas.width) { 

			// see if moving right would cause us to intersect with any obstacle
			for(let i = 0; i < keys.length; i++){

				const obst = obstacles[keys[i]]

				if(
					// if rightside of this would hit leftside of obst -- if i'm left of
					this.x + this.width + this.speed > obst.x && 
					// 
					this.y + this.height > obst.y &&
					// 
					this.y < obst.y + obst.height &&
					// if this is right of thing &&
					this.x < obst.x + obst.width

				) {
					
					return false
				}
			}

			// we're thru the loop -- so it's clear
			return true
		}
	},

	isDirectlyBeneath(obst) {
			const obstBotEdge = obst.y + obst.height

			if(
				// if this top edge is within 5px of that bott edgue
				Math.abs(this.y - obstBotEdge) <= this.closeness &&
				// // if this right edge is to the right of thing's left edge &&
				this.x + this.width > obst.x &&
				// // if this left edge is to the left of thing's right edge &&
				this.x < obst.x + obst.width &&
				// this is below the bottom of the map
				this.y > obst.y + obst.height



			) {
				// console.log("bottom is below ");
				console.log("isDirectlyBeneath ", obst);
				return true
			} 
			else {
				game.showDefaultText();
				return false 
			}
		// }






	},
	isDirectlyLeftOf(thing) {
		const keys = Object.keys(obstacles)
			for(let i = 0; i < keys.length; i++){

				const obst = obstacles[keys[i]]

				if(
					this.x + this.width + this.speed > obst.x && 
					// 
					this.y + this.height > obst.y &&
					// 
					this.y < obst.y + obst.height
					

				) {
					console.log("isDirectlyLeftOf");
					return true
				} else return false	
			}
	},
	isDirectlyRightOf(thing) {
		const keys = Object.keys(obstacles)
		for(let i = 0; i < keys.length; i++){

				const obst = obstacles[keys[i]]

				if(
					this.x - this.speed < obst.x + obst.width && 
					// 
					this.y + this.height > obst.y &&
					// 
					this.y < obst.y + obst.height
				) {
					console.log("isDirectlyRightOf");
					return true
				} else return false
			}
	},
	move(){ 
		if(this.canMoveUp()) {
			this.y -= this.speed;
		} 
		if(this.canMoveDown()) {
			this.y += this.speed;
		} 
		if(this.canMoveLeft()) {
			this.x -= this.speed;
		} 
		if(this.canMoveRight()) {
			this.x += this.speed;	
		} 
	},
	

}
//userSquare.draw();


// Obstacles Object//
const obstacles = {
	desk: {
		name: "desk",
		x: 170,
		y: 101,
		width: 150,
		height: 80,
		color: "sienna",
		draw(){
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x, this.y, this.width, this.height / 5);
			ctx.strokeStyle = "saddlebrown"
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x, this.y + this.height / 5, this.width, this.height / 5);
			ctx.strokeStyle = "saddlebrown"
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x, this.y + (this.height / 5) * 2, this.width, this.height / 5);
			ctx.strokeStyle = "saddlebrown"
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x, this.y + (this.height / 5) * 3, this.width, this.height / 5);
			ctx.strokeStyle = "saddlebrown"
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x, this.y + (this.height / 5) * 4, this.width, this.height / 5);
			ctx.strokeStyle = "saddlebrown"
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.strokeStyle = "black"
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x + 70, this.y + 30, 20, 40);
			ctx.fillStyle = "ivory"
			ctx.fill();
			ctx.beginPath();
			ctx.strokeStyle = "black"
			ctx.moveTo(this.x + 72, this.y + 34);
			ctx.lineTo(this.x + 80, this.y + 34);
			ctx.stroke();
			ctx.beginPath();
			ctx.strokeStyle = "black"
			ctx.moveTo(this.x + 72, this.y + 38);
			ctx.lineTo(this.x + 86, this.y + 38);
			ctx.stroke();
			ctx.beginPath();
			ctx.strokeStyle = "black"
			ctx.moveTo(this.x + 72, this.y + 42);
			ctx.lineTo(this.x + 86, this.y + 42);
			ctx.stroke();
			ctx.beginPath();
			ctx.strokeStyle = "black"
			ctx.moveTo(this.x + 72, this.y + 46);
			ctx.lineTo(this.x + 86, this.y + 46);
			ctx.stroke();
			ctx.beginPath();
			ctx.strokeStyle = "black"
			ctx.moveTo(this.x + 72, this.y + 50);
			ctx.lineTo(this.x + 86, this.y + 50);
			ctx.stroke();
			ctx.beginPath();
			ctx.strokeStyle = "black"
			ctx.moveTo(this.x + 72, this.y + 54);
			ctx.lineTo(this.x + 86, this.y + 54);
			ctx.stroke();
			ctx.beginPath();
			ctx.strokeStyle = "black"
			ctx.moveTo(this.x + 80, this.y + 60);
			ctx.lineTo(this.x + 86, this.y + 60);
			ctx.stroke();
			ctx.beginPath();
			ctx.lineWidth = 5;
			ctx.arc(this.x + 30, this.y + 30, 15, 0, 2*Math.PI);
			ctx.strokeStyle = "papayawhip";
			ctx.stroke();
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(this.x + 30, this.y + 28)
			ctx.lineTo(this.x + 30, this.y + 15)
			ctx.strokeStyle = "black"
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.x + 30, this.y + 32)
			ctx.lineTo(this.x + 30, this.y + 45)
			ctx.strokeStyle = "black"
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.x + 15, this.y + 30)
			ctx.lineTo(this.x + 28, this.y + 30)
			ctx.strokeStyle = "black"
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.x + 45, this.y + 30)
			ctx.lineTo(this.x + 32, this.y + 30)
			ctx.strokeStyle = "black"
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(this.x +30, this.y +30, 5,0, 2*Math.PI);
			ctx.fillStyle = "gold";
			ctx.fill();
			ctx.beginPath();
			ctx.lineWidth = 5;
			ctx.arc(this.x + 30, this.y + 30, 15, 0, 2*Math.PI);
			ctx.strokeStyle = "papayawhip";
			ctx.stroke();
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(this.x + 110, this.y + 15);
			ctx.lineTo(this.x + 108, this.y + 35);
			ctx.strokeStyle = "black"
			ctx.stroke();
		}
	},
	bookcase: {
		x: 358,
		y: 298,
		width: 40,
		height: 100,
		color: "darkslategrey",
		draw(){
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x + 5,this.y + 10,30,5);
			ctx.fillStyle = "ivory";
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x + 5,this.y + 10,30,5);
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x + 8,this.y + 15,27,6);
			ctx.fillStyle = "floralwhite";
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x + 8,this.y + 15,27,6);
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x + 8,this.y + 21,27,6);
			ctx.fillStyle = "goldenrod";
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x + 8,this.y + 21,27,6);
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x + 5,this.y + 27,30,5);
			ctx.fillStyle = "ivory";
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x + 5,this.y + 27,30,5);
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x + 5,this.y + 32,30,5);
			ctx.fillStyle = "khaki";
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x + 5,this.y + 32,30,5);
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x + 5,this.y + 42,30,50);
			ctx.fillStyle = "ivory";
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x + 5,this.y + 42,30,25);
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x + 5,this.y + 67,30,25);
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x + 8, this.y + 45, 20, 18 )
			ctx.fillStyle = "lightblue";
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x + 8, this.y + 45, 20, 18 )
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.x + 32, this.y + 48);
			ctx.lineTo(this.x + 32, this.y + 60);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.x + 8, this.y +72);
			ctx.lineTo(this.x + 8, this.y + 89);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.x + 12, this.y +72);
			ctx.lineTo(this.x + 12, this.y + 89);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.x + 16, this.y +72);
			ctx.lineTo(this.x + 16, this.y + 89);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.x + 20, this.y +72);
			ctx.lineTo(this.x + 20, this.y + 89);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.x + 24, this.y +72);
			ctx.lineTo(this.x + 24, this.y + 89);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.x + 28, this.y +72);
			ctx.lineTo(this.x + 28, this.y + 89);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.x + 32, this.y +72);
			ctx.lineTo(this.x + 32, this.y + 89);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(this.x + 36, this.y +72);
			ctx.lineTo(this.x + 36, this.y + 89);
			ctx.stroke();
		}
	},
	chest: {
		x: 2,
		y: 200,
		width: 40,
		height: 80,
		color: "Brown",
		draw(){
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x,this.y + (this.height / 10) * 2,this.width,this.height / 10);
			ctx.fillStyle = "maroon";
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x,this.y + (this.height / 10) * 2,this.width,this.height / 10);
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x,this.y + (this.height / 10) * 7,this.width,this.height / 10);
			ctx.fillStyle = "maroon";
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x,this.y + (this.height / 10) * 7,this.width,this.height / 10);
			ctx.strokeStyle = "black";
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(this.x + this.width - 10,this.y + (this.height / 10) * 4.5, 10, 10);
			ctx.fillStyle = "gold";
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x + this.width - 10,this.y + (this.height / 10) * 4.5, 10, 10);
			ctx.strokeStyle = "black";
			ctx.stroke();
		}
	},
	map: {
		name: "map",
		x: 150,
		y: 0,
		width: 100,
		height: 5,
		color: "peru",
		draw(){
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.strokeStyle = "black";
			ctx.stroke();
		}
	},
	pictures: {
		x: 0,
		y: 50,
		width: 5,
		height: 80,
		color: "black",
		draw(){
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.beginPath();
			ctx.rect(this.x,this.y + this.height / 2, this.width, 4);
			ctx.fillStyle = "burlywood";
			ctx.fill();
		}
	},
}

// const init = () => {
// 	 for (key in obstacles){
// 	 	// obstacles.key.draw()
// 	 	console.log(key);
// 	 	console.log(obstacles[key].draw())
// 	 }



// 	const keys = Object.keys(obstacles)

// 	console.log(keys)
// 	for(let i = 0; i < keys.length; i++) {
// 		obstacles[keys[i]].draw()
// 	}
	
// }
// init()

// Game Object//
const game = {
	drawObstacles() {
		const keys = Object.keys(obstacles)
		for(let i = 0; i < keys.length; i++) {
			obstacles[keys[i]].draw();
		}
	},
	showDefaultText(){
		let div = document.getElementById("text-div")
		div.innerHTML = 'Explore the room<br>( up: "w", down: "s", left: "a", right: "d" ) <br>Press SPACE to inspect objects';
	},
	showMapDetails(){
		let div = document.getElementById("text-div")
		div.innerHTML = "Zurich: 47 21N 8 31E <br> Dublin: 53 20N 6 15W <br> Tokyo: 35 40N 139 0E <br> Rio: 22 57S 43 12W <br> Melbourne: 37 47S 144 58E <br> Paris: 48 48N 2 20E <br> Havana: 23 8N 82 23W";
		console.log(div);
	},
	showDeskDetails(){
		let div = document.getElementById("text-div")
		div.innerHTML = "Dear Daniel,<br>It was such a pleasure having you visit last month.<br>I look forward to the next time you come,<br>maybe we will have a chance to hike to see<br>Cristo Redentor.<br><br>Hope all is well,<br>Thiago";
		console.log(div);
	},
	showChestDetails(){
		let div = document.getElementById("text-div")
		div.innerHTML = "Enter the Passcode<br><form><input type='text' id='passcode' placeholder='Numbers Only'><button type='submit'>Enter</button></form>"
		
		console.log(div);

		const codeInput = document.getElementById("passcode")
		console.log(codeInput)

		document.addEventListener('submit', (e)=> {
			e.preventDefault();
			if(codeInput.value === '37 47 144 58' ||  codeInput.value === '374714458'){
				console.log("you did it");
				puzzleSolved = true;

			} else {
				div.innerHTML = "Hmm... Something is missing"
				console.log("wrong");
			}
		})
	},
	showBookcaseDetails(){
		let div = document.getElementById("text-div")
		div.innerHTML = "Author: Graham Greene, Title: 'Our Man in Havana'<br><br> Author: Victor Hugo, Title: 'Les Miserables'<br><br> Author: James Joyce, Title: 'A Portrait of the Artist as a Young Man";
		console.log(div);
	},
	showPicturesDetails(){
		let div = document.getElementById("text-div")
		div.innerHTML = "<img src='data:image/jpeg;base64,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' height='160px'> <img src='https://i.pinimg.com/originals/94/88/fc/9488fcd41b907ecdf594da928c22f897.png' height='180px'>";
		console.log(div);
	},
	endGame(){
		ctx.font = '30px Open Sans'

		let div = document.getElementById("text-div")
		div.innerHTML = "<img src='css/amulet-cutout.png' height='180px'>"
		ctx.fillStyle = "black";
		ctx.font = "20px Open Sans";
		ctx.fillText("You found the Relic!", 100, 200);
	},
	introduction(){
		let div = document.getElementById("text-div")
		div.innerHTML = "Daniel is missing.<br>He had contacted you shortly before his disappearance, mentioning a relic he had stolen.<br>He didn't leave behind much information.<br>The people he stole from are looking for the relic and its your job to put the pieces of information together and find it.<br>Start the Game, hit ENTER"
		ctx.beginPath();
		ctx.rect(25,25,350,250);
		ctx.fillStyle = "lightblue";
		ctx.fill();
		ctx.beginPath();
		ctx.rect(25,25,350,250);
		ctx.strokeStyle = "black";
		ctx.stroke();
		const introBackground = new Image();
		introBackground.src = "file:///Users/iamconnaught/june-bugs/4-4-canvas/escape-room/css/mountains-cutout.png";
		ctx.drawImage(introBackground, 100, 200);
		const introPerson = new Image();
		introPerson.src = "/css/danielHiking.png";
		ctx.drawImage(introPerson, 150, 100);
		ctx.fillStyle = "black"
		ctx.font = "50px Open Sans"
		ctx.fillText("MISSING", 100, 350)
	}

}

// Animate Function//
function animate(){
	if(gameStarted === false){
		game.introduction();
		
	} else if (gameStarted === true){
		if (puzzleSolved === false){
			userSquare.move();
			clearCanvas();
			game.drawObstacles();
			userSquare.draw();
			// game.drawInspectionZones();
			// console.log('animate');	
			window.requestAnimationFrame(animate)
		} else {
			clearCanvas();
			game.endGame();
		}
	}
}
animate();

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}




//Event Listeners//
document.addEventListener('keyup', (e) => {
  if(["w", "a", "s", "d"].includes(e.key)) {
    userSquare.unsetDirection(e.key) 
  }
})

document.addEventListener('keydown', (e) => {
  if(["w", "a", "s", "d"].includes(e.key)) {
    userSquare.setDirection(e.key) 
  }
})

document.addEventListener('keydown', (e) => {

  if(e.key == " ") {
  	if(userSquare.isDirectlyBeneath(obstacles.map)) {
  		console.log("cool you're beneath map");
  		game.showMapDetails();
  		// do inspect map stuff
  	} 
  	// else if (userSquare.isDirectlyBeneath(obstacles.desk)) {

  	// }
  } 
  // if([" "].includes(e.key) && userSquare.isDirectlyBeneath(obstacles.desk) === true){
  // 	console.log("inspect desk");
  // }
  //  if([" "].includes(e.key) && userSquare.isDirectlyBeneath(obstacles.map) === true){
  // 	console.log("inspect map");
  // }
  if([" "].includes(e.key) && userSquare.x > 42 && userSquare.x < 92 && userSquare.y > 200 && userSquare.y < 280) {
    console.log("inspect chest!");
    game.showChestDetails();
  }
  if([" "].includes(e.key) && userSquare.x >= 0 && userSquare.x < 50 && userSquare.y > 50 && userSquare.y < 130) {
    console.log("inspect pictures!");
    game.showPicturesDetails();
  }
  if([" "].includes(e.key) && userSquare.x > 300 && userSquare.x < 358 && userSquare.y > 298 && userSquare.y < 398) {
    console.log("inspect bookcase!");
    game.showBookcaseDetails();
  }
  if([" "].includes(e.key) && userSquare.x > 170 && userSquare.x < 320 && userSquare.y > 178 && userSquare.y < 230) {
    console.log("inspect desk!");
    game.showDeskDetails();
  }
})

document.addEventListener('keydown', (e)=>{
	if(e.key == "Enter"){
		gameStarted = true;
		animate();
		game.showDefaultText();
		console.log(gameStarted);
	}	
})
