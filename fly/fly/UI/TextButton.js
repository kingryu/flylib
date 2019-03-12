/**
 * Created by dabing.zdb on 2014/9/11.
 */
// namespace:
this.fly = this.fly||{};
//normal, over down,hit
(function() {

    /*
     中的每帧图像
     1 使用图片数组imgArr
     2 或者使用大图 img，传递矩形裁剪数组来形成动画每帧recArr
     使用1 时 img必须为null,不为null则默认使用裁剪方式
     recArr 每个frame图像的坐标 rect{x,y,width,height} 数组
     */
    function TextButton(context,target, img, recArr,imgArr) {
        //"use strict";
        this.isRun = false;
        this.target = target;
        this.isLoop = false;
        this.onDown = null;
        this.onUp = null;
        this.onMove = null;
        //鼠标是否按中按钮
        this.isPress = false;
        //鼠标是否按下，不一定在按钮上按下
        this.isDown = false;
        this._text = "Button";
        this.labelText = new fly.TextField(context,this._text);
        this.labelText.textAlign = fly.TextField.ALIGN_CENTER;
        this.labelText.textBaseline = fly.TextField.BASE_LINE_MIDDLE;
        this.initialize(context, img, recArr,imgArr);
        this.updateText();
        this.setEnabled(true);
        this.stop();
    }

    TextButton.prototype = new fly.MovieView();

    TextButton.prototype.updateText = function(){
        this.labelText.x = this.width/2;
        this.labelText.y = this.height/2;

    };

    Object.defineProperty(TextButton.prototype, 'label', {
        get: function() {
            return  this._text;
        },
        set: function(value) {
            this._text = value;
            this.labelText.text  = value;
        }
    });

    TextButton.prototype.checkMousePoint = function(x,y){
        if(x > this.x-this.regX&&x<this.x-this.regX+this.width&&y>this.y-this.regY&&y<this.y-this.regY+this.height) {
            return true;
        }
        return false;
    };

    TextButton.prototype.setEnabled = function(value) {
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

    TextButton.prototype.handleEvent = function(evt) {
        var point = null;
        var type = evt.type;
        var mouseOn = false;
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
                    this.gotoAndStop(1);
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
                this.gotoAndStop(3);
            }
        } else if (type == "mouseup"||type == "touchend") {
            if(this.isPress){
                if(this.onUp!=null){
                    this.onUp();
                }
                this.isPress = false;
                this.gotoAndStop(1);
            }
        } else  {
            console.log("other");
        }
    };

    TextButton.prototype.draw = function () {
        if (this.visible && this._scaleX != 0 && this._scaleY != 0) {
            this.ctx.save();
            this.updateContext(this.ctx);
            if(this.isClip){
                var rec = this.recArr[this.currentFrame-1];
                //this.ctx.drawImage(this.img,rec.x, rec.y,rec.width,rec.height, -this.regX * this._scaleX, -this.regY * this._scaleY, rec.width* this._scaleX, rec.height* this._scaleY);
                this.ctx.drawImage(this.img,rec.x, rec.y,rec.width,rec.height, -this.regX * this._scaleX, -this.regY * this._scaleY, this._width, this._height);
            }else {
                this.ctx.drawImage(this.imgArr[this.currentFrame-1], -this.regX * this._scaleX, -this.regY * this._scaleY, this._width, this._height);
            }
            this.labelText.draw();
            this.ctx.restore();
        }
        if(this.isRun){
            this.currentFrame++;
            if(this.currentFrame > this.totalFrame){
                if(this.isLoop){
                    this.currentFrame = 1;
                }else {
                    this.currentFrame = this.totalFrame;
                    this.isRun = false;
                }
            }
        }
    };
    fly.TextButton = TextButton;

}());