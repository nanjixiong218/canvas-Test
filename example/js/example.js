var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var FONT_HEIGHT = 15;
var MARGIN = 35;
var RADIUS = canvas.width/2 - MARGIN;
var NUMBER_SPACING = 20;
var NUMBER_RADIUS = RADIUS+NUMBER_SPACING;

var SECOND_TRUNCATION = canvas.width/25;
var MINITE_TRUNCATION =canvas.width/15;
var HOUR_TRUNCATION =canvas.width/10;
var SECOND_HAND = RADIUS - SECOND_TRUNCATION;
var MINITE_HAND = RADIUS - MINITE_TRUNCATION;
var HOUR_HAND = RADIUS - HOUR_TRUNCATION;

var HANDSRADIUS = [SECOND_HAND,MINITE_HAND,HOUR_HAND];
var DBPI = Math.PI*2; 

function drawClock(){

	context.clearRect(0,0,canvas.width,canvas.height);

	//context.save();

	//context.fillStyle = 'rgba(255,255,255,0.8)';
	//context.fillRect(0,0,canvas.width,canvas.height);

	drawCircle();
	drawCenter();
	drawHands();

	//context.restore();
	drawNumber();
	updateClockImage();
}

//画圆形
function drawCircle(){
	
	context.beginPath();
	context.arc(canvas.width/2,canvas.height/2,RADIUS,0,DBPI,true);
	context.stroke();
}
//画圆心
function drawCenter(){

	context.beginPath();
	context.arc(canvas.width/2,canvas.height/2,5,0,DBPI,true);
	context.fill();
}
//画时，分，秒针
function drawHands(){
	var date = new Date();
	var hour = date.getHours();
	    hour = hour > 12 ? hour -12 :hour;
	var minite = date.getMinutes();
	var second = date.getSeconds();
	var agSecond = DBPI*(second/60);
	var agMinite = DBPI*((minite+second/60)/60);
	var agHour = DBPI*(hour+minite/60+second/(60*60))/12;
/*
	console.log(second);
	console.log(minite);
	console.log(hour);
	console.log(agSecond);
	console.log(agMinite);
	console.log(agHour);
*/
	drawHand(agSecond,0);
	drawHand(agMinite,1);
	drawHand(agHour,2);

}
//分别画时，分，秒针
function drawHand(angle,type){
	angle = angle - Math.PI/2;		//向右转半圈
	var handRadius = HANDSRADIUS[type]; 
	context.beginPath();//这里有没有beginPath都可以啊
	context.moveTo(canvas.width/2,canvas.height/2);
	context.lineTo(canvas.width/2+handRadius*Math.cos(angle),
			       canvas.height/2+handRadius*Math.sin(angle));
	context.stroke();
}
//画数字
function drawNumber(){
	var numerals = [1,2,3,4,5,6,7,8,9,10,11,12];
		angle = 0;
		numeralWidth = 0;

	numerals.forEach(function(numeral){
		//二派分成12份，每份六分之派，3的位置是0,2的位置是向上一份的度数，二的位置是向上一份的度数，
		//四的位置是向下一份的度数
		angle = Math.PI/6*(numeral-3);   
		numeralWidth = context.measureText(numeral).width;
		context.fillText(numeral,
			canvas.width/2+Math.cos(angle)*NUMBER_RADIUS-numeralWidth,
			canvas.height/2+Math.sin(angle)*NUMBER_RADIUS+FONT_HEIGHT/3
		);
			
	});
}

function updateClockImage(){
	document.getElementById("snapshotImage").src=canvas.toDataURL();
}


context.font = FONT_HEIGHT+'px Arial';
loop  = setInterval(drawClock,1000);

