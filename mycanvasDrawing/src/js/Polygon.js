/**
 * Created by Administrator on 2014/8/9.
 */

var Point = function (x,y){
    console.log(context);
    this.x = x;
    this.y = y;
};

/**
 *
 * @param centerX
 * @param centerY
 * @param radius
 * @param sides
 * @param startAngle:启示角度偏移，按y顺时针偏移多少角度算
 * @param strokeStyle
 * @param fillStyle
 * @param filled
 * @constructor
 */
var Polygon = function (centerX ,centerY ,radius , sides, startAngle, strokeStyle, fillStyle, filled) {
    this.x = centerX;
    this.y = centerY;
    this.radius = radius;
    this.sides = sides;
    this.startAngle = startAngle;
    this.strokeStyle = strokeStyle;
    this.fillStyle = fillStyle;
    this.filled = filled;
};

Polygon.prototype = {
    getPoints : function (){
        var points = [];
        var angle = this.startAngle || 0;

        for(var i = 0 ,length = this.sides ;i<length ;i++){
            points.push({
               x:this.x + this.radius*Math.sin(angle),
               y:this.y - this.radius*Math.cos(angle)
            });

            angle += Math.PI*2/this.sides;//正多边形圆心角大小
        }

        return points;
    },
    createPath : function (context){
        var points = this.getPoints();
        context.beginPath();
        context.moveTo(points[0].x,points[0].y);
        for(var i = 1,length = this.sides ;i < length ;i++){
            context.lineTo(points[i].x,points[i].y);
        }
        context.closePath();
    },
    stroke : function (context){
        context.save();
        this.createPath(context);
        context.strokeStyle = this.strokeStyle;
        context.stroke();
        context.restore();
    },
    fill : function(){
        context.save();
        this.createPath();
        context.strokeStyle = this.strokeStyle;
        context.fill();
        context.restore();
    },
    move : function(x ,y){
        this.x = x;
        this.y = y;
    }
};