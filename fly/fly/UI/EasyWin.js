/**
 * Created by dabing.zdb on 2014/9/11.
 */
// namespace:
this.fly = this.fly||{};

(function() {

    /*
     width 按钮宽度
     target  事件添加对象
     callback 回调函数 0 关闭窗口 ·1 第一个按钮  2 第二个按钮
     */
        function EasyWin(context,target,callback) {
        //"use strict";
        this.ctx = context;
        this.target = target;
        this.callBack = callback;
        this.isDrag = false;

        this.lineWidth = 1;
        this.radius = 10;
        this.TitleText = new fly.TextField(context,this._text);
        this.contextText = new fly.TextField(context,this._text);
        this.btn = new fly.EasyButton(context,target);
        this.initialize(context);
        this.setEnabled(true);
    }

    EasyWin.prototype = new fly.View();

    EasyWin.prototype.initialize = function (context){
        this.ctx = context;
        this.setContent(400,200);
    };

    EasyWin.prototype.setTitle = function(){

    };

    EasyWin.prototype.setText = function(){

    };

    EasyWin.prototype.setBtn = function(){

    };

    EasyWin.prototype.draw = function () {
        if (this.visible && this._scaleX != 0 && this._scaleY != 0) {
            this.ctx.save();
            this.updateContext(this.ctx);
            this.roundRect(this.ctx,-this.regX*this._scaleX,-this.regY*this._scaleY,this._width,this._height,this.radius,this.normalColor,this.lineWidth);
            this.labelText.draw();
            this.ctx.restore();
        }
    };

    EasyWin.prototype.drawTitle = function(){

    };

    EasyWin.prototype.drawWin = function(){

    };
    EasyWin.prototype.drawBtn = function(){

    };

    EasyWin.prototype.roundRect = function(ctx,x, y, width, height, radius, fill, stroke) {
        if (typeof stroke == "undefined") {
            stroke = true;
        }
        if (typeof radius === "undefined") {
            radius = 5;
        }
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.arc(x+width - radius,y+radius,radius,(Math.PI*3)/2,Math.PI*2,false);
        ctx.lineTo(x + width, y + height - radius);
        ctx.arc(x+width - radius,y+height-radius,radius,0,Math.PI/2,false);
        ctx.lineTo(x + radius, y + height);
        ctx.arc(x+ radius,y+height-radius,radius,Math.PI/2,Math.PI,false);
        ctx.lineTo(x, y + radius);
        ctx.arc(x+ radius,y+radius,radius,Math.PI,(Math.PI*3)/2,false);
        ctx.closePath();
        if (stroke) {
            ctx.stroke();
        }
        if (typeof fill != "undefined") {
            ctx.fillStyle = fill;
            ctx.fill();
        }
    };

    fly.EasyWin = EasyWin;

}());