/**
 * Created by dabing.zdb on 2014/7/28.
 */
// namespace:
this.fly = this.fly||{};

(function() {
    function Layer(context) {
        //"use strict";
        this.initialize(context);
    };

    Layer.prototype = new fly.View();

    Layer.prototype.initialize = function (context){
        this.ctx = context;
        this.children = [];
        //this.setContent(img.width,img.height);
    };

    Layer.prototype.addChild = function(child) {
        if (child == null) { return child; }
        var l = arguments.length;
        if (l > 1) {
            for (var i=0; i<l; i++) { this.addChild(arguments[i]); }
            return arguments[l-1];
        }
        if (child.parent) { child.parent.removeChild(child); }
        child.parent = this;
        this.children.push(child);
        //TODO 实现真实宽度
        this.setContent(child.width,child.height);
        return child;
    };

    Layer.prototype.onMeauser = function(){

    };

    Layer.prototype.addChildAt = function(child, index) {
        var l = arguments.length;
        var indx = arguments[l-1]; // can't use the same name as the index param or it replaces arguments[1]
        if (indx < 0 || indx > this.children.length) { return arguments[l-2]; }
        if (l > 2) {
            for (var i=0; i<l-1; i++) { this.addChildAt(arguments[i], indx+i); }
            return arguments[l-2];
        }
        if (child.parent) { child.parent.removeChild(child); }
        child.parent = this;
        this.children.splice(index, 0, child);
        this.setContent(child.width,child.height);
        return child;
    };

    Layer.prototype.removeChild = function(child) {
        var l = arguments.length;
        if (l > 1) {
            var good = true;
            for (var i=0; i<l; i++) { good = good && this.removeChild(arguments[i]); }
            return good;
        }
        return this.removeChildAt(createjs.indexOf(this.children, child));
    };

    Layer.prototype.removeChildAt = function(index) {
        var l = arguments.length;
        if (l > 1) {
            var a = [];
            for (var i=0; i<l; i++) { a[i] = arguments[i]; }
            a.sort(function(a, b) { return b-a; });
            var good = true;
            for (var i=0; i<l; i++) { good = good && this.removeChildAt(a[i]); }
            return good;
        }
        if (index < 0 || index > this.children.length-1) { return false; }
        var child = this.children[index];
        if (child) { child.parent = null; }
        this.children.splice(index, 1);
        return true;
    };

    Layer.prototype.removeAllChildren = function() {
        var kids = this.children;
        while (kids.length) { kids.pop().parent = null; }
    };

    Layer.prototype.getChildAt = function(index) {
        return this.children[index];
    };

    Layer.prototype.getChildByName = function(name) {
        var kids = this.children;
        for (var i=0,l=kids.length;i<l;i++) {
            if(kids[i].name == name) { return kids[i]; }
        }
        return null;
    };

    Layer.prototype.getNumChildren = function() {
        return this.children.length;
    };


    Layer.prototype.swapChildrenAt = function(index1, index2) {
        var kids = this.children;
        var o1 = kids[index1];
        var o2 = kids[index2];
        if (!o1 || !o2) { return; }
        kids[index1] = o2;
        kids[index2] = o1;
    };

    Layer.prototype.swapChildren = function(child1, child2) {
        var kids = this.children;
        var index1,index2;
        for (var i=0,l=kids.length;i<l;i++) {
            if (kids[i] == child1) { index1 = i; }
            if (kids[i] == child2) { index2 = i; }
            if (index1 != null && index2 != null) { break; }
        }
        if (i==l) { return; }
        kids[index1] = child2;
        kids[index2] = child1;
    };

    Layer.prototype.draw = function(ctx, ignoreCache) {
        if (this.visible && this._scaleX != 0 && this._scaleY != 0) {
            var list = this.children.slice(0);
            var len = list.length;
            this.ctx.save();
            this.updateContext(this.ctx);
            this.ctx.scale(this._scaleX,this.scaleY);
            for (var i=0,l=len; i<l; i++) {
                var child = list[i];
                if (child.visible) {
                    // draw the child:
                    this.ctx.save();
                    child.draw();
                    this.ctx.restore();
                }
            }
            this.ctx.restore();
        }
    };

    fly.Layer = Layer;

}());