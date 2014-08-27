/**
 * Created by Administrator on 2014/8/27.
 */
//window坐标到canvas坐标的转换
function windowToCanvas (canvas,x,y){
    var bbox = canvas.getBoundingClientRect();
    return {
        x:x - bbox.left * (canvas.width / bbox.width),//即便canvas坐标进行的缩放也可以转换成功
        y:y - bbox.top * (canvas.height / bbox.height )
    };
}

function textControl (canvas,text,x,y,fontSize,angle) {
    this.funcImageMargin = 10;
    this.fontSize = fontSize;
    this.x = x || this.canvas.width/2;
    this.y = y || this.canvas.height/2;
    this.angle = angle || 0 ;
    this.text = text;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.points = [];
    this.textWidth = this.context.measureText(this.text).width;
    this.textHeight = 32;
    this.funcImages = [];

}
textControl.prototype = {
    drawAll : function () {
        this.context.save();
        this.context.translate(this.x,this.y);
        this.context.rotate(this.angle);
        this.drawText();
        this.drawHelpRect();
        this.drawFuncImg();
        this.context.restore();


    },
    drawText : function () {
        this.context.font = this.fontSize+"px red";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.textWidth =  this.context.measureText(this.text).width;
        this.context.fillText(this.text,0,0);
    },
    drawHelpRect : function () {
        var width = this.context.measureText(this.text).width;
        this.context.strokeRect(0 - width/2,0 - this.textHeight/2,width,this.textHeight);
    },
    setPoints : function () {
        this.points = [];
        var leftTop ={
            x:0 - this.textWidth/2 - this.funcImageMargin,
            y:0 - this.textHeight/2 - this.funcImageMargin
        };
        var leftBottom = {
            x:0 - this.textWidth/2 - this.funcImageMargin,
            y:0 + this.textHeight/2 + this.funcImageMargin
        };
        var rightTop ={
            x:0 + this.textWidth/2 + this.funcImageMargin,
            y:0 - this.textHeight/2 - this.funcImageMargin
        };
        var rightBottom = {
            x:0 + this.textWidth/2 + this.funcImageMargin,
            y:0 + this.textHeight/2 + this.funcImageMargin
        };
        this.points.push(leftTop,rightTop,rightBottom,leftBottom);
    },
    drawFuncImg : function () {
        this.setPoints();
        this.funcImages = [];
        var that = this;
        this.points.forEach(function(ele,i){
            var funcImg = new FuncImg(that.canvas,ele.x,ele.y,20,20,that.angle);
            that.funcImages.push(funcImg);
            funcImg.draw();
        });
    }
};
function FuncImg (canvas,x,y,width,height,angle) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.width = width;
    this.height = height;
}
FuncImg.prototype = {
    createPath : function () {
        this.context.translate(this.x,this.y);
        this.context.rotate(-this.angle);
        this.context.beginPath();
        this.context.rect(-this.width/2,-this.height/2,this.width,this.height);
    },
    draw : function () {
        this.context.save();
        this.createPath();
        this.context.stroke();
        this.context.restore();
    },
    isInPath : function (x,y) {
        var result;
        this.context.save();

        this.context.translate(this.x,this.y);
        this.context.rotate(-this.angle);
        /*
        var loc = {
            x:x - this.x,
            y:y - this.y
        };
        */

        this.context.beginPath();
        this.context.rect(-this.width/2,-this.height/2,this.width,this.height);
        this.context.closePath();
        result = this.context.isPointInPath(x,y);
        this.context.restore();
        return result;
    }
};