/**
 * Created by dabing.zdb on 2014/7/22.
 */
// namespace:
this.fly = this.fly||{};

(function() {
    function View(){
        //"use strict";
        this.x = 0;
        this.y = 0;
        //旋转角度0-360;
        this.rotation = 0;
        this._scaleX = 1;
        this._scaleY = 1;
        //注册中心
        this._regX = 0;
        this._regY = 0;
        this.visible = true;
        //当前宽高
        this._width = 1;
        this._height = 1;
        //原始宽高
        this.oWidth = 1;
        this.oHeight = 1;
        this.alpha=1;
        this.name;
        this.parent;
        this.root;
    }
    View.prototype.setContent = function(wid,hei){
        this.oWidth = wid;
        this.oHeight = hei;
        this._width = this.oWidth;
        this._height = this.oHeight;
    };

    View.prototype.updateContext = function(ctx){
        if(this.alpha<1){
            ctx.globalAlpha *= this.alpha;
        }
        ctx.translate(this.x,this.y);
        if(this.rotation%360!=0){
            ctx.rotate(this.rotation%360*Math.PI/180);
        }
    };

    Object.defineProperty(View.prototype, 'regX', {
        get: function() {
            return  this._regX;
        },
        set: function(value) {
            this._regX = value/this._scaleX;
        }
    });

    Object.defineProperty(View.prototype, 'regY', {
        get: function() {
            return  this._regY;
        },
        set: function(value) {
            this._regY = value/this.scaleY;
        }
    });

    Object.defineProperty(View.prototype, 'width', {
        get: function() {
            return  this._width;
        },
        set: function(value) {
            this._scaleX = value/this.oWidth;
            this._width = value;
        }
    });

    Object.defineProperty(View.prototype, 'height', {
        get: function() {
            return  this._height;
        },
        set: function(value) {
            this._scaleY = value/this.oHeight;
            this._height = value;
        }
    });

    Object.defineProperty(View.prototype, 'scaleX', {
        get: function() {
            return  this._scaleX;
        },
        set: function(value) {
            this._scaleX = value;
            this._width = this.oWidth*this._scaleX;
        }
    });

    Object.defineProperty(View.prototype, 'scaleY', {
        get: function() {
            return  this._scaleY;
        },
        set: function(value) {
            this._scaleY = value;
            this._height = this.oHeight*this._scaleY;
        }
    });
    fly.View = View;
}());