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
    loc = windowToCanvas(e.clientX, e.clientY);
    dragging = false;
    moduleMouseUp[drawingModule](loc);
};

clearBtn.onclick = function (e){
    context.clearRect(0,0,canvas.width,canvas.height);
    drawGrid('lightgray',10,10);
};
penBtn.onclick = function(e){
    drawingModule = 'penning';
}

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

