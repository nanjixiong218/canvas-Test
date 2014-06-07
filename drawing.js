var myDraw = (function(){
	var instance;
	function init(id){
		this.p = [];
		for(var i = 0; i <= 1000; i++){
			this.p[i] = [];
			for(var j=0; j <= 1000; j++){
				var point = {x:i,y:j};		
				this.p[i][j] = point;
			}	
		}
		this.c = document.getElementById(id);
		this.context = this.c.getContext("2d");
		this.context.beginPath();
	}
	init.prototype.moveTo = function(p){
		this.context.moveTo(p.x,p.y);	
	};
	init.prototype.lineTo = function(p){
		this.context.lineTo(p.x,p.y);	
	};
	init.prototype.drawLine=function(p1,p2){
		this.moveTo(p1);	
		this.lineTo(p2);
		this.context.stroke();
	};
	init.prototype.drawCircle = function(o,r){
		//this.moveTo(this.p[500][300]);
		//this.lineTo(this.p[500][300]);//这里调用moveTo和lineTo都会多一条直线
		//moveTo的直线是产生在画圆形的时候，需要先把点移动到圆上（圆的最右边）
		//这种移动使用lineTo进行的 。
		//如果在调用lineTo的时候还没有起始点，什么都不会画，和moveTo效果一样
		this.context.arc(o.x,o.y,r,0,Math.PI*2,false);
		this.context.stroke();
	};
	init.prototype.drawRect = function(p,width,height){
		this.moveTo(p);	
		this.context.strokeRect(p.x,p.y,width,height);	
		var points = [];//为了测试，返回4个边的中点位置的点
		var p1=p,//从左上角顺时针的4个顶点
			p2={x:p.x+width,y:p.y},
			p3={x:p.x,y:p.y+height},
			p4={x:p.x+width,y:p.y+height};
		var	midN={x:(p2.x+p1.x)/2,y:p1.y},
			midS={x:(p4.x+p3.x)/2,y:p3.y},
			midW={x:p1.x,y:(p4.y+p1.y)/2};
			midE={x:p2.x,y:(p3.y+p2.y)/2};
		points.push(midN);
		points.push(midS);
		points.push(midW);
		points.push(midE);
		return points;
	};
	init.prototype.drawTriangle = function(p1,p2,p3){
		this.moveTo(p1);	
		this.lineTo(p2);
		this.lineTo(p3);
		this.lineTo(p1);
		this.context.stroke();
	
		
	}

	return {
		getInstance:function(id){
			if(!instance){
				instance = new init(id);	
				return instance;
			}else{
				return instance;	
			}	
		}
	}

})(); 
		

