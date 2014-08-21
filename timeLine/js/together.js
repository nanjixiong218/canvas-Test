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
    animate : function (StretchBegin,StretchEnd,sDir,timeLineBegin,timeLineEnd,tDir,text,aDir){
        var isEnd = arguments[8]||false;
        var radius = sDir==1?StretchBegin:StretchEnd;
        var x = tDir==1?timeLineBegin:timeLineEnd;
        var alp = aDir==1?0:1;
        var sWidth = Math.abs(StretchEnd - StretchBegin);
        var tWidth = Math.abs(timeLineEnd - timeLineBegin);
        var that = this;
        var dirStr = ""+sDir+tDir+aDir;

        var loop = function (){

            radius = (sDir==1?radius + sWidth/60:radius-sWidth/60);
            if(radius>=StretchEnd||radius<=StretchBegin){
                radius = sDir==1?StretchEnd:StretchBegin;
            }
            x = (tDir==1?x+tWidth/60:x-tWidth/60);
            if(x>=timeLineEnd||x<=timeLineBegin){
                x = tDir==1?timeLineEnd:timeLineBegin;
            }
            alp = (aDir==1?alp+1/60:alp-1/60);
            if(alp>=1||alp<=0){
                alp = aDir==1?1:0;
            }
            that.stretch.fillCanvas('charcoal');


            var ifDo =  false;
            var path = [];
            path.push({
                dir:"111",
                bool:radius<StretchEnd||x<timeLineEnd||alp>0
            });
            path.push({
                dir:"110",
                bool:radius<StretchEnd||x<timeLineEnd||alp<1
            });
            path.push({
                dir:"101",
                bool:radius<StretchEnd||x>timeLineBegin||alp>0
            });
            path.push({
                dir:"100",
                bool:radius<StretchEnd||x>timeLineBegin||alp<1
            });
            path.push({
                dir:"011",
                bool:radius>StretchBegin||x<timeLineEnd||alp>0
            });
            path.push({
                dir:"010",
                bool:radius>StretchBegin||x<timeLineEnd||alp<1
            });
            path.push({
                dir:"001",
                bool:radius>StretchBegin||x>timeLineBegin||alp>0
            });
            path.push({
                dir:"000",
                bool:radius>StretchBegin||x>timeLineBegin||alp<1
            });

            path.forEach(function(obj){
                if(obj.dir ===dirStr){
                    ifDo = obj.bool;
                }
                //forEach中如何终止循环，return肯定不行TODO，用break或者continue可以么？
            });

            if(ifDo){
                that.context.save();
                that.stretch.drawAnimationFrame(radius,isEnd);
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
        this.context.font = '32px red';//必须设置字体,非法的也可以
        this.context.fillStyle = 'rgba(0,255,0,'+alp+')';
        this.context.textAlign = 'center';

        this.context.fillText(text,this.canvas.width/2,80);
        this.context.restore();
    }
};
