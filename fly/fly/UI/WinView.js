/**
 * Created by dabing.zdb on 2014/12/9.
 */
this.fly = this.fly||{};

(function() {
    function WinView(context, img) {
        //"use strict";
        this.initialize(context, img);
    }

    WinView.prototype = new fly.Scale9View(null,null);

    WinView.prototype.initialize = function (context, img){
        this.ctx = context;
        this.img = img;
        this.title = null;
        this.titleHeight = 30;
        this.msg = null;
        this.btnArr = [];
        this.hasTitle = false;
    };

    WinView.prototype.setTitle = function(title,height){
        this.titleHeight = height||30;
        this.title = new fly.TextField(this.ctx,title);
        this.hasTitle = true;
        this.updateText();
    };

    WinView.prototype.setMsg = function(text){
        this.msg = new fly.TextField(this.ctx,text);
        this.updateText();
    };

    WinView.prototype.updateText = function(){
        if(this.hasTitle){
            this.title.x = this.width/2-this.title.width/2;
            this.title.y = this.y+this.titleHeight/2;
            this.title.align = fly.TextField.ALIGN_CENTER;
            this.title.textBaseline = fly.TextField.BASE_LINE_MIDDLE;
        }
        if(this.msg!=null) {
            this.msg.x = this.width / 2-this.msg.width/2;
            this.msg.y = this.height / 2;
            this.msg.align = fly.TextField.ALIGN_CENTER;
            this.msg.textBaseline = fly.TextField.BASE_LINE_MIDDLE;
        }
    };

    WinView.prototype.setOkBtn = function(btn){
        this.addBtn(btn);
        btn.x = this.x+10;
        btn.y = this.y+this.height-btn.height-10;
        this.updateBtn();
    };

    WinView.prototype.setCancelBtn = function(btn2){
        this.addBtn(btn2);
        btn2.x = this.x+this.width - btn2.width -10;
        btn2.y = this.y+this.height-btn2.height-10;
        this.updateBtn();
    };

    WinView.prototype.addBtn = function(btn){
        this.btnArr.push(btn);
        this.updateBtn();
    };

    WinView.prototype.updateBtn = function(){

    };

    WinView.prototype.draw = function () {

        if (this.visible && this._scaleX != 0 && this._scaleY != 0) {
            this.ctx.save();
            this.updateContext(this.ctx);
            this.__proto__.drawScale9Image(this.ctx,this.img,this.v1,this.v2,this.h1,this.h2, -this._regX*this._scaleX, -this._regY * this._scaleY, this._width, this._height);
            if(this.hasTitle){
                this.title.draw();
            }
            if(this.msg!=null){
                this.msg.draw();
            }
            if(this.btnArr.length>0){
                for(btn in this.btnArr){
                    this.btnArr[btn].draw();
                }
            }
            this.ctx.restore();
        }
    };

    fly.WinView = WinView;

}());