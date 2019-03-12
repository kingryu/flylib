/**
 * Created by dabing.zdb on 2014/7/30.
 */
// namespace:
this.fly = this.fly||{};
(function() {
    function Tween(type){
        //"use strict";
        this.isFinish = false;
        this.type = type;
        this.view = null;
        this.time = 0;
        this.aimPro={};
        this.callBack;
        this.startTime = 0;
        this.startPro={};
        this.deltaPro={}
    }

    Tween.prototype.To = function(target,time,aimPro,callBack){
        this.view = target;
        this.time = time;
        this.aimPro = aimPro;
        this.callBack = callBack;
        this.startTime =  new Date().getTime();

        for(var p in aimPro){
            var oldVal = target[p], newVal = aimPro[p];
            if(oldVal !== undefined){
                if(typeof oldVal == 'number' && typeof newVal == 'number'){
                    this.startPro[p] = oldVal;
                    this.deltaPro[p] = newVal - oldVal;
                }
            }
        }
        this.isFinish = false;
    };

    Tween.prototype.tick = function(){
        if(!this.isFinish){
            var timDis = new Date().getTime() - this.startTime;
            if(timDis <this.time){
                for(var p in this.aimPro){
                    var oldVal = this.startPro[p], newVal = this.aimPro[p];
                    if(oldVal !== undefined){
                        if(typeof oldVal == 'number' && typeof newVal == 'number'){
                            //this.view[p]= this.startPro[p]+((this.deltaPro[p]*timDis)/this.time);
                           this.view[p] = this.type(timDis,this.startPro[p],this.deltaPro[p],this.time);
                        }
                    }
                }
            }else {
                for(var p in this.aimPro){
                    var oldVal = this.startPro[p], newVal = this.aimPro[p];
                    if(oldVal !== undefined){
                        if(typeof oldVal == 'number' && typeof newVal == 'number'){
                            this.view[p]= this.aimPro[p];
                        }
                    }
                }
                this.isFinish = true;
                this.callBack();
            }
        }
        //this.view[aimPro]
    };

    /*
    算法来源：http://www.robertpenner.com/easing/
     t: current time(当前时间)
     b: beginning value(初始值)
     c: change in value(变化量)
     d: duration(持续时间)
    */
    Tween.Linear = function(t,b,c,d){ return c*t/d + b; };

    Tween.Quad = {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t + b;
            },
            easeOut: function(t,b,c,d){
                return -c *(t/=d)*(t-2) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            }
        };

    Tween.Cubic = {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return c*((t=t/d-1)*t*t + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t + b;
                return c/2*((t-=2)*t*t + 2) + b;
            }
        };

    Tween.Quart = {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            }
        };

    fly.Tween = Tween;
}());