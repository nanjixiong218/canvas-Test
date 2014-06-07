var myDraw = (function(){
	var instance;
	function init(id){
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
	init.prototype.drawCircle = function(o,r){
		this.moveTo(o);
		this.context.arc(o.x,o.y,r,0,Math.PI*2,false);
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
		

