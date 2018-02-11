"use strict"
var app = app || {};

app.calculate ={
	answers:[],
	guess:undefined,
	up:false,
	down:true,
	left:false,
	right:false,
	conflict:false,
	first:true,
	
	//Check the user's answer to determine which direction the vehicle turns
	checkMath: function(){
		var max = app.main.maxNum;

		this.guess =(document.getElementById("inputText").value);
			if(app.main.upAnswer == this.guess){
				document.getElementById("upValueOne").innerHTML = Math.floor((Math.random()*max)+1);
				document.getElementById("upValueTwo").innerHTML = Math.floor((Math.random()*max)+1);

				this.up = true;
				this.down = false;
				this.left = false;
				this.right = false;
				
			}
			if(app.main.downAnswer == this.guess){
				document.getElementById("downValueOne").innerHTML = Math.floor((Math.random()*max)+1);
				document.getElementById("downValueTwo").innerHTML = Math.floor((Math.random()*max)+1);

				
				this.down = true;
				this.up = false;
				this.left = false;
				this.right = false;
				
			}
			if(app.main.leftAnswer == this.guess){
				document.getElementById("leftValueOne").innerHTML = Math.floor((Math.random()*max)+1);
				document.getElementById("leftValueTwo").innerHTML = Math.floor((Math.random()*max)+1);
				
				this.left = true;
				this.up = false;
				this.down = false;
				this.right = false;
				
			}
			if(app.main.rightAnswer == this.guess){
				document.getElementById("rightValueOne").innerHTML = Math.floor((Math.random()*max)+1);
				document.getElementById("rightValueTwo").innerHTML = Math.floor((Math.random()*max)+1);
				
				this.right = true;
				this.up = false;
				this.down = false;
				this.left = false;
				
			}
		//console.log(this.up);
				
	},
	//Checks to make sure the answers for each direction are unique
	checkConflict: function(w,x,y,z){
		//var max = app.main.maxNum;
		this.answers = [w,x,y,z];
		for(var i=0;i<4;i++){
			var d = i;
			for(var e=0;e<3;e++){
				d++;
				if(d>3){
					d=0;
				}
				//console.log(i+", "+e+", "+ d);
				if(this.answers[i]==this.answers[d]){
					
					this.conflict = true;
					//console.log(this.conflict);
					if(this.first==true){
						this.fixConflictFirst();
						
					}else{
						this.fixConflict();
					}
				}
				else{
					this.conflict = false;
				}
			}
			
		}
		
	},
	//Randomizes conflicting operations the first runthrough so each direction has a unique answer
	fixConflictFirst: function(){
		app.main.initRandomize();
	},
	fixConflict: function(){
		var max = app.main.maxNum;
		if(this.up == true){
			document.getElementById("upValueOne").innerHTML = Math.floor((Math.random()*max)+1);
			document.getElementById("upValueTwo").innerHTML = Math.floor((Math.random()*max)+1);
		}
		if(this.down == true){
			document.getElementById("downValueOne").innerHTML = Math.floor((Math.random()*max)+1);
			document.getElementById("downValueTwo").innerHTML = Math.floor((Math.random()*max)+1);
		}
		if(this.left == true){
			document.getElementById("leftValueOne").innerHTML = Math.floor((Math.random()*max)+1);
			document.getElementById("leftValueTwo").innerHTML = Math.floor((Math.random()*max)+1);
		}
		if(this.right == true){
			document.getElementById("rightValueOne").innerHTML = Math.floor((Math.random()*max)+1);
			document.getElementById("rightValueTwo").innerHTML = Math.floor((Math.random()*max)+1);
		}
	}

};