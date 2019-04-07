//set up game canvas
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

//set up text box

let text = "hey"
function drawText(){
	ctxText = document.getElementById('text-canvas').getContext('2d');
	ctxText.font = '20px sans-serif';
	ctxText.fillText(text, 10, 50);
}
drawText();

const userSquare = {
	x: 50,
	y: 300,
	width: 50,
	height: 50,
	color: "blue",
	speed: 1,
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
	move(){
		// console.log("move");
		if(this.direction.up && this.y - this.speed > 0) { console.log("up");
			for(let i = 0; i < keys.length; i++){

				// if (collision w/ desk OR collision w/ cupboard) && (...)
				if(this.checkCollision(obstacles[keys[i]]) == true 
					&& this.y - this.speed < obstacles[keys[i]].y + obstacles[keys[i]].height) {
					console.log(" you cant go up sorry");
				} else {
					this.y -= this.speed;
				}
			}
		}
		if(this.direction.left && this.x - this.speed > 0) { console.log("left");
			for(let i = 0; i < keys.length; i++){
				if(this.checkCollision(obstacles[keys[i]]) == true 
					&& this.x - this.speed < obstacles[keys[i]].x + obstacles[keys[i]].width) {

				} else {
					this.x -= this.speed;
				}
			}
		}
		if(this.direction.down && this.y + this.height + this.speed < canvas.height) { console.log("down");
			for(let i = 0; i < keys.length; i++){
				if(this.checkCollision(obstacles[keys[i]]) == true 
					&& this.y + this.height + this.speed > obstacles[keys[i]].y) {

				} else {
					this.y += this.speed;
				}
			}
		}
		if(this.direction.right && this.x + this.width + this.speed < canvas.width) { console.log("right");
			for(let i = 0; i < keys.length; i++){
				if(this.checkCollision(obstacles[keys[i]]) == true 
					&& this.x + this.width + this.speed > obstacles[keys[i]].x) {

				} else {
					this.x += this.speed;
				}
			}
		}
	},
	checkCollision(thing) {
    for(let i = 0; i < keys.length; i++){
	    if(
	      this.x + this.width > obstacles[keys[i]].x &&
	      this.x < obstacles[keys[i]].x + obstacles[keys[i]].width && 
	      this.y + this.height > obstacles[keys[i]].y &&
	      this.y < obstacles[keys[i]].y + obstacles[keys[i]].height
	    ) {
	      console.log('collision');
	      return true
	    }  
	    else return false
	  	}
	}

}
userSquare.draw();

const obstacles = {
	desk: {
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
// }

// const inspectionZones = {
	deskZone: {
		x: 170,
		y: 180,
		width:150,
		height: 50,
		color: "lightblue",
		draw() {
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	},
	bookcaseZone: {
		x: 308,
		y: 298,
		width: 50,
		height: 100,
		color: "lightblue",
		draw() {
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	},
	mapZone: {
		x: 150,
		y: 0,
		width: 100,
		height: 50,
		draw() {
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	},
	picturesZone: {
		x: 0,
		y: 50,
		width: 50,
		height: 80,
		draw() {
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	},
	chestZone: {
		x: 42,
		y: 200,
		width: 50,
		height: 80,
		draw() {
			ctx.beginPath();
			ctx.rect(this.x,this.y,this.width,this.height);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	}

}

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
		for(let i = 0; i < keys.length; i++) {
			obstacles[keys[i]].draw()
		}
	},
	// drawInspectionZones(){
	// 	for(let j = 0; j < keys2.length; j++){
	// 		inspectionZones[keys2[i]].draw()
	// 	}
	// }
}

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
  if([" "].includes(e.key) && userSquare.x > 42 && userSquare.x < 92 && userSquare.y > 200 && userSquare.y < 280) {
    console.log("inspect chest!");
  }
})

