/**
 * Created by Administrator on 2014/8/8.
 */

var canvas = document.getElementById('mydrawing');
var context = canvas.getContext('2d');
//dom
var clearBtn = document.getElementById("clearAll");
var strokeColorSelect = document.getElementById("stroke-color");
var guidewire = document.getElementById("guidewire");

drawGrid('lightgray',10,10);

//other
var drawingSurfaceImageData,
    mousedown = {},
    rubberbandRect = {},
    dragging = false;



function init () {

}
//绘制背景表格
function drawGrid (color,stepx,stepy) {
    context.beginPath();//如果没有这句，clear的时候会把最后一条线画出来
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
//画直线
function drawingLine(){
    context.beginPath();
    context.moveTo(mousedown.x,mousedown.y);
    context.lineTo(loc.x,loc.y);
    context.stroke();
}
//画多边形
function drawPolygon(loc){
    var radius = Math.sqrt(Math.pow((loc.x - mousedown.x),2)+Math.pow((loc.y-mousedown.y),2));
    var polygon = new Polygon(loc.x,loc.y,radius,4,0,"red","blue",true);
    polygon.stroke(context);
}
/**
 *画虚线
 *
 */

function drawDashLine(context,x1,y1,x2,y2,dashLenth){
    dashLenth = dashLenth ? dashLenth : 5;
    var xLength = Math.abs(x2 - x1);
    var yLength = Math.abs(y2 - y1);
    var deltaX = x2 - x1;
    var deltaY = y2 - y1;
    var dashLineLength = Math.sqrt(Math.pow(xLength,2)+Math.pow(xLength,2));
    var dashNum = Math.floor(dashLineLength/dashLenth);
    context.beginPath();
    for(var i = 0 ,length = dashNum ;i<length ;i++){
        context[ i%2 == 0 ? 'moveTo':'lineTo'](x1+(deltaX/dashNum)*i,y1+(deltaY/dashNum)*i);
    }
    context.stroke();
}

//画橡皮筋内容
function drawRubberBandShape(loc){
    context.save();

    context.strokeStyle = strokeColorSelect.value;
    //drawPolygon(loc);
    drawDashLine(context,mousedown.x,mousedown.y,loc.x,loc.y,5);
    context.restore();
}
//更新橡皮筋
function updateRubberBand(loc){
    updateRubberBandRect(loc);
    drawRubberBandShape(loc);
}
//events
canvas.onmousedown = function (e){
    var loc = windowToCanvas(e.clientX, e.clientY);
    e.preventDefault();
    saveDrawingSurface();
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    dragging = true;
};

canvas.onmousemove = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);
    if(dragging){
        e.preventDefault();
        restoreDrawingSurface();
        if(guidewire.checked){
            drawGuidewires(loc.x,loc.y);
        }
        updateRubberBand(loc);
    }
};
canvas.onmouseup = function (e){
    loc = windowToCanvas(e.clientX, e.clientY);
    restoreDrawingSurface();
    updateRubberBand(loc);
    dragging = false;
};

clearBtn.onclick = function (e){
    context.clearRect(0,0,canvas.width,canvas.height);
    drawGrid('lightgray',10,10);
};
