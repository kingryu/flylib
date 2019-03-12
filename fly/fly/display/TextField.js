/**
 * Created by dabing.zdb on 2014/7/23.
 */
/**
 *@class 类 TextField 设定文本属性
 *  {String} text 文字内容 如"中奖50元"。
 *  {String} font 显示的字体，默认"黑体"。
 *  {String} fontColor 文字颜色，默认"#000000"
 *  {Number} fontSize 文字大小磅值 默认16。
 *  {String} style 文字样式 normal普通 bold加粗（默认值） italic斜体
 *  {Number} x 文字显示位置 x坐标 默认值为0。
 *  {Number} y 文字显示位置 y坐标 默认值为0。
 *  {String} textAlign 水平方向对齐方式。'left'、'right'、'center' 默认值为left.
 *  {String} textBaseline 垂直方向对齐方式。top, hanging, middle, alphabetic, ideographic, bottom默认值为top.
 *  {String} strokeColor 文字描边颜色，不需要描边可不设定值，默认不设定。
 *  {Number} strokeWidth 文字描边宽度 默认不设定。
 **/
// namespace:
this.fly = this.fly||{};

(function() {
    function TextField(context, txt) {
        //"use strict";
        this.initialize(context, txt);
    };

    TextField.ALIGN_LEFT = "left";
    TextField.ALIGN_CENTER = "center";
    TextField.ALIGN_RIGHT = "right";
    TextField.BASE_LINE_TOP = "top";
    TextField.BASE_LINE_HANGING = "hanging";
    TextField.BASE_LINE_MIDDLE = "middle";
    TextField.BASE_LINE_ALPHABETIC = "alphabetic";
    TextField.BASE_LINE_BOTTOM = "bottom";

    TextField.prototype = new fly.View();
    TextField.prototype.initialize = function (context, txt){
        this.ctx = context;
        this._text = txt;
        this._font = "Arial";
        this._fontSize = "24";
        this._style = "bold";
        this.fontColor = "#000000";
        this.textAlign = "left";
        this.textBaseline = "top";
        this.strokeColor = null;
        this.strokeWidth = 1;
        //行间距
        this._lineSpace = this._fontSize;
        this.lines = 1;
        //多行文本内容
        this.textArr = [];
        var wid = context.measureText(this._text).width;
        this.setContent(wid, this._fontSize*1.2);
        this.updateText();
    };

    TextField.prototype.updateText = function (){
        this.ctx.save();
        this.ctx.font = this._style + " " + this._fontSize + "px " + this._font;
        this.textArr = this._text.split(/(?:\r\n|\r|\n)/);
        this.lines = this.textArr.length;
        this.setContent(this.ctx.measureText(this._text).width, this._fontSize*1.2);
        this.ctx.restore();
        //重新设置宽高
        this._lineSpace = this._fontSize;
        this.scaleX = this._scaleX;
        this.scaleY = this._scaleY;
    };

    Object.defineProperty(TextField.prototype, 'text', {
        get: function() {
            return  this._text;
        },
        set: function(value) {
            this._text = value;
            this.updateText();
        }
    });

    Object.defineProperty(TextField.prototype, 'fontSize', {
        get: function() {
            return  this._fontSize;
        },
        set: function(value) {
            this._fontSize = value;
            this.updateText();
        }
    });

    Object.defineProperty(TextField.prototype, 'style', {
        get: function() {
            return  this._style;
        },
        set: function(value) {
            this._style = value;
            this.updateText();
        }
    });

    Object.defineProperty(TextField.prototype, 'font', {
        get: function() {
            return  this._font;
        },
        set: function(value) {
            this._font = value;
            this.updateText();
        }
    });

    TextField.prototype.draw = function () {
        if (this.visible && this._scaleX != 0 && this._scaleY != 0) {
            this.ctx.save();
            this.updateContext(this.ctx);
            this.ctx.fillStyle = this.fontColor;
            this.ctx.font = this._style + " " + this._fontSize + "px " + this._font;
            this.ctx.textAlign = this.textAlign;
            this.ctx.textBaseline = this.textBaseline;
            this.ctx.scale(this._scaleX,this.scaleY);

            if (this.strokeColor != null && this.strokeColor != undefined) {
                this.ctx.strokeStyle = this.strokeColor;
                this.ctx.lineWidth = this.strokeWidth;
                //this.ctx.strokeText(this._text, -this.regX * this._scaleX, -this.regY * this._scaleY);
            }
            for (i = 0; i < this.lines; i++) {
                if (this.strokeColor != null && this.strokeColor != undefined) {
                    this.ctx.strokeText(this.textArr[i], -this.regX/this._scaleX , (-this.regY/ this._scaleY)+this._lineSpace*i);
                }
                this.ctx.fillText(this.textArr[i], -this.regX/this._scaleX , (-this.regY/ this._scaleY)+this._lineSpace*i );
            }
            this.ctx.restore();
        }
    };

    fly.TextField = TextField;
}());