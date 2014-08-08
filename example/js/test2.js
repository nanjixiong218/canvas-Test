window.onload=function(){
	//drawRangle();
	var N = document.getElementById("NtoAll");
	var S = document.getElementById("StoAll");
	var W = document.getElementById("WtoAll");
	var E = document.getElementById("EtoAll");
	N.onclick = NtoAll;
	S.onclick = StoAll;
	W.onclick = WtoAll;
	E.onclick = EtoAll;
	//getPointsAllTest();
}

function  drawRangle(){
				var xu = myDraw.getInstance("mycanvas"); 
				xu.drawCircle(xu.p[200][200],100);
				xu.drawRect(xu.p[400][200],100,100);
				xu.drawTriangle(xu.p[100][100],xu.p[200][300],xu.p[400][100]);

}
function getPointsAllTest(){
	var xu = myDraw.getInstance("mycanvas");
	var rect1P = xu.drawRect(xu.p[100][100],100,100);
	var rect2P = xu.drawRect(xu.p[700][100],100,100);
	var rect3P = xu.drawRect(xu.p[100][400],100,100);
	var rect4P = xu.drawRect(xu.p[700][400],100,100);
	var rect5P = xu.drawRect(xu.p[450][250],100,100);
	var rectPs = [rect1P,rect2P,rect3P,rect4P,rect5P];	
	return rectPs;
		
}
function NtoAll(){
	//alert("NtoAll");


	var rectPs = getPointsAllTest();
	var rectMid = rectPs[4];
	var rect1 = rectPs[0];
	var rect2 = rectPs[1];
	var rect3 = rectPs[2];
	var rect4 = rectPs[3];
	var xu = myDraw.getInstance("mycanvas");
	xu.context.strokeStyle="blue";
	getNtoAllN(rect1)();
	getNtoAllN(rect2)();
	getNtoAllN(rect3)();
	getNtoAllN(rect4)();
	function getNtoAllN(whichRect){
		return function (){
			xu.moveTo(rectMid[0]);	
			var points = getPointArray(0,0,rectMid[0],whichRect[0],"N","N");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.context.stroke();
		}
	}
	getNtoAllS(rect1)();
	getNtoAllS(rect2)();
	getNtoAllS(rect3)();
	getNtoAllS(rect4)();
	function getNtoAllS(whichRect){
		return function (){
			xu.moveTo(rectMid[0]);	
			var points = getPointArray(0,0,rectMid[0],whichRect[1],"N","S");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.context.stroke();
		}
	}
	getNtoAllW(rect1)();
	getNtoAllW(rect2)();
	getNtoAllW(rect3)();
	getNtoAllW(rect4)();
	function getNtoAllW(whichRect){
		return function (){
			xu.moveTo(rectMid[0]);	
			var points = getPointArray(0,0,rectMid[0],whichRect[2],"N","W");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.context.stroke();
		}
	}
	getNtoAllE(rect1)();
	getNtoAllE(rect2)();
	getNtoAllE(rect3)();
	getNtoAllE(rect4)();
	function getNtoAllE(whichRect){
		return function (){
			xu.moveTo(rectMid[0]);	
			var points = getPointArray(0,0,rectMid[0],whichRect[3],"N","E");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.context.stroke();
		}
	}
}
function StoAll(){
	//alert("NtoAll");

	var rectPs = getPointsAllTest();
	var rectMid = rectPs[4];
	var rect1 = rectPs[0];
	var rect2 = rectPs[1];
	var rect3 = rectPs[2];
	var rect4 = rectPs[3];
	var xu = myDraw.getInstance("mycanvas");

	xu.context.strokeStyle="green";
	
	getStoAllN(rect1)();
	getStoAllN(rect2)();
	getStoAllN(rect3)();
	getStoAllN(rect4)();
	function getStoAllN(whichRect){
		return function (){
			xu.moveTo(rectMid[1]);	
			var points = getPointArray(0,0,rectMid[1],whichRect[0],"S","N");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.lineTo(whichRect[0]);
			xu.context.stroke();
		}
	}
	getStoAllS(rect1)();
	getStoAllS(rect2)();
	getStoAllS(rect3)();
	getStoAllS(rect4)();
	function getStoAllS(whichRect){
		return function (){
			xu.moveTo(rectMid[1]);	
			var points = getPointArray(0,0,rectMid[1],whichRect[1],"S","S");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.lineTo(whichRect[1]);
			xu.context.stroke();
		}
	}
	getStoAllW(rect1)();
	getStoAllW(rect2)();
	getStoAllW(rect3)();
	getStoAllW(rect4)();
	function getStoAllW(whichRect){
		return function (){
			xu.moveTo(rectMid[1]);	
			var points = getPointArray(0,0,rectMid[1],whichRect[2],"S","W");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.lineTo(whichRect[2]);
			xu.context.stroke();
		}
	}
	getStoAllE(rect1)();
	getStoAllE(rect2)();
	getStoAllE(rect3)();
	getStoAllE(rect4)();
	function getStoAllE(whichRect){
		return function (){
			xu.moveTo(rectMid[1]);	
			var points = getPointArray(0,0,rectMid[1],whichRect[3],"S","E");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.lineTo(whichRect[3]);
			xu.context.stroke();
		}
	}
}
function WtoAll(){
	//alert("NtoAll");

	var rectPs = getPointsAllTest();
	var rectMid = rectPs[4];
	var rect1 = rectPs[0];
	var rect2 = rectPs[1];
	var rect3 = rectPs[2];
	var rect4 = rectPs[3];
	var xu = myDraw.getInstance("mycanvas");

	xu.context.strokeStyle="red";

	getWtoAllN(rect1)();
	getWtoAllN(rect2)();
	getWtoAllN(rect3)();
	getWtoAllN(rect4)();
	function getWtoAllN(whichRect){
		return function (){
			xu.moveTo(rectMid[2]);	
			var points = getPointArray(0,0,rectMid[2],whichRect[0],"W","N");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.lineTo(whichRect[0]);
			xu.context.stroke();
		}
	}
	getWtoAllS(rect1)();
	getWtoAllS(rect2)();
	getWtoAllS(rect3)();
	getWtoAllS(rect4)();
	function getWtoAllS(whichRect){
		return function (){
			xu.moveTo(rectMid[2]);	
			var points = getPointArray(0,0,rectMid[2],whichRect[1],"W","S");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.lineTo(whichRect[1]);
			xu.context.stroke();
		}
	}
	getWtoAllW(rect1)();
	getWtoAllW(rect2)();
	getWtoAllW(rect3)();
	getWtoAllW(rect4)();
	function getWtoAllW(whichRect){
		return function (){
			xu.moveTo(rectMid[2]);	
			var points = getPointArray(0,0,rectMid[2],whichRect[2],"W","W");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.lineTo(whichRect[2]);
			xu.context.stroke();
		}
	}
	getWtoAllE(rect1)();
	getWtoAllE(rect2)();
	getWtoAllE(rect3)();
	getWtoAllE(rect4)();
	function getWtoAllE(whichRect){
		return function (){
			xu.moveTo(rectMid[2]);	
			var points = getPointArray(0,0,rectMid[2],whichRect[3],"W","E");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.lineTo(whichRect[3]);
			xu.context.stroke();
		}
	}
}
function EtoAll(){
	//alert("NtoAll");

	var rectPs = getPointsAllTest();
	var rectMid = rectPs[4];
	var rect1 = rectPs[0];
	var rect2 = rectPs[1];
	var rect3 = rectPs[2];
	var rect4 = rectPs[3];
	var xu = myDraw.getInstance("mycanvas");

	getEtoAllN(rect1)();
	getEtoAllN(rect2)();
	getEtoAllN(rect3)();
	getEtoAllN(rect4)();
	function getEtoAllN(whichRect){
		return function (){
			xu.moveTo(rectMid[3]);	
			var points = getPointArray(0,0,rectMid[3],whichRect[0],"E","N");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.lineTo(whichRect[0]);
			xu.context.stroke();
		}
	}
	getEtoAllS(rect1)();
	getEtoAllS(rect2)();
	getEtoAllS(rect3)();
	getEtoAllS(rect4)();
	function getEtoAllS(whichRect){
		return function (){
			xu.moveTo(rectMid[3]);	
			var points = getPointArray(0,0,rectMid[3],whichRect[1],"E","S");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.lineTo(whichRect[1]);
			xu.context.stroke();
		}
	}
	getEtoAllW(rect1)();
	getEtoAllW(rect2)();
	getEtoAllW(rect3)();
	getEtoAllW(rect4)();
	function getEtoAllW(whichRect){
		return function (){
			xu.moveTo(rectMid[3]);	
			var points = getPointArray(0,0,rectMid[3],whichRect[2],"E","W");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.lineTo(whichRect[2]);
			xu.context.stroke();
		}
	}
	getEtoAllE(rect1)();
	getEtoAllE(rect2)();
	getEtoAllE(rect3)();
	getEtoAllE(rect4)();
	function getEtoAllE(whichRect){
		return function (){
			xu.moveTo(rectMid[3]);	
			var points = getPointArray(0,0,rectMid[3],whichRect[3],"E","E");
			points.forEach(function(p){
				xu.lineTo(p);	
			});
			xu.lineTo(whichRect[3]);
			xu.context.stroke();
		}
	}
}
