
var Universe= function (canvas,context,x ,y ,width ,lineHeight ,image){
    this.canvas = canvas;
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.image = image;

    this.xuPoints = [];
};
Universe.prototype = {
    initXuPoints : function(xOff,yOff){
        var beginX = 50;
        var beginY = 160;
        var off34 = 60;
        var off45 = 160;
        var off13Y = -80;
        var off23Y = -40;
        var off56x = 40;
        var off56y = -40;
        var off49X = 80;
        var off49Y = -20;
        var off90 = 140;
        var off411X = 40;
        var off411Y = 60;
        var off1314 = 240;
        var off79X = off90/3;
        var off79Y = -80;
        var off811X = off49X-off411X;
        var off811Y = -(off411Y-off49Y)/2;

        //1
        this.xuPoints.push({
            x:xOff+beginX+off34/3,
            y:yOff+beginY+off13Y
        });
        //2
        this.xuPoints.push({
            x:xOff+beginX+off34*2/3,
            y:yOff+beginY+off23Y
        });


            //3
        this.xuPoints.push({
            x:xOff+beginX,
            y:yOff+beginY
        });
        //4
        this.xuPoints.push({
            x:xOff+beginX+off34,
            y:yOff+beginY
        });
        //5
        this.xuPoints.push({
            x:xOff+beginX+off34,
            y:yOff+beginY+off45
        });

        //6
        this.xuPoints.push({
            x:xOff+beginX+off34 + off56x,
            y:yOff+beginY+off45+off56y
        });
        //7
        this.xuPoints.push({
            x:xOff+beginX+off34+off49X+off79X,
            y:yOff+beginY+off49Y+off79Y
        });
        //8
        this.xuPoints.push({
            x:xOff+beginX+off34+off49X,
            y:yOff+beginY+off49Y
        });

        //9
        this.xuPoints.push({
            x:xOff+beginX+off34+off49X,
            y:yOff+beginY+off49Y
        });

        //10
        this.xuPoints.push({
            x:xOff+beginX+off34+off49X+off90,
            y:yOff+beginY+off49Y
        });

        //11
        this.xuPoints.push({
            x:xOff+beginX+off34+off411X,
            y:yOff+beginY+off411Y
        });
        var off1112X = off90+(off49X-off411X)*2
        //12
        this.xuPoints.push({
            x:xOff+beginX+off34+off411X+off1112X,
            y:yOff+beginY+off411Y
        });
        //13
        this.xuPoints.push({
            x:xOff+beginX+off34+off411X+off1112X/2,
            y:yOff+beginY+off49Y
        });

        //14
        this.xuPoints.push({
            x:xOff+beginX+off34+off411X+off1112X/2,
            y:yOff+beginY+off49Y+off1314
        });
    },
    drawStar : function (x,y,r,alp,rotateReg){
        this.context.save();
		this.context.beginPath();
        this.context.translate(x,y);
		this.context.rotate(rotateReg);	
		var offReg = (Math.PI*2 / 5) * 2;
		var reg = 0;
		var pNext = {
			x:x + r,
			y:y + 0
		};
		
		for(var i=0 ; i<5 ;i++){
			reg = offReg*i; 
			pNext.x = Math.cos(reg)*r;
			pNext.y = Math.sin(reg)*r;
			this.context.lineTo(pNext.x,pNext.y);	
		}
		this.context.closePath();

		this.context.strokeStyle = "red";
		this.context.fillStyle = "rgba(255,255,255,"+alp+")";
        this.context.fill();
        this.context.restore();
    },
	animate:function(){
        this.initXuPoints(800,140);
		var alp = 0.2 ;
		var r = 1;
		var that = this;
        var dir;
		var loop = function(time){

			if(r>=15||alp>=1){
				dir = 0;		
			}else if(r<=1||alp<=0.2){
				dir = 1;
			}
			r = dir==1? r + 15/100: r - 15/100 ;
			alp = dir==1? alp+1/100:alp-1/100;
			that.context.clearRect(0,0,this.canvas.width,this.canvas.height);
			that.context.drawImage(this.image,0,0,this.canvas.width,this.canvas.height);
		    //言字旁
            var p = that.xuPoints;
			that.drawStar(p[0].x,p[0].y,r,alp,Math.PI*4/10);
			that.drawStar(p[1].x,p[1].y,r,alp,Math.PI*4/20);
			that.drawStar(p[2].x,p[2].y,r,alp,Math.PI*4/8);
			that.drawStar(p[3].x,p[3].y,r,alp,Math.PI*4/9);
			that.drawStar(p[4].x,p[4].y,r,alp,Math.PI*4/12);
			that.drawStar(p[5].x,p[5].y,r,alp,Math.PI*4/15);

            //丿
			that.drawStar(p[6].x,p[6].y,r,alp,Math.PI*4/18);
			that.drawStar(p[7].x,p[7].y,r,alp,Math.PI*4/16);
            //两横
			that.drawStar(p[8].x,p[8].y,r,alp,Math.PI*4/17);
			that.drawStar(p[9].x,p[9].y,r,alp,Math.PI*4/6);
			that.drawStar(p[10].x,p[10].y,r,alp,Math.PI*4/13);
			that.drawStar(p[11].x,p[11].y,r,alp,Math.PI*4/11);
            //一竖
            that.drawStar(p[12].x,p[12].y,r,alp,Math.PI*4/17);
            that.drawStar(p[13].x,p[13].y,r,alp,Math.PI*4/10);
            this.context.save();
            this.context.strokeStyle = 'rgba(255,255,255,'+alp+')';
            this.context.beginPath();
            this.context.moveTo(p[0].x,p[0].y);
            this.context.lineTo(p[1].x,p[1].y);
            this.context.moveTo(p[2].x,p[2].y);
            this.context.lineTo(p[3].x,p[3].y);
            this.context.lineTo(p[4].x,p[4].y);
            this.context.lineTo(p[5].x,p[5].y);

            this.context.moveTo(p[6].x,p[6].y);
            this.context.lineTo(p[7].x,p[7].y);

            this.context.moveTo(p[8].x,p[8].y);
            this.context.lineTo(p[9].x,p[9].y);

            this.context.moveTo(p[10].x,p[10].y);
            this.context.lineTo(p[11].x,p[11].y);

            this.context.moveTo(p[12].x,p[12].y);
            this.context.lineTo(p[13].x,p[13].y);
            this.context.stroke();
            this.context.restore();
			window.requestAnimationFrame(loop);
		}
		window.requestAnimationFrame(loop);

	}
}
