/**
 * Created by dabing.zdb on 2014/9/11.
 */
// namespace:
this.fly = this.fly||{};
//normal, over down,hit
(function() {

    /*
        width 按钮宽度
     target  事件添加对象
     */
    function EasyButton(context,target) {
        //"use strict";
        this.ctx = context;
        this.target = target;
        this.onDown = null;
        this.onUp = null;
        this.onMove = null;
        //鼠标是否按中按钮
        this.isPress = false;
        //鼠标是否按下，不一定在按钮上按下
        this.isDown = false;
        this.normalColor = "#FFFFFF";
        this.pressColor = "#A9E2F3";
        this.normalTxtColor = "#000000";
        this.pressTxtColor = "#F7FE2E";
        this.lineWidth = 1;
        this.radius = 10;
        this.currentFrame=1;
        this._text = "Button";
        this.labelText = new fly.TextField(context,this._text);
        //this.labelText.textAlign = "center";
        //this.labelText.textBaseline = "middle";
        console.log("EasyButton consture");
        this.initialize(context);
        this.setEnabled(true);
    }

    EasyButton.prototype = new fly.View();
    //EasyButton.prototype = new fly.TextField(this.ctx,"Button");

    EasyButton.prototype.initialize = function (context){
        console.log("EasyButton initialize");
        this.ctx = context;
        this.setContent(100,30);
        this.updateText();
        this.setEnabled(true);
    };

    Object.defineProperty(EasyButton.prototype, 'label', {
        get: function() {
            return  this._text;
        },
        set: function(value) {
            this._text = value;
            this.labelText.text = value;
            this.updateText();
        }
    });

    EasyButton.prototype.updateText = function(){
        console.log(this.labelText.width);
        this.labelText.x =2+(this.width -this.labelText.width)/2;
        this.labelText.y =(this.height -this.labelText.height)/2;
    };

    EasyButton.prototype.checkMousePoint = function(x,y){
        if(x > this.x-this.regX&&x<this.x-this.regX+this.width&&y>this.y-this.regY&&y<this.y-this.regY+this.height) {
            return true;
        }
        return false;
    };

    EasyButton.prototype.setEnabled = function(value) {
        var o = this.target;
        if (value) {
            if(fly.Util.is_touch_device()){
                o.addEventListener("touchstart", this);
                o.addEventListener("touchmove", this);
                o.addEventListener("touchend", this);
            }else {
                o.addEventListener("mousedown", this);
                o.addEventListener("mouseup", this);
                o.addEventListener("mousemove", this);
            }

        } else {
            if(fly.Util.is_touch_device()){
                o.removeEventListener("touchstart", this);
                o.removeEventListener("touchmove", this);
                o.removeEventListener("touchend", this);
            }else {
                o.removeEventListener("mousedown", this);
                o.removeEventListener("mouseup", this);
                o.removeEventListener("mousemove", this);
            }

        }
    };

    EasyButton.prototype.handleEvent = function(evt) {
        var type = evt.type;
        var mouseOn;
        var point;
        if (type == "mousemove"||type == "touchmove") {
            point = fly.Util.getMousePoint(evt);
            if(this.checkMousePoint(point.x,point.y)){
                mouseOn = true;
            }
            if(mouseOn){
                if(this.onMove!=null){
                    this.onMove();
                }
            }else {
                if(this.isPress){
                    this.currentFrame=1;
                }
            }
        } else if (type == "mousedown"||type == "touchstart") {
            point = fly.Util.getMousePoint(evt);
            if(this.checkMousePoint(point.x,point.y)){
                mouseOn = true;
            }
            if(mouseOn){
                if(this.onDown!=null){
                    this.onDown();
                }
                this.isPress = true;
                this.currentFrame=3;
            }
        } else if (type == "mouseup"||type == "touchend") {
            if(this.isPress){
                if(this.onUp!=null){
                    this.onUp();
                }
                this.isPress = false;
                this.currentFrame=1;
            }
        } else  {
            console.log("other");
        }
    };

    EasyButton.prototype.draw = function () {
        if (this.visible && this._scaleX != 0 && this._scaleY != 0) {
            this.ctx.save();
            this.updateContext(this.ctx);
            //this.ctx.drawImage(this.img,rec.x, rec.y,rec.width,rec.height, -this.regX * this._scaleX, -this.regY * this._scaleY, this._width, this._height);
            if(this.currentFrame==1){
                this.roundRect(this.ctx,-this.regX*this._scaleX,-this.regY*this._scaleY,this._width,this._height,this.radius,this.normalColor,this.lineWidth);
            }else {
                this.roundRect(this.ctx,-this.regX*this._scaleX,-this.regY*this._scaleY,this._width,this._height,this.radius,this.pressColor,this.lineWidth);
            }
            this.labelText.draw();
            this.ctx.restore();
        }
    };

    EasyButton.prototype.roundRect = function(ctx,x, y, width, height, radius, fill, stroke) {
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
    }

    fly.EasyButton = EasyButton;

}());