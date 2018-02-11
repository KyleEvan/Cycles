"use strict"
var app = app || {};

app.calcDistances ={
	imageData:undefined,
	pixels:undefined,
	coords:[],
	dist:[],
	frontValue:undefined,
	cooldown:undefined,
	
	calcDist: function(imgX,imgY,imgW,imgH,firstVal,secondVal,thirdVal){
			this.imageData = ctx.getImageData(imgX,imgY,imgW,imgH);
			this.pixels = this.imageData.data;
			for(var i = this.pixels.length; i>=0; i-=4){
				if(this.pixels[i+3]>0){
					if(this.pixels[i] == 255){
						this.coords.push((i/4)%(firstVal));
					}
					if(this.pixels[i+2] == 255){
						this.coords.push((i/4)%(firstVal));
					}
				}
			}
				for(var c = 0; c < this.coords.length; c++){
					var distances;
					if(secondVal == 0){
						distances = this.coords[c];
					}
					else{
						distances = secondVal-this.coords[c];
					}
					this.dist.push(distances);
				}
					if(this.dist.length != 0){
						var index = 0;
						this.frontValue = this.dist[0];
						for(var i = 1; i < this.dist.length; i++){
							if(this.dist[i]<this.frontValue){
								this.frontValue = this.dist[i];
								index = i;
							}
						}
					}
						else{
							this.frontValue = thirdVal;
						}
			this.coords = [];
			this.dist = [];
			return this.frontValue;
		
	}
};

