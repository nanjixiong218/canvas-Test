/**
 * Created by Administrator on 2014/8/11.
 */
/*以下为画图功能接口*/
//画直线
function drawLine(loc){
    if(dash.checked == true){
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
};
//画存储列表中的所有图形
function drawPolygons(){
    polygons.forEach(function(polygon){
        polygon.stroke(context);
    });
};

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
    if(rounded.checked == true){
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
    roundedRectPath(context,rubberbandRect.x,rubberbandRect.y,rubberbandRect.width,rubberbandRect.height,10)
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



