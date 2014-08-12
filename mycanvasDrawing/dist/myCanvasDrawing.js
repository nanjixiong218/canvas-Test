/**
 * Created by Administrator on 2014/8/11.
 * 全局变量声明
 */
var canvas = document.getElementById('mydrawing');
var context = canvas.getContext('2d');
//获取控制控件的dom元素
var clearBtn = document.getElementById("clearAll");
//模式转换控件btn

var eraseBtn = document.getElementById("erase");
var polygonBtn = document.getElementById("polygon");
var penBtn = document.getElementById("pen");
var lineBtn = document.getElementById("line");
var rectBtn = document.getElementById("rect");
var editingBtn = document.getElementById("editing");
//样式相关设置dom
var strokeColorSelect = document.getElementById("stroke-color");
var fillColorSelect = document.getElementById("fill-color");
var guidewire = document.getElementById("guidewire");
var dash = document.getElementById("dash");
var rounded = document.getElementById("rounded");
var sides = document.getElementById("sides");




//模式标记状态字段初始化，一开始是画笔状态
var drawingModule = 'penning';

//上面的状态只能有一个为true，下面的dragging是在任何状态下都可以为true的
//状态
var dragging = false;



//辅助变量

var polygons = [];
var drawingSurfaceImageData,
    mousedown = {},
    rubberbandRect = {},//橡皮筋辅助边框数据
    draggingOffX,//多边形移动时，多边形中心点于mousedown的点的偏移
    draggingOffY;
drawGrid('lightgray',10,10);
/**
 * Created by Administrator on 2014/8/9.
 */


/**
 *
 * @param centerX
 * @param centerY
 * @param radius
 * @param sides
 * @param startAngle:启示角度偏移，按y顺时针偏移多少角度算
 * @param strokeStyle
 * @param fillStyle
 * @param filled
 * @constructor
 */
var Polygon = function (centerX ,centerY ,radius , sides, startAngle, strokeStyle, fillStyle, filled) {
    this.x = centerX;
    this.y = centerY;
    this.radius = radius;
    this.sides = sides;
    this.startAngle = startAngle;
    this.strokeStyle = strokeStyle;
    this.fillStyle = fillStyle;
    this.filled = filled;
};

Polygon.prototype = {
    getPoints : function (){
        var points = [];
        var angle = this.startAngle || 0;

        for(var i = 0 ,length = this.sides ;i<length ;i++){
            points.push({
               x:this.x + this.radius*Math.sin(angle),
               y:this.y - this.radius*Math.cos(angle)
            });

            angle += Math.PI*2/this.sides;//正多边形圆心角大小
        }

        return points;
    },
    createPath : function (context){
        var points = this.getPoints();
        context.beginPath();
        context.moveTo(points[0].x,points[0].y);
        for(var i = 1,length = this.sides ;i < length ;i++){
            context.lineTo(points[i].x,points[i].y);
        }
        context.closePath();
    },
    stroke : function (context){
        context.save();
        this.createPath(context);
        context.strokeStyle = this.strokeStyle;
        context.stroke();
        context.restore();
    },
    fill : function(){
        context.save();
        this.createPath();
        context.strokeStyle = this.strokeStyle;
        context.fill();
        context.restore();
    },
    move : function(x ,y){
        this.x = x;
        this.y = y;
    }
};
/**
 * Created by Administrator on 2014/8/11.
 */
/**
 * 绘制背景表格线
 * @param color
 * @param stepx：水平表格间距
 * @param stepy：垂直表格间距
 */
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

//绘制水平线
function drawHorizontalLine (y){
    context.beginPath();
    context.moveTo(0,y+0.5);
    context.lineTo(canvas.width,y+0.5);
    context.stroke();
}
//绘制垂线
function drawVericalLine(x){
    context.beginPath();
    context.moveTo(x+0.5,0);
    context.lineTo(x+0.5,canvas.height);
    context.stroke();
}
//绘制导引线
function drawGuidewires (x,y){
    context.save();
    context.strokeStyle = 'rgba(255,0,0,1)';
    context.lineWidth = 2;
    drawHorizontalLine(y);
    drawVericalLine(x);
    context.restore();
}

/**
 * Created by Administrator on 2014/8/11.
 */
/*事件绑定*/
canvas.onmousedown = function (e){
    var loc = windowToCanvas(e.clientX, e.clientY);
    e.preventDefault();
    moduleMouseDown[drawingModule](loc);

};

canvas.onmousemove = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);
    e.preventDefault();
    moduleMouseMove[drawingModule](loc);
};
canvas.onmouseup = function (e){
    var loc = windowToCanvas(e.clientX, e.clientY);
    dragging = false;
    moduleMouseUp[drawingModule](loc);
};

clearBtn.onclick = function (e){
    context.clearRect(0,0,canvas.width,canvas.height);
    drawGrid('lightgray',10,10);
};
penBtn.onclick = function(e){
    drawingModule = 'penning';
};

editingBtn.onclick = function (e){
    startEditing();
};
lineBtn.onclick = function (e){
    drawingModule = 'lining';
};
rectBtn.onclick = function (e){
    drawingModule = 'rectting';
};
eraseBtn.onclick = function (e){
    drawingModule = 'erasing';
    saveDrawingSurface();
};
polygonBtn.onclick = function (e){
    drawingModule = 'polygonning';
};


/**
 * Created by Administrator on 2014/8/11.
 */
/*辅助函数*/
//window坐标到canvas坐标的转换
function windowToCanvas (x,y){
    var bbox = canvas.getBoundingClientRect();
    return {
        x:x - bbox.left * (canvas.width / bbox.width),//即便canvas坐标进行的缩放也可以转换成功
        y:y - bbox.top * (canvas.height / bbox.height )
    };
}
//绘图表面的保存和恢复
function saveDrawingSurface (){
    drawingSurfaceImageData = context.getImageData(0,0,canvas.width,canvas.height);
}
function restoreDrawingSurface () {
    context.putImageData(drawingSurfaceImageData,0,0);
}
//draggingstart
function startDragging(loc){
    saveDrawingSurface();
    mousedown.x = loc.x;
    mousedown.y = loc.y;
}
//开始拖拽，设置拖拽样式
function startEditing (){
    canvas.style.cursor = 'pointer';
    drawingModule = 'editing';
}
//结束拖拽，设置样式
function stopEditing (){
    canvas.style.cursor = 'crosshair';
    drawingModule = 'penning';
}

/**
 * Created by Administrator on 2014/8/11.
 */
/*以下为画图功能接口*/
//画直线
function drawLine(loc){
    if(dash.checked === true){
        drawDashLine(context,mousedown.x,mousedown.y,loc.x,loc.y);
    }else {
        context.beginPath();
        context.moveTo(mousedown.x, mousedown.y);
        context.lineTo(loc.x, loc.y);
        context.stroke();
    }
}
//画多边形
function drawPolygon(loc){
    var radius = Math.sqrt(Math.pow((loc.x - mousedown.x),2)+Math.pow((loc.y-mousedown.y),2));
    var sidesNum = sides.value | 0;

    var polygon = new Polygon(loc.x,loc.y,radius,sidesNum,0,"red","blue",true);
    polygon.stroke(context);
    if(!dragging){
        polygons.push(polygon);
    }
}
//画存储列表中的所有图形
function drawPolygons(){
    polygons.forEach(function(polygon){
        polygon.stroke(context);
    });
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
    var dashLineLength = Math.sqrt(Math.pow(xLength,2)+Math.pow(yLength,2));
    var dashNum = Math.floor(dashLineLength/dashLenth);
    context.beginPath();
    for(var i = 0 ,length = dashNum ;i<length ;i++){
        context[ i%2 === 0 ? 'moveTo':'lineTo'](x1+(deltaX/dashNum)*i,y1+(deltaY/dashNum)*i);
    }
    context.stroke();
}
//画方向为逆时针的矩形：strokeRect和rect的路径方向都为顺时针，不像arc有个参数可以控制
// 当做内部方法用，用于画出剪切板效果
function drawRectPath(context,x,y,width,height,isRight){
    context.beginPath();
    if(isRight){
        context.moveTo(x,y);
        context.lineTo(x+width,y);
        context.lineTo(x+width,y+height);
        context.lineTo(x,y+height);
    }else{
        context.rect(x,y,width,height);
    }
    context.closePath();
}
//根据辅助矩形数据画矩形
function drawRect(){
    if(rounded.checked === true){
        drawRoundedRect();
    }else {
        drawRectPath(context, rubberbandRect.x, rubberbandRect.y, rubberbandRect.width, rubberbandRect.height, true);
    }
    context.stroke();
}

//创建圆角矩形路径
function roundedRectPath(context, x, y, width, height, cornerRadius){
    context.beginPath();
    context.moveTo(x+cornerRadius,y);
    context.arcTo(x+width, y, x+width, y+height, cornerRadius);
    context.arcTo(x+width, y+height, x, y+height, cornerRadius);
    context.arcTo(x, y+height, x, y,cornerRadius);
    context.arcTo(x, y, x+width ,y ,cornerRadius);
    context.closePath();
}
//画圆角矩形:书上有一个方法，
// 太难看了写的，也就是可以从任意位置，向任意方向开始罢了，api不好用，又不好理解，不知道为什么它要那么写
function drawRoundedRect(){
    roundedRectPath(context,rubberbandRect.x,rubberbandRect.y,rubberbandRect.width,rubberbandRect.height,10);
    context.stroke();
}
//画橡皮擦形状
function drawEraseShape(loc){
    context.beginPath();
    context.width = 1;
    context.arc(loc.x,loc.y,10,0,Math.PI*2,true);
    context.stroke();
}
//执行擦出过程
function drawErasing(loc){
    context.save();
    context.beginPath();
    context.width = 1;
    context.arc(loc.x,loc.y,10,0,Math.PI*2,true);
    context.clip();
    context.clearRect(0,0,canvas.width,canvas.height);
    drawGrid('lightgray',10,10);
    context.restore();
}




/**
 * Created by Administrator on 2014/8/11.
 */
/*状态模式关联对象*/

var drawFun = {
    "lining" : drawLine,
    "rectting" : drawRect,
    "polygonning" : drawPolygon

};
var moduleMouseDown = {
    "penning" : function (){
        dragging = true;
    },
    "lining" : function (loc){
        startDragging(loc);
        dragging = true;
    },
    "rectting" : function (loc){
        startDragging(loc);
        dragging = true;
    },
    "polygonning" : function (loc){
        startDragging(loc);
        dragging = true;
    },
    "editing" : function (loc){
        polygons.forEach(function(polygon){
            polygon.createPath(context);
            if(context.isPointInPath(loc.x,loc.y)){
                startDragging(loc);
                dragging = polygon;
                //偏移计算，mousemove的时候计算不断移动poly的位置时需要保持着偏移进行移动
                draggingOffX = loc.x - polygon.x;
                draggingOffY = loc.y - polygon.y;
                return;
            }
        });
    },
    "erasing" : function (){
        restoreDrawingSurface();
        dragging = true;
    }
};
var moduleMouseMove = {
    "penning" : function (loc){
        if(dragging){//画笔该怎么实现呢？通过画圆的方式，但是断断续续的。TODO
            context.beginPath();
            context.arc(loc.x,loc.y,1,0,Math.PI*2,true);
            context.stroke();
        }
    },
    "lining" : function (loc){
        if(dragging){
            restoreDrawingSurface();
            updateRubberBand(loc);
            if(guidewire.checked) {
                drawGuidewires(loc.x, loc.y);
            }
        }
    },
    "rectting" : function (loc){
        if(dragging){
            restoreDrawingSurface();
            updateRubberBand(loc);
            if(guidewire.checked) {
                drawGuidewires(loc.x, loc.y);
            }
        }
    },
    "polygonning" : function (loc){
        if(dragging){
            restoreDrawingSurface();
            updateRubberBand(loc);
            if(guidewire.checked) {
                drawGuidewires(loc.x, loc.y);
            }
        }
    },
    "editing" : function (loc){
        if(dragging) {
            /*不能这样实现的原因就是，无法把被拖动的图像去掉
             restoreDrawingSurface();
             dragging.x = loc.x - draggingOffX;
             dragging.y = loc.y - draggingOffY;
             dragging.stroke(context);
             */
            //TODO这种实现的前提是所有图形都保存在列表中了，可是直线和随便画的点，线并没有保存在图形中，就会消失
            dragging.x = loc.x - draggingOffX;
            dragging.y = loc.y - draggingOffY;
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid('lightgray', 10, 10);
            drawPolygons();
        }
    },
    "erasing" : function (loc){
        if(dragging){
            //橡皮擦的实现流程有些麻烦啊！有更好办法么？TODO
            restoreDrawingSurface();
            drawErasing(loc);
            saveDrawingSurface();
            drawEraseShape(loc);
        }else{
            restoreDrawingSurface();
            drawErasing(loc);
            drawEraseShape(loc);
        }
    }
};
var moduleMouseUp = {
    "penning" : function (){
        dragging = false;
    },
    "lining" : function (loc){
        restoreDrawingSurface();
        updateRubberBand(loc);
    },
    "rectting" : function (loc){
        restoreDrawingSurface();
        updateRubberBand(loc);
    },
    "polygonning" : function (loc){
        restoreDrawingSurface();
        updateRubberBand(loc);
    },
    "editing" : function (){

    },
    "erasing" : function (){
        restoreDrawingSurface();
    }
};
/**
 * Created by Administrator on 2014/8/11.
 */
/*橡皮筋绘制相关*/
//画橡皮筋形状
function drawRubberBandShape(loc){
    context.save();

    context.strokeStyle = strokeColorSelect.value;
    drawFun[drawingModule](loc);
    context.restore();
}
//更新橡皮筋内容
function updateRubberBand(loc){
    updateRubberBandRect(loc);
    drawRubberBandShape(loc);
}
//橡皮筋辅助边框数据保存更新
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
