/**
 * Created by Administrator on 2014/8/14.
 */

var TimeLine = function (color ,x ,y ,width ,lineHeight ,image ,timePoints){
    this.x = x;
    this.y = y;
    this.style = color;
    this.lineWidth = lineHeight;
    this.width = width;
    this.timePoints = timePoints;
    this.pointsPosition = [];
    this.margin = this.width / timePoints.length;
    this.image = image;
    //箭头偏移
    this.offJx = 10;
    this.offJy = 10;
    //设置刻度线高度
    this.lineOffHeight = 20;
};
TimeLine.prototype = {
    init : function(canvas,context){
        for(var i = 0,length = this.timePoints.length ;i < length; i++){
            this.pointsPosition.push({
                x:this.x+this.margin*i,
                y:this.y
            });
        }
        var gradient = context.createLinearGradient(0,0,this.width,0);
        gradient.addColorStop(0,'blue');
        gradient.addColorStop(0.25,'white');
        gradient.addColorStop(0.5,'purple');
        gradient.addColorStop(0.75,'red');
        gradient.addColorStop(1,'blue');
        context.strokeStyle = gradient;
        context.lineWidth = this.lineWidth;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.shadowColor = 'rgba(0,0,0,0.7)';
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowBlur = 4 ;
    },
    createAll : function (canvas,context){
        this.init(canvas,context);
        this.createMainLine(canvas,context);
        this.createPointsPosition(canvas,context);
    },
    createMainLine: function (canvas,context){
        context.beginPath();
        context.moveTo(this.x,this.y);
        context.lineTo(this.x+this.width,this.y);
        context.lineTo(this.x+this.width-this.offJx,this.y+this.offJy);
        context.moveTo(this.x+this.width,this.y);
        context.lineTo(this.x+this.width-this.offJx,this.y-this.offJy);
    },
    createPointsPosition:function(canvas,context){
        context.lineWidth = '2px';
        for(var i = 0,length = this.timePoints.length;i<length;i++){
            var tempPoint = {
                x:this.pointsPosition[i].x,
                y:this.pointsPosition[i].y
            };
            context.moveTo(tempPoint.x,tempPoint.y);
            context.lineTo(tempPoint.x,tempPoint.y-this.lineOffHeight);
        }
    },
    strokeAll:function(canvas,context){
        context.save();
        this.createAll(canvas,context);
        context.stroke();
        this.drawHead(canvas,context);
        this.drawPointsText(canvas,context);
        context.restore();
    },
    drawHead:function(canvas,context){
        context.drawImage(this.image,this.x-15,this.y-60,30,35);
    },
    drawPointsText:function(canvas,context){
        context.font='10px black';
        context.textAlign = 'center';
        context.textBaseline = 'top';
        for(var i = 0,length = this.timePoints.length;i<length;i++){
            var tempPoint = {
                x:this.pointsPosition[i].x,
                y:this.pointsPosition[i].y
            };
            context.fillText(this.timePoints[i],tempPoint.x,tempPoint.y+10);
        }
    },
    animate:function(){

    }

};