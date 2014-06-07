window.onload=function(){
	//drawRangle();
	getPointsAllTest();
}
function  drawRangle(){
				var xu = myDraw.getInstance("mycanvas"); 
				xu.drawCircle(xu.p[200][200],100);
				xu.drawRect(xu.p[400][200],100,100);
				xu.drawTriangle(xu.p[100][100],xu.p[200][300],xu.p[400][100]);

}
function getPointsAllTest(){
	var xu = myDraw.getInstance("mycanvas");
	xu.drawLine(xu.p[500][0],xu.p[500][600]);
	xu.drawLine(xu.p[0][300],xu.p[1000][300]);
	var rect1P = xu.drawRect(xu.p[100][100],100,100);
	var rect2P = xu.drawRect(xu.p[700][100],100,100);
	var rect3P = xu.drawRect(xu.p[100][400],100,100);
	var rect4P = xu.drawRect(xu.p[700][400],100,100);
	var rect5P = xu.drawRect(xu.p[450][250],100,100);
	
		
}
