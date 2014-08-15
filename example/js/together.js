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
    animate : function (StretchBegin,StretchEnd,timeLineBegin,timeLineEnd){
        var radius = StretchBegin;
        var x = timeLineBegin;
        var sWidth = StretchEnd - StretchBegin;
        var tWidth = timeLineEnd - timeLineBegin;
        var that = this;

        var loop = function (){
            x=x+sWidth/60;
            radius = radius + tWidth/60;

            that.stretch.fillCanvas('charcoal');
            if(radius<=StretchEnd||x<=timeLineEnd){
                that.context.save();
                that.stretch.drawAnimationFrame(radius);
                that.context.restore();
                that.timeLine.strokeAll(x,that.timeLine.y-60);
                window.webkitRequestAnimationFrame(loop);
            }else{
                console.log('stop');
                that.endAnimate(radius,x);
            }
        };
        window.webkitRequestAnimationFrame(loop);

    },
    endAnimate:function(radius,x){
        this.context.save();
        this.stretch.drawAnimationFrame(radius);
        this.context.restore();
        this.timeLine.strokeAll(x,this.timeLine.y-60);
    }
};
