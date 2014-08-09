/**
 * Created by Administrator on 2014/8/8.
 */

var canvas = document.getElementById('mydrawing');
var context = canvas.getContext('2d');
//dom
var clearBtn = document.getElementById("clearAll");
var strokeSelect = document.getElementById("stroke-color");
var guidewire = document.getElementById("guidewire");

drawGrid('lightgray',10,10);

//other
var drawingSurfaceImageData,
    mousedown = {},
    rubberbandRect = {},
    dragging = false,
    guidewires = guidewire.checked;

function init () {

}
//绘制背景表格
function drawGrid (color,stepx,stepy) {
    context.save();
    context.strokeStyle = color;
    for(var i = stepx+0.5;i<canvas.width;i+=stepx){
        context.moveTo(i,0);
        context.lineTo(i,canvas.height);
        context.stroke();
    }
    for(i = stepy+0.5;i<canvas.height;i+=stepy){
        context.moveTo(0,i);
        context.lineTo(canvas.width,i);
        context.stroke();
    }

    context.restore();
}
//window坐标到canvas坐标的转换
function windowToCanvas (x,y){
    var bbox = canvas.getBoundingClientRect();
    return {
        x:x - bbox.left * (canvas.width / bbox.width),
        y:y - bbox.top * (canvas.height / bbox.height )
    }
}
//
function drawHorizontalLine (y){
    context.beginPath();
    context.moveTo(0,y+0.5);
    context.lineTo(canvas.width,y+0.5);
    context.stroke();
}
function drawVericalLine(x){
    context.beginPath();
    context.moveTo(x+0.5,0);
    context.lineTo(x+0.5,canvas.height);
    context.stroke();
}
function drawGuidewires (x,y){
    context.save();
    context.strokeStyle = 'rgba(255,0,0,1)';
    context.lineWidth = 2;
    drawHorizontalLine(y);
    drawVericalLine(x);
    context.restore();
}

//绘图表面的保存和恢复
function saveDrawingSurface (){
    drawingSurfaceImageData = context.getImageData(0,0,canvas.width,canvas.height);
}
function restoreDrawingSurface () {
    context.putImageData(drawingSurfaceImageData,0,0)
}

//events
canvas.onmousedown = function (e){
    var loc = windowToCanvas(e.clientX, e.clientY);
    e.preventDefault();
    saveDrawingSurface();
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    dragging = true;
}
//画橡皮筋辅助边框
function updateRubberBandRect(loc){
    var width = Math.abs(loc.x - mousedown.x);
    var height = Math.abs(loc.y - mousedown.y);
    var point = {
        x: (loc.x - mousedown.x)>0?mousedown.x:loc.x,
        y: (loc.y - mousedown.y)>0?mousedown.y:loc.y
    };
    rubberbandRect.width = width;
    rubberbandRect.height = height;
    rubberbandRect.x = point.x;
    rubberbandRect.y = point.y;
}
//画橡皮筋内容
function drawRubberBandShape(loc){
    context.beginPath();
    context.moveTo(mousedown.x,mousedown.y);
    context.lineTo(loc.x,loc.y);
    context.stroke();
}
//更新橡皮筋
function updateRubberBand(loc){
    updateRubberBandRect(loc);
    drawRubberBandShape(loc);
}

canvas.onmousemove = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);


    if(dragging){
        e.preventDefault();
        restoreDrawingSurface();
        drawGuidewires(loc.x,loc.y);
        updateRubberBand(loc);
    }
}
canvas.onmouseup = function (e){
    loc = windowToCanvas(e.clientX, e.clientY);
    restoreDrawingSurface();
    updateRubberBand(loc);
    dragging = false;
}
