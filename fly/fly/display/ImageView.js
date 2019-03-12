/**
 * Created by dabing.zdb on 2014/7/23.
 */
// namespace:
this.fly = this.fly||{};

(function() {
    function ImageView(context, img) {
        //"use strict";
        this.initialize(context, img);
    };

    ImageView.prototype = new fly.View();

    ImageView.prototype.initialize = function (context, img){
        this.ctx = context;
        this.img = img;
        this.setContent(img.width,img.height);
    };

    ImageView.prototype.draw = function () {
        if (this.visible && this._scaleX != 0 && this._scaleY != 0) {
            this.ctx.save();
            this.updateContext(this.ctx);
            this.ctx.drawImage(this.img, -this.regX * this._scaleX, -this.regY * this._scaleY, this._width, this._height);
            this.ctx.restore();
        }
    };

    fly.ImageView = ImageView;

}());