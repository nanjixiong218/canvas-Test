/**
 * Created by Administrator on 2014/8/15.
 */

var Together = function(stretch ,timeLine){
    this.stretch = stretch;
    this.timeLine = timeLine;
    this.canvas = this.stretch.canvas;
    this.context = this.stretch.context;

};
Together.prototype = {
    animate : function (StretchBegin,StretchEnd,timeLineBegin,timeLineEnd,text){
        var radius = StretchBegin;
        var x = timeLineBegin;
        var alp = 0;
        var sWidth = StretchEnd - StretchBegin;
        var tWidth = timeLineEnd - timeLineBegin;
        var that = this;

        var loop = function (){
            x=x+tWidth/60;
            radius = radius + sWidth/60;
            alp = alp+1/60;

            that.stretch.fillCanvas('charcoal');
            if(radius<=StretchEnd||x<=timeLineEnd){
                that.context.save();
                that.stretch.drawAnimationFrame(radius);
                that.context.restore();
                that.timeLine.strokeAll(x,that.timeLine.y-60);
                that.drawText(text,alp);
                window.webkitRequestAnimationFrame(loop);
            }else{
                console.log('stop');
                that.endAnimate(radius,x,text,alp);
            }
        };
        window.webkitRequestAnimationFrame(loop);

    },
    endAnimate:function(radius,x,text,alp){
        this.context.save();
        this.stretch.drawAnimationFrame(radius);
        this.context.restore();
        this.timeLine.strokeAll(x,this.timeLine.y-60);
        this.drawText(text,alp);
    },
    drawText :function(text,alp){
        this.context.save();
        this.context.font = '128px red';//必须设置字体,非法的也可以
        this.context.fillStyle = 'rgba(0,200,0,'+alp+')';
        this.context.fillText(text,200,200);
        this.context.restore();
    }
};
