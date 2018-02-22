"use strict"
var app = app || {};

app.main ={
	game_state_menu:1,
	game_state_play:2,
	game_state_end:3,
	start:false,
	gameState:undefined,
	maxNum:12,
	countdown:4,
	lineWidth:3,
	ctx:undefined,
	canvas:undefined,
	lastTime:undefined,
	input:undefined,
	topCanvas:undefined,
	topCtx:undefined,
	upNumA:undefined,
	upNumB:undefined,
	downNumA:undefined,
	downNumB:undefined,
	leftNumA:undefined,
	leftNumB:undefined,
	rightNumA:undefined,
	rightNumB:undefined,
	upAnswer:undefined,
	downAnswer:undefined,
	leftAnswer:undefined,
	rightAnswer:undefined,

	draw: function(){
		//Clear the canvas
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.drawImage(topCanvas,0,0);
		topCtx.clearRect(0,0,canvas.width,canvas.height);
		//var now = new Date();
		//var delta = now - this.lastTime;
		//console.log(delta);
		if(this.gameState == this.game_state_menu){
			// hide centerbox to start
			var cb = $('#centerBox');
			cb.css("visibility", "hidden");

			this.drawMenu();
			//ctx.fillStyle="black";
			//ctx.fillRect(0,0,700,600);
		}
		if(this.gameState == this.game_state_play){
			//Get the operating numbers
			this.upNumA = document.getElementById("upValueOne").innerHTML;
			this.upNumB = document.getElementById("upValueTwo").innerHTML;
			this.downNumA = document.getElementById("downValueOne").innerHTML;
			this.downNumB = document.getElementById("downValueTwo").innerHTML;
			this.leftNumA = document.getElementById("leftValueOne").innerHTML;
			this.leftNumB = document.getElementById("leftValueTwo").innerHTML;
			this.rightNumA = document.getElementById("rightValueOne").innerHTML;
			this.rightNumB = document.getElementById("rightValueTwo").innerHTML;
			//Get the answers for each direction
			this.upAnswer = this.upNumA*this.upNumB;
			this.downAnswer = this.downNumA*this.downNumB;
			this.leftAnswer = this.leftNumA*this.leftNumB;
			this.rightAnswer = this.rightNumA*this.rightNumB;
			//runs the checkConflict function in calculate
			app.calculate.checkConflict(this.upAnswer,this.downAnswer,this.leftAnswer,this.rightAnswer);

			if(app.cycle.dead || app.enemyCycle.dead){
				this.start = false; // stop the cyles from moving
				this.gameState = this.game_state_end;
			}
			this.drawCount();
		}
		if(this.gameState == this.game_state_play || this.gameState == this.game_state_end){
			//Draw center box during game
			topCtx.drawImage(squareCanvas,0,0);
			//Draw player cycle
			app.cycle.update(this.start);
			//Draw enemy cycle
			app.enemyCycle.enemyUpdate(this.start);
		}
		if(this.gameState == this.game_state_end){
			var cb = $('#centerBox');
			cb.css("visibility", "hidden");
			if(app.cycle.dead){
				this.drawGameOver("Blue","rgb(30,144,255)")
			}else if(app.enemyCycle.dead){
				this.drawGameOver("Red","red");
			}
		}
		//this.lastTime = new Date();
		requestAnimationFrame(this.draw.bind(this));
	},

	//readText fires when the ENTER key is pressed
	//it then runs the checkMath method in calculate and clears the input textbox
	readText: function(e){
		if(e.keyCode == 13){
			app.calculate.first = false;
			app.calculate.checkMath();
			input.value = "";
		}
	},

	initRandomize: function(){
		var z = app.main.maxNum;
		document.getElementById("upValueOne").innerHTML = Math.floor((Math.random()*z)+1);
		document.getElementById("upValueTwo").innerHTML = Math.floor((Math.random()*z)+1);
		document.getElementById("downValueOne").innerHTML = Math.floor((Math.random()*z)+1);
		document.getElementById("downValueTwo").innerHTML = Math.floor((Math.random()*z)+1);
		document.getElementById("leftValueOne").innerHTML = Math.floor((Math.random()*z)+1);
		document.getElementById("leftValueTwo").innerHTML = Math.floor((Math.random()*z)+1);
		document.getElementById("rightValueOne").innerHTML = Math.floor((Math.random()*z)+1);
		document.getElementById("rightValueTwo").innerHTML = Math.floor((Math.random()*z)+1);
	},
	ready: function(){
		//Focus the textbox rand add an event listener for readText method
		//input.focus();
		input.addEventListener("keypress", app.main.readText, false);
		//Add key event listener
		window.addEventListener("keydown", app.main.changeGameState, false);
		//Draw center square around textbox and content
		var boxWidth = 300;
		var boxHeight = 140;
		squareCtx.lineWidth = this.lineWidth;
		squareCtx.strokeStyle = "rgb(0,255,255)";
		squareCtx.rect(canvas.width/2-boxWidth/2,canvas.height/2-boxHeight/2,boxWidth,boxHeight);
		squareCtx.stroke();
		//Randomize numbers
		this.initRandomize();
		//Setup players
		app.cycle.init();
		app.enemyCycle.init();
		//this.startCount();
		// set game state to main menu
		this.gameState = this.game_state_menu;


			/* Positions centerbox */

			var game = $('#gameCanvas');
			var offset = game.offset();
			var width = $('#centerBox').width();
			var height = $('#centerBox').height();
			var coords = {x: offset.left + this.lineWidth + canvas.width/2 - width/2, y: offset.top + this.lineWidth + canvas.height/2 - height/2};
			$('#centerBox').css({
				"left":coords.x,
				"top":coords.y
			});



		//Call draw method
		this.draw();
	},
	timedCount:function(){
		this.countdown --;
		if(this.countdown >= 0){
			setTimeout(function(){app.main.timedCount()},1000);
		}
		else{
			var cb = $('#centerBox');
			cb.css("visibility", "visible");
			input.focus();
			this.start = true;
		}
	},
	drawCount:function(){
		if(this.countdown < 0) return;
		topCtx.textAlign = "center";
		topCtx.textBaseline = "middle";
		topCtx.font="40px 'Press Start 2P'";
		topCtx.fillStyle="white";
		//topCtx.clearRect(0,0,canvas.width,canvas.height);
		topCtx.fillText(this.countdown,canvas.width/2,canvas.height/2);
	},
	changeGameState:function(e){
		if(e.keyCode == "32"){
			if(app.main.gameState == app.main.game_state_menu){
				app.main.gameState = app.main.game_state_play;
				app.main.timedCount();
			}
			if(app.main.gameState == app.main.game_state_end){
				app.main.gameState = app.main.game_state_menu;
				app.main.reset();
			}
		}
	},
	drawMenu:function(){
		ctx.save();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "white";
		ctx.font="60px 'Press Start 2P'";
		ctx.fillText("Cycles", canvas.width/2, canvas.height/2 - 50);
		ctx.font="14px 'Press Start 2P'";
		ctx.fillText("( Press 'Space' to Play )", canvas.width/2, canvas.height/2 + 30);
		ctx.restore();
	},
	drawGameOver:function(winner,color){
		ctx.save();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font="28px 'Press Start 2P'";
		ctx.fillStyle="white";
		ctx.fillText("GAME OVER",canvas.width/2,canvas.height/2-26);
		ctx.font="14px 'Press Start 2P'";
		ctx.fillStyle= color;
		ctx.fillText(winner + " Player Wins!", canvas.width/2, canvas.height/2 + 12);
		ctx.font="8px 'Press Start 2P'";
		ctx.fillStyle="white";
		ctx.fillText("( Press 'Space' to Play Again )", canvas.width/2, canvas.height/2 + 42);
		ctx.restore();
		input.blur();
	},
	reset:function(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		topCtx.clearRect(0,0,canvas.width,canvas.height);
		app.cycle.dead = false;
		app.enemyCycle.dead = false;
		app.cycle.init();
		app.enemyCycle.init();
		this.countdown = 4;
		input.value = "";
	}
};

window.onload = function(){
	this.canvas = document.getElementById("gameCanvas");
	this.ctx = this.canvas.getContext('2d');
	this.topCanvas = document.getElementById("topCanvas");
	this.topCtx = this.topCanvas.getContext('2d');
	this.squareCanvas = document.getElementById("squareCanvas");
	this.squareCtx = this.squareCanvas.getContext('2d');
	this.input = document.getElementById("inputText");
	app.main.ready();
};
