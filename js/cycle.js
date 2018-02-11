"use strict"
var app = app || {};

app.cycle ={
	x:undefined,
	y:undefined,
	speed:1.2,
	imageData:undefined,
	pixels:undefined,
	dead:undefined,

	init:function(){
		app.calculate.up = false;
		app.calculate.down = true;
		app.calculate.left = false;
		app.calculate.right = false;
		this.dead = false;
		this.x = canvas.width*.75;
		this.y = 10;
		ctx.lineWidth = 3;	
		ctx.beginPath();
		ctx.moveTo(this.x,this.y);
	},
	update: function(start){
	
		ctx.strokeStyle="red";
		ctx.lineTo(this.x,this.y);
		ctx.stroke();
		
		if(start)this.steer();
		this.draw();
	},
	draw: function(){
			ctx.fillStyle="red";
			ctx.fillRect(this.x-5,this.y-2,10,4);
			ctx.fillRect(this.x-3,this.y-5,6,6);
			ctx.fillRect(this.x-3,this.y,6,5);
			ctx.fillStyle="rgb(250,148,148)";
			ctx.fillRect(this.x-1,this.y-2,2,4);
			ctx.fillRect(this.x-2,this.y-1,4,2);
			ctx.fillStyle="rgb(255,182,99)";
			ctx.fillRect(this.x-1,this.y-1,2,2);		
	},
	moveUp: function(){
		this.y -= this.speed;
		this.checkCollision(this.x,this.y-2,-2,-2);
	},
	moveDown: function(){
		this.y += this.speed;
		this.checkCollision(this.x,this.y+2,2,2);
	},
	moveLeft: function(){
		this.x -= this.speed;
		this.checkCollision(this.x-2,this.y,-2,2);
	},
	moveRight: function(){
		this.x += this.speed;
		this.checkCollision(this.x+2,this.y,2,2);
	},
	steer: function(){
		if(this.dead == false){
			if(app.calculate.up==true){
				this.moveUp();
			}
			if(app.calculate.down==true){
				this.moveDown();
			}
			if(app.calculate.left==true){
				this.moveLeft();
			}
			if(app.calculate.right==true){
				this.moveRight();
			}	
		}
	},
	checkCollision: function(a,b,c,d){
		this.imageData = ctx.getImageData(a,b,c,d);
		this.pixels = this.imageData.data;
		if(this.pixels[0] == 255 || this.pixels[2] == 255){
			this.dead = true;
		}
		if(a <= 0 || a>= canvas.width || b <= 0 || b >= canvas.height){
			this.dead = true;
		}
	
	}

};