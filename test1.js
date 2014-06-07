	
function canvasApiTest(){
	var c  = document.getElementById("mycanvas");	
	var cxt = c.getContext("2d");
	cxt.fillStyle="#ff0000";	
	cxt.fillRect(200,200,150,75);
	cxt.fillStyle="rgba(0,0,255,0.5)";
	cxt.fillRect(210,210,150,75);
	cxt.strokeStyle="green";
	cxt.lineWidth = "4";
	cxt.strokeRect(200,200,150,75);
	cxt.strokeStyle="black";
	cxt.strokeRect(210,210,150,75);
	cxt.clearRect(220,220,50,50);
	var imgUri = c.toDataURL("image/png");
	var image = document.createElement("img");
	image.src = imgUri;
	document.body.appendChild(image);
}

function getPointsArrayTest(){
	var p1={x:100,y:50},
		p2={x:200,y:50},
		p3={x:200,y:100},
		p4={x:100,y:100},
		midN={x:(p2.x+p1.x)/2,y:p1.y},
		midS={x:(p4.x+p3.x)/2,y:p3.y},
		midW={x:p1.x,y:(p4.y+p1.y)/2};
		midE={x:p2.x,y:(p3.y+p2.y)/2};

	var
		p5={x:400,y:300},
		p6={x:500,y:300},
		p7={x:500,y:350},
		p8={x:400,y:350};
		midN1={x:(p6.x+p5.x)/2,y:p5.y},
		midS1={x:(p8.x+p7.x)/2,y:p7.y},
		midW1={x:p5.x,y:(p8.y+p5.y)/2};
		midE1={x:p6.x,y:(p7.y+p6.y)/2};

	var c  = document.getElementById("mycanvas");	
	var cxt = c.getContext("2d");
	cxt.beginPath();
	//画出矩形
	moveTo(p1);	
	lineTo(p2);	
	lineTo(p3);
	lineTo(p4);
	lineTo(p1);
	moveTo(p5);
	lineTo(p6);	
	lineTo(p7);
	lineTo(p8);
	lineTo(p5);
	//连接midN和midE1
	var pointsMids = getPointArray(0,0,midN,midN1,"N","N");
	console.log(pointsMids);
	moveTo(midN);
	pointsMids.forEach(function(p){
		lineTo(p);	
	});
	lineTo(midN1);
	//连接midN和midE1
	pointsMids = getPointArray(0,0,midN,midE1,"N","E");
	moveTo(midN);
	pointsMids.forEach(function(p){
		lineTo(p);	
	});
	lineTo(midE1);
	//连接midN和midS1
	pointsMids = getPointArray(0,0,midN,midS1,"N","S");
		moveTo(midN);
	pointsMids.forEach(function(p){
		lineTo(p);	
	});
	lineTo(midS1);
	//连接midN和midW1
	pointsMids = getPointArray(0,0,midN,midW1,"N","W");
	moveTo(midN);
	pointsMids.forEach(function(p){
			lineTo(p);	
	});
	lineTo(midW1);
	cxt.stroke();
	
	function lineTo(p){
		cxt.lineTo(p.x,p.y);
	}
	function moveTo(p){
		cxt.moveTo(p.x,p.y);
	}
}
	window.onload=function(){
		canvasApiTest();//cxt在这里设置了lineheight，在下一个函数中还会有效。
		//我想应该是getContext是一个单例。所以执行过一次后，其实例就一直存在了，
		//每次调用getContext()得到的都是同一个实例。
		getPointsArrayTest();
	}	


