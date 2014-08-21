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
    drawRadiusText:drawRadiusText,
    clipArc:clipArc,
    drawBackGround:drawBackGround,
    fillCanvas:fillCanvas,
    drawAnimationFrame:drawAnimationFrame,
    endAnimate:endAnimate,
    animate:animate
};


function drawText(){
    this.context.font = "8px red";
    this.context.fillStyle = 'black';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';

    this.context.fillText("html",this.mid.x,this.mid.y);
    this.drawRadiusText("javascript",20,Math.PI/4);
}
function drawRadiusText(text,r,angle){
    this.context.save();
    this.context.translate(this.mid.x + r*Math.cos(angle),this.mid.y - r*Math.sin(angle));
    this.context.rotate(Math.PI/2-angle);
    this.context.textAlign = 'center';
    this.context.textBaseline = 'bottom';
    this.context.fillText(text,0,0);
    this.context.restore();

}
function clipArc(radius){
    this.context.beginPath();
    this.context.arc(this.mid.x,this.mid.y,radius,0,Math.PI*2,true);
    this.context.stroke();
    this.context.clip();
}

function drawBackGround(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.drawText();
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