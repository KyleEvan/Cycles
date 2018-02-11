"use strict"
var app = app || {};

app.enemyCycle ={
	ax:undefined,
	ay:undefined,
	//x:undefined,
	//y:undefined,
	speed:1.2,
	moveUp:true,
	moveDown:false,
	moveLeft:false,
	moveRight:false,
	turnProbability:1,
	frontValue:undefined,
	upValue:undefined,
	downValue:undefined,
	leftValue:undefined,
	rightValue:undefined,
	cooldown:0,
	enemyReactionTime:10,
	imageData:undefined,
	pixels:undefined,
	coords:[],
	dist:[],
	turnArray:[],
	dead: false,


	init: function(){
		this.ax = canvas.width * .25;
		this.ay = canvas.height - 10;
		topCtx.lineWidth = 3;
		topCtx.strokeStyle="rgb(30,144,255)";
		topCtx.beginPath();
		topCtx.moveTo(this.ax,this.ay);	
	},
	enemyUpdate: function(start){

		ctx.fillStyle="green";
		topCtx.lineTo(this.ax,this.ay);
		topCtx.stroke();
		if(start)this.enemySteer();
		this.draw();
		//ctx.fillRect(this.ax-5,this.ay-5,10,10);
		//this.cooldown --;

	},
	draw: function(){
		ctx.fillStyle="rgb(30,144,255)";
		ctx.fillRect(this.ax-5,this.ay-2,10,4);
		ctx.fillRect(this.ax-3,this.ay-5,6,6);
		ctx.fillRect(this.ax-3,this.ay,6,5);
		ctx.fillStyle="rgb(145,201,255)";
		ctx.fillRect(this.ax-1,this.ay-2,2,4);
		ctx.fillRect(this.ax-2,this.ay-1,4,2);
		ctx.fillStyle="rgb(255,182,99)";
		ctx.fillRect(this.ax-1,this.ay-1,2,2);
	},
	enemyMove: function(){
		if(this.moveUp){
			this.ay -= this.speed;
			this.checkCollision(this.ax,this.ay-1,-1,-1);
		}
		if(this.moveDown){
			this.ay += this.speed;
			this.checkCollision(this.ax,this.ay+1,1,1);
		}
		if(this.moveLeft){
			this.ax -= this.speed;
			this.checkCollision(this.ax-1,this.ay,-1,1);
		}
		if(this.moveRight){
			this.ax += this.speed;
			this.checkCollision(this.ax+1,this.ay,1,1);
		}
	},
	enemySteer: function(){
		if(this.dead == false){
			if(this.cooldown <=0){
				this.checkFront();
				this.checkDistances();
				this.checkTurn();
				//if(this.turnArray[2] <= 3){
				//	this.dead = true;
				//}
				//if(this.turnArray[2] <= 50){
				if(this.frontValue <= 50){
					this.turn();
				}
				else{
					if(Math.random()<this.turnProbability/60){
						this.turn();
					}
				}
				this.turnArray = [];
				this.cooldown = 60/this.enemyReactionTime;
			}
			this.enemyMove();
			this.cooldown --;
		}
	},
	checkDistances: function(){
	//UP / DOWN
		if(this.moveUp == true || this.moveDown == true){
			this.leftValue = app.calcDistances.calcDist(0,this.ay,this.ax-3,1,this.ax-3,this.ax,this.ax);
			
			this.rightValue = app.calcDistances.calcDist(this.ax+3,this.ay,canvas.width-this.ax+3,1,canvas.width-this.ax+3,0,canvas.width - this.ax);		
		}
	//LEFT / RIGHT
		if(this.moveLeft == true || this.moveRight == true){
			this.upValue = app.calcDistances.calcDist(this.ax,0,1,this.ay-3,this.ay-3,this.ay,this.ay);

			this.downValue = app.calcDistances.calcDist(this.ax,this.ay+3,1,canvas.height-this.ay+3,canvas.height-this.ay+3,0,canvas.height - this.ay);
		}
	},
	checkFront: function(){
		if(this.moveUp){
			this.frontValue = app.calcDistances.calcDist(this.ax,0,1,this.ay-3,this.ay-3,this.ay,this.ay);		
		}
		if(this.moveDown){
			this.frontValue = app.calcDistances.calcDist(this.ax,this.ay+3,1,canvas.height-this.ay+3,canvas.height-this.ay+3,0,canvas.height - this.ay);	
		}
		if(this.moveLeft){
			this.frontValue = app.calcDistances.calcDist(0,this.ay,this.ax-3,1,this.ax-3,this.ax,this.ax);
		}
		if(this.moveRight){
			this.frontValue = app.calcDistances.calcDist(this.ax+3,this.ay,canvas.width-this.ax+3,1,canvas.width-this.ax+3,0,canvas.width - this.ax);	
		}
	},
	checkTurn: function(){
		if(this.moveUp){
			this.turnArray.push(this.frontValue);
			this.turnArray.push(this.leftValue);
			this.turnArray.push(this.rightValue);
			this.turnArray.sort(function(a,b){return b-a});		
		}
		if(this.moveDown){
			this.turnArray.push(this.frontValue);
			this.turnArray.push(this.leftValue);
			this.turnArray.push(this.rightValue);
			this.turnArray.sort(function(a,b){return b-a});	
		}
		if(this.moveLeft){
			this.turnArray.push(this.frontValue);
			this.turnArray.push(this.upValue);
			this.turnArray.push(this.downValue);
			this.turnArray.sort(function(a,b){return b-a});			
		}
		if(this.moveRight){
			this.turnArray.push(this.frontValue);
			this.turnArray.push(this.upValue);
			this.turnArray.push(this.downValue);
			this.turnArray.sort(function(a,b){return b-a});	
		}
	},
	turn: function(){
		if(this.moveUp){
			this.moveUp = false;
				if(this.turnArray[0] == this.frontValue){
					this.moveUp = true;
					return;		
				}
				if(this.turnArray[0] == this.leftValue){
					this.moveLeft = true;
					return;
				}
				if(this.turnArray[0] == this.rightValue){
					this.moveRight = true;
					return;
				}
		}
		if(this.moveDown){
			this.moveDown = false;
				if(this.turnArray[0] == this.frontValue){
					this.moveDown = true;
					return;		
				}
				if(this.turnArray[0] == this.leftValue){
					this.moveLeft = true;
					return;
				}
				if(this.turnArray[0] == this.rightValue){
					this.moveRight = true;
					return;
				}
		}
		if(this.moveLeft){
			this.moveLeft = false;
				if(this.turnArray[0] == this.frontValue){
					this.moveLeft = true;
					return;		
				}
				if(this.turnArray[0] == this.upValue){
					this.moveUp = true;
					return;
				}
				if(this.turnArray[0] == this.downValue){
					this.moveDown = true;
					return;
				}
		}
		if(this.moveRight){
			this.moveRight = false;
				if(this.turnArray[0] == this.frontValue){
					this.moveRight = true;
					return;		
				}
				if(this.turnArray[0] == this.upValue){
					this.moveUp = true;
					return;
				}
				if(this.turnArray[0] == this.downValue){
					this.moveDown = true;
					return;
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
	// enemyRandomMovement: function(){
		// this.x = app.cycle.x;
		// this.y = app.cycle.y;
		// var n;
		// if(this.moveUp){

				// if(Math.random()<this.turnProbability/60){			
				// n = Math.random();			
					// if(this.ax > this.x){
						// if(n<=.75){
							// this.moveUp = false;
							// this.moveLeft=true;
							// return;
						// }else{
							// this.moveUp = false;
							// this.moveRight=true;
							// return;
						// }
					// }else{
						// if(n<=.75){
							// this.moveUp = false;
							// this.moveRight=true;
							// return;
						// }else{
							// this.moveUp = false;
							// this.moveLeft=true;
							// return;
						// }	
					// }
				// }
			
		// }
		// if(this.moveDown){
			
				// if(Math.random()<this.turnProbability/60){			
					// n = Math.random();	
						// if(this.ax > this.x){
							// if(n<=.75){
								// this.moveDown = false;
								// this.moveLeft=true;
								// return;
							// }else{
								// this.moveDown = false;
								// this.moveRight=true;
								// return;
							// }
						// }else{
							// if(n<=.75){
								// this.moveDown = false;
								// this.moveRight=true;
								// return;
							// }else{
								// this.moveDown = false;
								// this.moveLeft=true;
								// return;
							// }	
						// }
				// }
			
		// }
		// if(this.moveLeft){
			
				// if(Math.random()<this.turnProbability/60){	
					// n = Math.random();
						// if(this.ay > this.y){
							// if(n<=.75){
								// this.moveLeft = false;
								// this.moveUp=true;
								// return;
							// }else{
								// this.moveLeft = false;
								// this.moveDown=true;
								// return;
							// }
						// }else{
							// if(n<=.75){
								// this.moveLeft = false;
								// this.moveDown=true;
								// return;
							// }else{
								// this.moveLeft = false;
								// this.moveUp=true;
								// return;
							// }	
						// }
				// }
					
		// }
		// if(this.moveRight){
			
				// if(Math.random()<this.turnProbability/60){					
					// n = Math.random();
						// if(this.ay > this.y){
							// if(n<=.75){
								// this.moveRight = false;
								// this.moveUp=true;
								// return;
							// }else{
								// this.moveRight = false;
								// this.moveDown=true;
								// return;
							// }
						// }else{
							// if(n<=.75){
								// this.moveRight = false;
								// this.moveDown=true;
								// return;
							// }else{
								// this.moveRight = false;
								// this.moveUp=true;
								// return;
							// }	
						// }
				// }	
			
		// }
	// }

};