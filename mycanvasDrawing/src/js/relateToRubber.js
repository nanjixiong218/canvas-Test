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
