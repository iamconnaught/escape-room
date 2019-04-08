//set up game canvas
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

//set up text box

// let text = "hey"
// function drawText(){
// 	ctxTextCanvas = document.getElementById('text-canvas')
// 	ctxText = ctxTextCanvas.getContext('2d');
// 	ctxText.font = '20px sans-serif';
// 	ctxText.fillText(text, 10, 50);
// }
// drawText();

const userSquare = {
	x: 55,
	y: 0,
	width: 50,
	height: 50,
	color: "blue",
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
		// const keys = Object.keys(obstacles)
		//console.log(keys);
		// console.log(obst);



		// ITERATE OVER obstacles

		// 


		// for(let i = 0; i < keys.length; i++){
		// 		// console.log(keys[i]);

		// 	const obst = obstacles[keys[i]]
		// 	console.log(obst);
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
				return false }
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
		//console.log("move");

		if(this.canMoveUp()) {
			this.y -= this.speed;
			// this.isDirectlyBeneath(obstacles.map)
		} 
		if(this.canMoveDown()) {
			this.y += this.speed;
		} 
		if(this.canMoveLeft()) {
			this.x -= this.speed;
			// this.isDirectlyRightOf();
		} 
		if(this.canMoveRight()) {
			this.x += this.speed;
			// this.isDirectlyLeftOf();
		} 
		// if(this.direction.left && this.x - this.speed > 0) { console.log("left");
		// 	for(let i = 0; i < keys.length; i++){
		// 		if(this.checkCollision(obstacles[keys[i]]) == true 
		// 			&& this.x - this.speed < obstacles[keys[i]].x + obstacles[keys[i]].width) {

		// 		} else {
		// 			this.x -= this.speed;
		// 		}
		// 	}
		// }
		// if(this.direction.down && this.y + this.height + this.speed < canvas.height) { console.log("down");
		// 	for(let i = 0; i < keys.length; i++){
		// 		if(this.checkCollision(obstacles[keys[i]]) == true 
		// 			&& this.y + this.height + this.speed > obstacles[keys[i]].y) {

		// 		} else {
		// 			this.y += this.speed;
		// 		}
		// 	}
		// }
		// if(this.direction.right && this.x + this.width + this.speed < canvas.width) { console.log("right");
		// 	for(let i = 0; i < keys.length; i++){
		// 		if(this.checkCollision(obstacles[keys[i]]) == true 
		// 			&& this.x + this.width + this.speed > obstacles[keys[i]].x) {

		// 		} else {
		// 			this.x += this.speed;
		// 		}
		// 	}
		// }
	},
	// checkCollision(thing) {
	// 	const keys = Object.keys(obstacles)
	//     for(let i = 0; i < keys.length; i++){
	// 	    if(
	// 	      this.x + this.width > obstacles[keys[i]].x &&
	// 	      this.x < obstacles[keys[i]].x + obstacles[keys[i]].width && 
	// 	      this.y + this.height > obstacles[keys[i]].y &&
	// 	      this.y < obstacles[keys[i]].y + obstacles[keys[i]].height
	// 	    ) {
	// 	      console.log('collision');
	// 	      return true
	// 	    }  
	// 	    else return false
	//   	}
	// }

}
userSquare.draw();

const obstacles = {
	desk: {
		name: "desk",
		x: 170,
		y: 100,
		width: 150,
		height: 80,
		color: "black",
		draw(){
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	},
	bookcase: {
		x: 358,
		y: 298,
		width: 40,
		height: 100,
		color: "black",
		draw(){
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	},
	chest: {
		x: 2,
		y: 200,
		width: 40,
		height: 80,
		color: "black",
		draw(){
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	},
	map: {
		name: "map",
		x: 150,
		y: 0,
		width: 100,
		height: 5,
		color: "black",
		draw(){
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
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
		}
	},
}

// const inspectionZones = {
// 	deskZone: {
// 		x: 170,
// 		y: 180,
// 		width:150,
// 		height: 50,
// 		color: "lightblue",
// 		draw() {
// 			ctx.beginPath();
// 			ctx.rect(this.x,this.y,this.width,this.height);
// 			ctx.fillStyle = this.color;
// 			ctx.fill();
// 		}
// 	},
// 	bookcaseZone: {
// 		x: 308,
// 		y: 298,
// 		width: 50,
// 		height: 100,
// 		color: "lightblue",
// 		draw() {
// 			ctx.beginPath();
// 			ctx.rect(this.x,this.y,this.width,this.height);
// 			ctx.fillStyle = this.color;
// 			ctx.fill();
// 		}
// 	},
// 	mapZone: {
// 		x: 150,
// 		y: 0,
// 		width: 100,
// 		height: 50,
// 		draw() {
// 			ctx.beginPath();
// 			ctx.rect(this.x,this.y,this.width,this.height);
// 			ctx.fillStyle = this.color;
// 			ctx.fill();
// 		}
// 	},
// 	picturesZone: {
// 		x: 0,
// 		y: 50,
// 		width: 50,
// 		height: 80,
// 		draw() {
// 			ctx.beginPath();
// 			ctx.rect(this.x,this.y,this.width,this.height);
// 			ctx.fillStyle = this.color;
// 			ctx.fill();
// 		}
// 	},
// 	chestZone: {
// 		x: 42,
// 		y: 200,
// 		width: 50,
// 		height: 80,
// 		draw() {
// 			ctx.beginPath();
// 			ctx.rect(this.x,this.y,this.width,this.height);
// 			ctx.fillStyle = this.color;
// 			ctx.fill();
// 		}
// 	}

// }


const init = () => {
	 for (key in obstacles){
	 	// obstacles.key.draw()
	 	console.log(key);
	 	console.log(obstacles[key].draw())
	 }



	const keys = Object.keys(obstacles)

	console.log(keys)
	for(let i = 0; i < keys.length; i++) {
		obstacles[keys[i]].draw()
	}
	
}
init()
// const keys2 = Object.keys2(inspectionZones)

// for(let j = 0; j < keys2.length; j++){
// 			inspectionZones[keys2[i]].draw()
// 		}
// const desk = {
// 	x: 120,
// 	y: 100,
// 	width: 150,
// 	height: 80,
// 	color: "black",
// 	draw(){
// 		ctx.beginPath();
// 		ctx.rect(this.x,this.y,this.width,this.height);
// 		ctx.fillStyle = this.color;
// 		ctx.fill();
// 	}

// }
// obstacles.desk.draw();



const game = {
	drawObstacles() {
		const keys = Object.keys(obstacles)
		for(let i = 0; i < keys.length; i++) {
			obstacles[keys[i]].draw()
		}
	},
	showDefaultText(){
		let div = document.getElementById("text-div")
		div.innerHTML = 'Explore the room<br>( up: "w", down: "s", left: "a", right: "d" ) <br>Press SPACE to inspect objects';
	},
	showMapDetails(){
		let div = document.getElementById("text-div")
		div.innerHTML = "Zurich: 47 21N 8 31E <br> Dublin: 53 20N 6 15W <br> Tokyo: 35 40N 139 0E <br> Rio: 22 57S 43 12W <br> Paris: 48 48N 2 20E <br> Havana: 23 8N 82 23W <br> Melbourne: 37 47S 144 58E <br><br> SPACE to return";
		console.log(div);
	},
	showDeskDetails(){
		let div = document.getElementById("text-div")
		div.innerHTML = "Desk Details";
		console.log(div);
	},
	showChestDetails(){
		let div = document.getElementById("text-div")
		div.innerHTML = "<form><input type='text' id='list-item' placeholder='Enter Passcode'><button type='submit'>Enter</button></form>"
		
		console.log(div);
	},
	showBookcaseDetails(){
		let $div = document.getElementById("text-div")
		div.innerHTML = "Bookcase Details";
		console.log(div);
	},
	showPicturesDetails(){
		let div = document.getElementById("text-div")
		div.innerHTML = "Pictures Details";
		console.log(div);
	}

	// drawInspectionZones(){
	// 	for(let j = 0; j < keys2.length; j++){
	// 		inspectionZones[keys2[i]].draw()
	// 	}
	// }
}
//game.showDefaultText();

function animate(){
	userSquare.move();
	clearCanvas();
	game.drawObstacles();
	userSquare.draw();
	// game.drawInspectionZones();
	// console.log('animate');	
	window.requestAnimationFrame(animate)
}
animate();

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// function clearTextCanvas() {
// 	ctxText.clearRect(0, 0, ctxTextCanvas.width, ctxTextCanvas.height)
// 	console.log("clear");

// }




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

// document.addEventListener('keyup', (e) => {
// 	if(e.key == " "){
// 		game.showDefaultText();
// 	}
// })

