/**
 * Created by Administrator on 2014/8/14.
 */

var TimeLine = function (canvas,context,color ,x ,y ,width ,lineHeight ,image ,timePoints){
    this.canvas = canvas;
    this.context = context;
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
    init : function(){
        for(var i = 0,length = this.timePoints.length ;i < length; i++){
            this.pointsPosition.push({
                x:this.x+this.margin*i,
                y:this.y
            });
        }
        var gradient = this.context.createLinearGradient(0,0,this.width,0);
        gradient.addColorStop(0,'blue');
        gradient.addColorStop(0.25,'white');
        gradient.addColorStop(0.5,'purple');
        gradient.addColorStop(0.75,'red');
        gradient.addColorStop(1,'blue');
        this.context.strokeStyle = gradient;
        this.context.lineWidth = this.lineWidth;
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        this.context.shadowColor = 'rgba(0,0,0,0.7)';
        this.context.shadowOffsetX = 2;
        this.context.shadowOffsetY = 2;
        this.context.shadowBlur = 4 ;
    },
    createAll : function (){
        this.init();
        this.createMainLine();
        this.createPointsPosition();
    },
    createMainLine: function (){
        this.context.beginPath();
        this.context.moveTo(this.x,this.y);
        this.context.lineTo(this.x+this.width,this.y);
        this.context.lineTo(this.x+this.width-this.offJx,this.y+this.offJy);
        this.context.moveTo(this.x+this.width,this.y);
        this.context.lineTo(this.x+this.width-this.offJx,this.y-this.offJy);
    },
    createPointsPosition:function(){
        this.context.lineWidth = '2px';
        for(var i = 0,length = this.timePoints.length;i<length;i++){
            var tempPoint = {
                x:this.pointsPosition[i].x,
                y:this.pointsPosition[i].y
            };
            this.context.moveTo(tempPoint.x,tempPoint.y);
            this.context.lineTo(tempPoint.x,tempPoint.y-this.lineOffHeight);
        }
    },
    strokeAll:function(x,y){
        this.context.save();
        this.createAll();
        this.context.stroke();
        this.drawHead(x,y);
        this.drawPointsText();
        this.context.restore();
    },
    drawHead:function(x ,y){

        this.context.drawImage(this.image,x,y,30,35);
    },
    drawPointsText:function(){
        this.context.font='10px palatino';
        this.context.fillStyle='green';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'top';
        for(var i = 0,length = this.timePoints.length;i<length;i++){
            var tempPoint = {
                x:this.pointsPosition[i].x,
                y:this.pointsPosition[i].y
            };
            this.context.fillText(this.timePoints[i],tempPoint.x,tempPoint.y+10);
        }
    },
    animate:function(begin,end){
        var x = begin;
        var that = this;
        var loop = function(){
            x+=1;
            if(x<=end){
                that.context.clearRect(0,0,that.canvas.width,that.canvas.height);
                that.strokeAll(x,that.y-60);
                window.requestAnimationFrame(loop);
            }else{
                console.log("stop");
            }
        };
        window.requestAnimationFrame(loop);
    }

};