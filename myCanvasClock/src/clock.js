var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var FONT_HEIGHT = 15;
//圆和canvas的间距
var MARGIN = 35;
//圆的半径
var RADIUS = canvas.width/2 - MARGIN;
//周围数字与圆的间距
var NUMBER_SPACING = 20;
//数字的位置
var NUMBER_RADIUS = RADIUS+NUMBER_SPACING;
//时分秒针与圆半径的长度差
var SECOND_TRUNCATION = canvas.width/25;
var MINITE_TRUNCATION =canvas.width/15;
var HOUR_TRUNCATION =canvas.width/8;
//时分秒针的半径
var SECOND_HAND = RADIUS - SECOND_TRUNCATION;
var MINITE_HAND = RADIUS - MINITE_TRUNCATION;
var HOUR_HAND = RADIUS - HOUR_TRUNCATION;
//s时分秒针半径数组
var HANDSRADIUS = [SECOND_HAND,MINITE_HAND,HOUR_HAND];
//眼睛的位置，半径
var EYEX1 = canvas.width/2 - RADIUS/2;
var EYEX2 = canvas.width/2 + RADIUS/2;
var EYEY = canvas.height/2 - RADIUS/2;
var EYER = RADIUS/10;

var DBPI = Math.PI*2;
//用于控制眼睛动
var flag = 0;
var dir = 1;

var MOUSEX = canvas.width/2;
var MOUSEY = canvas.height/2 - RADIUS/2;
var MOUSER = RADIUS+RADIUS/5;

function drawClock(){

	context.clearRect(0,0,canvas.width,canvas.height);

	//context.save();

	//context.fillStyle = 'rgba(255,255,255,0.8)';
	//context.fillRect(0,0,canvas.width,canvas.height);

	drawCircle();
	drawCenter();
    drawEyes();
    drawEyesInner();
    drawMouse();
	drawHands();

	//context.restore();
	drawNumber();
	updateClockImage();
}

//画圆形
function drawCircle(){
	context.save();
	context.beginPath();
    context.shadowOffsetX = 10;
    context.shadowOffsetY = 10;
    context.shadowBlur = 50;
    context.shadowColor = 'black' ;
    //没有border-shadow是个缺陷
    var gradient = context.createRadialGradient(canvas.width/2,canvas.height/2,RADIUS,canvas.width/2,canvas.height/2,0);
    gradient.addColorStop(0,'#e064b7');
    gradient.addColorStop(0.25,'#00d8cc');
    gradient.addColorStop(0.5,'#ff76bc');
    gradient.addColorStop(0.75,'#78ba00');
    gradient.addColorStop(1,'#ff2e12');
    context.fillStyle = gradient;
	context.arc(canvas.width/2,canvas.height/2,RADIUS,0,DBPI,true);
	context.fill();
    context.restore();
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
//画眼睛
function drawEyes(){
    context.save();
    context.lineWidth = 2;
    context.fillStyle = '#f4b300';

    context.beginPath();
    context.arc(EYEX1,EYEY,EYER,0,DBPI,true);
    context.fill();

    context.beginPath();
    context.arc(EYEX2,EYEY,EYER,0,DBPI,true);
    context.fill();
    context.restore();


}
//画眼珠
function drawEyesInner(){
    var innerRadius = 20;
    var innerMarginX;
    var innerMarginY;
    if(flag == 0 ){
        innerMarginX = 0;
        innerMarginY = EYER -innerRadius;
        if(dir == 1){
            flag = 1;
        }else if(dir == -1){
            flag = -1;
        }
    }else if(flag == 1){
        innerMarginX = (EYER - 10)*Math.cos(DBPI/6);
        innerMarginY = (EYER -10)*Math.sin(DBPI/6);
        flag = 0;
        dir = -1;
    }else if(flag==-1){
        innerMarginX = -(EYER - 10)*Math.cos(DBPI/6);
        innerMarginY = (EYER -10)*Math.sin(DBPI/6);
        flag = 0;
        dir = 1;
    }
    context.save();
    context.fillStyle = '#4e0000';
    context.beginPath();
    context.arc(EYEX1+innerMarginX,EYEY+innerMarginY,innerRadius,0,DBPI,true);
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(EYEX2-innerMarginX,EYEY+innerMarginY,innerRadius,0,DBPI,true);
    context.fill();
    context.closePath();
    context.restore();
}
//画嘴
function drawMouse(){
    context.save();
    context.lineWidth = 3;
    context.strokeStyle = 'red';
    context.beginPath();
    context.arc(MOUSEX,MOUSEY,MOUSER,DBPI*4/12,DBPI*2/12,true);
    context.stroke();
    context.restore();
}

//把离屏canvas更新给img
function updateClockImage(){
	document.getElementById("snapshotImage").src=canvas.toDataURL();
}

context.font = FONT_HEIGHT+'px Arial';
loop  = setInterval(drawClock,1000);

