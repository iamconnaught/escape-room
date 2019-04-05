const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const userSquare = {
	x: 50,
	y: 300,
	width: 50,
	height: 50,
	color: "blue",
	speed: 2,
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
		console.log(key);
		if(key == "w") this.direction.up = true;
		if(key == "a") this.direction.left = true;
		if(key == "s") this.direction.down = true;
		if(key == "d") this.direction.right = true;
	},
	unsetDirection(key){
		console.log(key);
		if(key == "w") this.direction.up = false;
		if(key == "a") this.direction.left = false;
		if(key == "s") this.direction.down = false;
		if(key == "d") this.direction.right = false;
	},
	move(){
		// console.log("move");
		if(this.direction.up && this.y - this.speed > 0) { console.log("up");
			this.y -= this.speed;
		}
		if(this.direction.left && this.x - this.speed > 0) { console.log("left");
			this.x -= this.speed;
		}
		if(this.direction.down && this.y + this.height + this.speed < canvas.height) { console.log("down");
			this.y += this.speed;
		}
		if(this.direction.right && this.x + this.width + this.speed < canvas.width) { console.log("right");
			this.x += this.speed;
		}
	}

}
userSquare.draw();




function animate(){
	userSquare.move();
	clearCanvas();
	userSquare.draw();
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