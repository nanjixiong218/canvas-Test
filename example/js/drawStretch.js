/**
 * Created by Administrator on 2014/8/14.
 */
var Stretch = function(canvas,context){
    this.canvas = canvas;
    this.context =context;
    this.mid = {
        x:this.canvas.width/2,
        y:this.canvas.height/2
    }
};

Stretch.prototype = {
    drawText:drawText,
    clipArc:clipArc,
    drawBackGround:drawBackGround,
    fillCanvas:fillCanvas,
    drawAnimationFrame:drawAnimationFrame,
    endAnimate:endAnimate,
    animate:animate
};


function drawText(text){
    this.context.font = "32px red"
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText(text,this.canvas.width/2,this.canvas.height/2);
}
function clipArc(radius){
    this.context.beginPath();
    this.context.arc(this.mid.x,this.mid.y,radius,0,Math.PI*2,true);
    this.context.stroke();
    this.context.clip();
}

function drawBackGround(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.drawText("HTML5");
}
function fillCanvas(color){
    this.context.fillStyle = color;
    this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
}
function drawAnimationFrame(radius){
    this.clipArc(radius);
    this.fillCanvas('lightgray');
    this.drawBackGround();
}
function endAnimate(radius){
    this.context.save();
    this.drawAnimationFrame(radius);//搞不懂啊，如果这里不再画一遍，就会突然消失
    this.context.restore();
}
function animate(begin ,end){
    var radius = begin;
    var that = this;
    var loop = function(time){
        if(time===undefined){
            time = +new Date();
        }
        radius  = radius + (end-begin)/60;
        that.fillCanvas('charcoal');
        if(radius<=end){
            that.context.save();
            that.drawAnimationFrame(radius);
            that.context.restore();
            window.webkitRequestAnimationFrame(loop);
        }else{
            that.endAnimate(radius);
        }
    };
    window.webkitRequestAnimationFrame(loop);
}