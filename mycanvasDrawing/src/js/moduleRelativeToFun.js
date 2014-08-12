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