window.onload=function(){
	//drawRangle();
	var N = document.getElementById("NtoAll");
	N.onclick = NtoAll;
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
			xu.lineTo(whichRect[0]);
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
			xu.lineTo(whichRect[1]);
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
			xu.lineTo(whichRect[2]);
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
			xu.lineTo(whichRect[3]);
			xu.context.stroke();
		}
	}
}
