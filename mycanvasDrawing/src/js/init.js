/**
 * Created by Administrator on 2014/8/11.
 * 全局变量声明
 */
var canvas = document.getElementById('mydrawing');
canvas.width = window.innerWidth - 250;
canvas.height = window.innerHeight - 50;
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