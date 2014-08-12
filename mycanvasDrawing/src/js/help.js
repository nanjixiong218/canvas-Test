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
