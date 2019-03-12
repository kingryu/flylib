/**
 * Created by dabing.zdb on 2014/12/12.
 */
this.fly = this.fly||{};

//"use strict";
(function() {
    function Scale9View(context, img) {
        this.v1 = 0;
        this.v2 = 0;
        this.h1 = 0;
        this.h2 = 0;
        this.initialize(context, img);
    }

    Scale9View.prototype = new fly.View();

    Scale9View.prototype.initialize = function (context, img){
        this.ctx = context;
        this.img = img;
        if(img!=null){
            this.setContent(img.width,img.height);
            this.v2 = img.width;
            this.h2 = img.height;
        }
    };

    Scale9View.prototype.setScaleLine = function(v1,v2,h1,h2){
        this.v1 = v1;
        this.v2 = v2;
        this.h1 = h1;
        this.h2 = h2;
    };
    /* 九宫格拉伸图像
     v1 v2
     |  |
     h1--|--|--
     h2--|--|--
     |  |
     */
    //x,y图像为绘制的坐标，width height 实际需要显示的宽高,
    //v1  v2相对原图左侧分割距离 v1 v2之间图像为拉伸区域
    //h1  h2相对原图顶部距离  h1,h2之间图像拉伸
    Scale9View.prototype.drawScale9Image = function(context,img,v1,v2,h1,h2,x,y,width,height){
        var w = img.width;
        var d = img.height;
        var w2 = v2-v1;
        var w3 = w-v2;
        var d2 = h2 - h1;
        var d3 = d - h2;
        //console.log([v1,v2,h1,h2]);

        context.save();
        context.translate(x,y);
        context.drawImage(img,0,0,v1,h1,0,0,v1,h1);
        context.drawImage(img,v1,0,w2,h1,v1,0,width-v1-w3,h1);
        context.drawImage(img,v2,0,w3,h1,width-w3,0,w3,h1);

        context.drawImage(img,0,h1,v1,d2,0,h1,v1,height-h1-d3);
        context.drawImage(img,v1,h1,w2,d2,v1,h1,width-v1-w3,height-h1-d3);
        context.drawImage(img,v2,h1,w3,d2,width-w3,h1,w3,height-h1-d3);

        context.drawImage(img,0,h2,v1,d3,0,height-d3,v1,d3);
        context.drawImage(img,v1,h2,w2,d3,v1,height-d3,width-v1-w3,d3);
        context.drawImage(img,v2,h2,w3,d3,width-w3,height-d3,w3,d3);
        context.restore();
    };

    Scale9View.prototype.draw = function () {
        if (this.visible && this._scaleX != 0 && this._scaleY != 0) {
            this.ctx.save();
            this.updateContext(this.ctx);
            this.drawScale9Image(this.ctx,this.img,this.v1,this.v2,this.h1,this.h2, -this._regX*this._scaleX, -this._regY * this._scaleY, this._width, this._height);
            this.ctx.restore();
        }
    };

    fly.Scale9View = Scale9View;

}());