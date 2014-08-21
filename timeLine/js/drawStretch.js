/**
 * Created by Administrator on 2014/8/14.
 */
var Stretch = function(canvas,context,endImage){
    this.canvas = canvas;
    this.context =context;
    this.mid = {
        x:this.canvas.width/2,
        y:this.canvas.height/2
    };
    this.endImage = endImage;
};

Stretch.prototype = {
    drawText:drawText,
    drawRadiusTexts:drawRadiusTexts,
    clipArc:clipArc,
    drawBackGround:drawBackGround,
    fillCanvas:fillCanvas,
    drawAnimationFrame:drawAnimationFrame,
    endAnimate:endAnimate,
    animate:animate
};


function drawText(){
    this.context.font = "16px red";
    this.context.fillStyle = 'black';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText("基础",this.mid.x,this.mid.y);
    var texts20 = [];
    var texts50 = [];
    var texts80 = [];
    var texts110 = [];
    var texts140 = [];
    texts20.push({
        text:'js',
        angle:Math.PI/4
    });
    texts20.push({
        text:'css',
        angle:Math.PI*3/4
    });
    texts20.push({
        text:'html',
        angle:Math.PI*3/2
    });
    texts50.push({
        text:'jquery',
        angle:0
    });
    texts50.push({
        text:'seajs',
        angle:Math.PI/2
    });
    texts50.push({
        text:'sass',
        angle:Math.PI
    });
    texts50.push({
        text:'ejs',
        angle:Math.PI*3/2
    });
    texts80.push({
        text:'angular',
        angle:Math.PI/3
    });
    texts80.push({
        text:'vue',
        angle:(Math.PI/3)*2
    });
    texts80.push({
        text:'backbone',
        angle:(Math.PI/3)*3
    });
    texts80.push({
        text:'grunt',
        angle:(Math.PI/3)*4
    });
    texts80.push({
        text:'Mock',
        angle:(Math.PI/3)*5
    });
    texts80.push({
        text:'RAP',
        angle:(Math.PI/3)*6
    });
    texts110.push({
        text:'nodejs',
        angle:Math.PI*2/9
    });
    texts110.push({
        text:'express',
        angle:(Math.PI*2/9)*2
    });
    texts110.push({
        text:'mongodb',
        angle:(Math.PI*2/9)*3
    });
    texts110.push({
        text:'ecmacscript',
        angle:(Math.PI*2/9)*4
    });
    texts110.push({
        text:'w3c',
        angle:(Math.PI*2/9)*5
    });
    texts110.push({
        text:'html5',
        angle:(Math.PI*2/9)*6
    });
    texts110.push({
        text:'css3',
        angle:(Math.PI*2/9)*7
    });
    texts110.push({
        text:'canvas',
        angle:(Math.PI*2/9)*8
    });
    texts110.push({
        text:'jsDoc',
        angle:(Math.PI*2/9)*9
    });
    texts140.push({
        text:'webComponent',
        angle:Math.PI*2/9
    });
    texts140.push({
        text:'phoneGap',
        angle:(Math.PI*2/9)*2
    });
    texts140.push({
        text:'nativeJs',
        angle:(Math.PI*2/9)*3
    });
    texts140.push({
        text:'CommonJs',
        angle:(Math.PI*2/9)*4
    });
    texts140.push({
        text:'HTTP1.1',
        angle:(Math.PI*2/9)*5
    });
    texts140.push({
        text:'前端测试',
        angle:(Math.PI*2/9)*6
    });
    texts140.push({
        text:'Xss',
        angle:(Math.PI*2/9)*8
    });
    texts140.push({
        text:'CSRF',
        angle:(Math.PI*2/9)*9
    });
    this.drawRadiusTexts(texts20,20);
    this.drawRadiusTexts(texts50,50);
    this.drawRadiusTexts(texts80,80);
    this.drawRadiusTexts(texts110,110);
    this.drawRadiusTexts(texts140,140);
}
function drawRadiusTexts(texts,r){
    for(var i= 0,length = texts.length;i<length;i++){
        var text = texts[i].text;
        var angle = texts[i].angle;
        this.context.save();
        this.context.translate(this.mid.x + r*Math.cos(angle),this.mid.y - r*Math.sin(angle));
        this.context.rotate(Math.PI/2-angle);
        this.context.textAlign = 'center';
        this.context.textBaseline = 'bottom';
        this.context.fillText(text,0,0);
        this.context.restore();
    }


}
function clipArc(radius){
    this.context.beginPath();
    this.context.arc(this.mid.x,this.mid.y,radius,0,Math.PI*2,true);
    this.context.stroke();
    this.context.clip();
}

function drawBackGround(isEnd){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    if(isEnd){
        this.context.drawImage(this.endImage,100,10,this.canvas.width-200,this.canvas.height-100);
    }else{
        this.drawText();
    }
}
function fillCanvas(color){
    this.context.fillStyle = color;
    this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
}
function drawAnimationFrame(radius,isEnd){
    this.clipArc(radius);
    this.fillCanvas('lightgray');
    this.drawBackGround(isEnd);
}
function endAnimate(radius){
    this.context.save();
    this.drawAnimationFrame(radius);//搞不懂啊，如果这里不再画一遍，就会突然消失
    this.context.restore();
}
function animate(begin ,end){
    var isEnd = arguments[2]||false;
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
            that.drawAnimationFrame(radius,isEnd);
            that.context.restore();
            window.webkitRequestAnimationFrame(loop);
        }else{
            that.endAnimate(radius);
        }
    };
    window.webkitRequestAnimationFrame(loop);
}