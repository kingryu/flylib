/**
 * Created by dabing.zdb on 2014/7/23.
 */
// namespace:
this.fly = this.fly||{};

(function() {
    function MovieView(context, img, recArr,imgArr) {
        //"use strict";
        this.initialize(context, img, recArr,imgArr);
    }

    MovieView.prototype = new fly.View();

    /*
        动画中的每帧图像
        1 使用图片数组imgArr
        2 或者使用大图 img，传递矩形裁剪数组来形成动画每帧recArr
        使用1 时 img必须为null,不为null则默认使用裁剪方式
        recArr 每个frame图像的坐标 rect{x,y,width,height} 数组
     */
    MovieView.prototype.initialize = function (context, img, recArr,imgArr){
        this.ctx = context;
        this.img = img;
        this.imgArr = imgArr;
        this.currentFrame=1;

        this.isRun = true;
        this.isLoop = true;
        this.recArr = recArr;

        this.isClip = true;
        this.totalFrame = 1;

        if(img != null){
            if(recArr!=null&&recArr.length>0){
                this.setContent(recArr[0].width,recArr[0].height);
            }else {
                this.setContent(img.width,img.height);
            }
            this.totalFrame=recArr.length;
        }else if(imgArr!=null){
            this.isClip = false;
            this.totalFrame=imgArr.length;
            this.setContent(imgArr[0].width,imgArr[0].height);
        }
    };

    MovieView.prototype.setFrame = function(frame){
        if(frame>this.totalFrame){
            this.currentFrame = this.totalFrame;
        }else if(frame<1){
            this.currentFrame = 1;
        }else {
            this.currentFrame = frame;
        }
    };

    MovieView.prototype.gotoAndPlay = function(frame){
        this.setFrame(frame);
        this.isRun = true;
    };

    MovieView.prototype.gotoAndStop = function(frame){
        this.setFrame(frame);
        this.isRun = false;
    };

    MovieView.prototype.play = function (){
        this.isRun = true;
    };

    MovieView.prototype.stop  = function (){
        this.isRun = false;
    };

    MovieView.prototype.draw = function () {
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
    fly.MovieView = MovieView;

}());