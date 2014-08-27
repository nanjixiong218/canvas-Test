/**
 * Created by Administrator on 2014/8/27.
 */

function textControl (canvas,text) {
    this.funcImageMargin = 10;
    this.text = text;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.points = [];
    this.textWidth = this.context.measureText(this.text).width;
    this.textHeight = 32;

}
textControl.prototype = {
    drawAll : function () {
        this.drawText();
        this.drawHelpRect();
        this.drawFuncImg();
    },
    drawText : function () {
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillText(this.text,this.canvas.width/2,this.canvas.height/2);
    },
    drawHelpRect : function () {
        var width = this.context.measureText(this.text).width;
        this.context.strokeRect(this.canvas.width/2-width/2,this.canvas.height/2-16,width,32);
    },
    setPoints : function () {
        var leftTop ={
            x:this.canvas.width/2 - this.textWidth/2 - this.funcImageMargin,
            y:this.canvas.height/2 - 16 - this.funcImageMargin
        };
        var leftBottom = {
            x:this.canvas.width/2 - this.textWidth/2 - this.funcImageMargin,
            y:this.canvas.height/2 + 16 + this.funcImageMargin
        };
        var rightTop ={
            x:this.canvas.width/2 + this.textWidth/2 + this.funcImageMargin,
            y:this.canvas.height/2 - 16 - this.funcImageMargin
        };
        var rightBottom = {
            x:this.canvas.width/2 + this.textWidth/2 + this.funcImageMargin,
            y:this.canvas.height/2 + 16 + this.funcImageMargin
        };
        this.points.push(leftTop,rightTop,rightBottom,leftBottom);
    },
    drawFuncImg : function () {
        this.setPoints();
        var that = this;
        this.points.forEach(function(ele,i){
            that.context.fillText(i,ele.x,ele.y);
        });
    }
};