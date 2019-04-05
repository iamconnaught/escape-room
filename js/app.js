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
	}
}
userSquare.draw();

