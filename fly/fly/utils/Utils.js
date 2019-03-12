// namespace:
this.fly = this.fly||{};
(function() {
    function Util(){};
/***********************************************
 **************基本类
***********************************************/
    Util.setAnimationFrame = function(){
        if (!window.requestAnimationFrame) {
            requestAnimationFrame = window.requestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.msRequestAnimationFrame
                || window.oRequestAnimationFrame
                || function (callback) {
                    setTimeout(callback, 1000 / 60);
                }
        }
    };

    //控制台输出内容
    Util.p = function(str){
        console.log(str);
    };
    //获取对象全部属性，字符串返回
    Util.getAllPrpos = function(obj){
        // 用来保存所有的属性名称和值
        var props = "";
        // 开始遍历
        for(var p in obj){
            // 方法
            if(typeof(obj[p])=="function"){
                obj[p]();
            }else{
                // p 为属性名称，obj[p]为对应属性的值
                props+= p + "=" + obj[p] + "/t";
            }
        }
        // 最后显示所有的属性
        return props;
    };
    // 取得触摸点坐标
    Util.getMousePoint = function(ev) {
        if(ev.targetTouches!=null){
            pageX = ev.touches[0].clientX;
            pageY = ev.touches[0].clientY;
        } else {
            pageX = ev.clientX;
            pageY = ev.clientY;
        }
        return { 'x': pageX, 'y': pageY};
    };
    //获取页面地址中的变量值
    Util.getURLValue = function(param)
    {
        var query = window.location.search;
        var iLen = param.length;
        var iStart = query.indexOf(param);
        if (iStart == -1)
            return "";
        iStart += iLen + 1;
        var iEnd = query.indexOf("&", iStart);
        if (iEnd == -1)
            return query.substring(iStart);
        return query.substring(iStart, iEnd);
    };

    //获取运行环境相关信息
    Util.browser = function(){
        var ua = navigator.userAgent;
        var info = {
            iphone: /iphone/i.test(ua),
            ipad: /ipad/i.test(ua),
            ipod: /ipod/i.test(ua),
            android: /android/i.test(ua),
            webkit: /webkit/i.test(ua),
            chrome: /chrome/i.test(ua),
            safari: /safari/i.test(ua),
            firefox: /firefox/i.test(ua),
            ie: /msie/i.test(ua),
            opera: /opera/i.test(ua),
            isIOS:(/iPhone|iPad|iPod/i).test(ua),
            osVersion:ua.match(/(?:OS|Android)[\/\s](\d+[._]\d+(?:[._]\d+)?)/i)
        };
        return info;
    };

    //是否IOS设备
    Util.isIOS = Util.browser().isIOS;
    Util.isAndroid = Util.browser().android;

    //是否触摸设备
    Util.is_touch_device = function() {
        return 'ontouchstart' in window // works on most browsers
            || 'onmsgesturechange' in window; // works on ie10 ios8
    };

     //获取本地存储数据，没有返回null
    Util.getLocalStorage = function(key){
        var value = null;
        var lStorage = window.localStorage;
        if(lStorage) {
            if (lStorage.getItem(key)){
                value = lStorage.getItem(key);
            }
        }
        return value;
    };
    //保存数据到本地存储，成功返回true
    Util.setLocalStorage = function(key,value){
        if(window.localStorage) {
            return window.localStorage.setItem(key,value);
        }else {
            return false;
        }
    };

/***********************************************
 **************框架相关类
 ***********************************************/

//等距裁剪图片，通过图片宽高获取裁剪的矩形数组 参数 是否水平方向裁剪
    Util.makeRects = function(w,h,num,isHorizontal){
        var rects = [];
        var dis = 0;
        var i=0;
        if(isHorizontal){
            dis = Math.floor(w/num);
            for(i=0;i<num;i++){
                rects.push({x:i*dis,y:0,width:dis,height:h});
            }
        }else{
            dis = Math.floor(h/num);
            for(i=0;i<num;i++){
                rects.push({x:0,y:i*dis,width:w,height:dis});
            }
        }
        return rects;
    };

    //加载图片方法 图片名 值为[图片地址,是否Gcanvas图片]
    //var imgR = {"a":["img/a.png",true],"b":["img/b.png",true]]};
    //var imgR = {"a":"img/a.png","b":"img/b.png"};
    Util.LoadImage = function(imgR,callBack,isgcanvas){
        var preloaded = 0;
        var count = 0;
        var isGcanvas = isgcanvas||false;
        function onLoads(e){
            preloaded++;
            if (preloaded >= count) {
                setTimeout(callBack,100);
            }
        }
        this.percentLoaded = function(){
            return Math.round(100*preloaded/count);
        };
        if(imgR!=null) {
            for (var item in imgR) {
                count++;
                var img;
                if(imgR[item] instanceof Array){
                    if (isGcanvas&&imgR[item][1]) {
                        img = GCanvas.createImage(false);
                    } else {
                        img = new Image();
                    }
                    img.src = imgR[item][0];
                }else {
                    if (isGcanvas) {
                        img = GCanvas.createImage(false);
                    } else {
                        img = new Image();
                    }
                    img.src = imgR[item];
                }
                img.onload = onLoads;
                imgR[item] = img;
            }
        }else {
            onLoads(null);
        }
    };
    //加载mp3声音方法 图片名 值为[图片地址,是否Gcanvas图片]
    Util.LoadSound = function(soundR,callBack){
        var soundPreloaded = 0;
        var soundCount = 0;
        function soundLoadOk(e){
            soundPreloaded++;
            if (soundPreloaded == soundCount) {
                callBack();
            }
        }
        this.percentLoaded = function(){
            return Math.round(100*soundPreloaded/soundCount);
        };
        //loadSound
        if(soundR!=null){
            for(var address in soundR){
                soundCount++;
                var sound;
                if (this.isIOS) {
                    sound = document.createElement("audio");
                    sound.addEventListener("canplaythrough", soundLoadOk,false);
                } else {
                    //使用media组件
                    sound = new Audio();
                }
                sound.src = soundR[address];
                soundR[address] = sound;
            }
        }
    };
/***********************************************
 **************数学类
 ***********************************************/
    //return min<=n<max  int
    Util.random = function(min,max){
    	return Math.floor(Math.random()*(max-min) + min);
    };
    //随机打乱数组
    Util.randArray = function(arr,n){
        var a, b,v;
        var len = arr.length;
        for(var i=0;i<len*n;i++){
            a = this.random(0,len);
            b = this.random(0,len);
            v = arr[a];
            arr[a] = arr[b];
            arr[b] = v;
        }
        return arr;
    };
    //得到两点之间距离
    Util.getDis = function(x1, y1, x2, y2) {
        return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    };

    //得到点x1,y1到x2,y2的弧度x2,y2为中心 pi
    Util.getDeg = function(x1, y1, x2, y2) {
        return Math.atan2(y1-y2, x1-x2);
    };

    //得到点x1,y1到x2,y2的角度x2,y2为中心 180
    Util.getAng = function(x1, y1, x2, y2) {
        return Math.atan2(y1-y2, x1-x2)*(180/Math.PI);
    };

    //角度转坐标
    Util.angToPoint = function(r,angle){
       return  {x:r*Math.cos(Math.PI*angle/180),y:r*Math.sin(Math.PI*angle/180)};
    };
    //获取随机颜色值
    Util.getRandomColor =function (){
        return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
    };
    //返回给定日期和现在的时间差，时间只能是过去时间
    //返回用来显示发表时间，如3分钟前  2天前等
    Util.getDateDiff =function(dateTimeStamp){    
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if(diffValue < 0){
            return ;
        }
        var monthC =diffValue/month;
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;
        if(monthC>=1){
            result= parseInt(monthC) + "个月前";
        }
        else if(weekC>=1){
            result= parseInt(weekC) + "周前";
        }
        else if(dayC>=1){
            result= parseInt(dayC) +"天前";
        }
        else if(hourC>=1){
            result= parseInt(hourC) +"个小时前";
        }
        else if(minC>=1){
            result= parseInt(minC) +"分钟前";
        }else
            result="刚刚";
        return result;
    }
    /**************************************************************
     计算2个日期之间的天数
     @day1 {Date}起始日期
     @day2 {Date}结束日期
     @return day2 - day1的天数差
     **************************************************************/
    Util.dayMinus = function(day1, day2){
        return Math.floor((day2-day1)/(1000 * 60 * 60 * 24));
    };
    /**
     * 日期对象转换为指定格式的字符串
     * @param f 日期格式,格式定义如下 yyyy-MM-dd HH:mm:ss
     * @param date Date日期对象, 如果缺省，则为当前时间
     *
     * YYYY/yyyy/YY/yy 表示年份
     * MM/M 月份
     * W/w 星期
     * dd/DD/d/D 日期
     * hh/HH/h/H 时间
     * mm/m 分钟
     * ss/SS/s/S 秒
     * @return string 指定格式的时间字符串
     */
    Util.dateToStr = function(formatStr, date){
        formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";
        date = arguments[1] || new Date();
        var str = formatStr;
        var Week = ['日','一','二','三','四','五','六'];
        str=str.replace(/yyyy|YYYY/,date.getFullYear());
        str=str.replace(/yy|YY/,(date.getYear() % 100)>9?(date.getYear() % 100).toString():'0' + (date.getYear() % 100));
        str=str.replace(/MM/,date.getMonth()>=9?(date.getMonth() + 1):'0' + (date.getMonth() + 1));
        str=str.replace(/M/g,date.getMonth());
        str=str.replace(/w|W/g,Week[date.getDay()]);

        str=str.replace(/dd|DD/,date.getDate()>9?date.getDate().toString():'0' + date.getDate());
        str=str.replace(/d|D/g,date.getDate());

        str=str.replace(/hh|HH/,date.getHours()>9?date.getHours().toString():'0' + date.getHours());
        str=str.replace(/h|H/g,date.getHours());
        str=str.replace(/mm/,date.getMinutes()>9?date.getMinutes().toString():'0' + date.getMinutes());
        str=str.replace(/m/g,date.getMinutes());

        str=str.replace(/ss|SS/,date.getSeconds()>9?date.getSeconds().toString():'0' + date.getSeconds());
        str=str.replace(/s|S/g,date.getSeconds());

        return str;
    };
/***********************************************
 **************图像类
 ***********************************************/
    //绘制圆角矩形
    Util.roundRect = function(ctx,x, y, width, height, radius, fill, alpha,strokeWidth,strokeColor) {
        var  stroke = false;
        ctx.save();
        if (typeof strokeWidth != "undefined") {
            stroke = true;
            ctx.lineWidth = parseInt(strokeWidth);
        }
        if (typeof radius === "undefined") {
            radius = 5;
        }
        ctx.globalAlpha =alpha;
        ctx.strokeStyle = strokeColor;
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
        ctx.restore();
    };

    //绘制星形  spikes星星角数量  r0 内边半径  r1外半径  col 颜色值 默认红色
    Util.star = function(ctx,cx, cy, spikes, r0, r1, fill,strokeWidth,strokeColor) {
        spikes = spikes || 5;
        fill = fill || '#FF0000';
        r0 = r0 || 2;
        r1 = r1 || 4;
        var stroke = false;
        ctx.save();
        if (typeof strokeWidth != "undefined") {
            stroke = true;
            ctx.lineWidth = parseInt(strokeWidth);
            strokeColor =strokeColor || '#000';
            ctx.lineWidth = parseInt(strokeWidth);
            ctx.strokeStyle = strokeColor;
        }
        var rot = Math.PI/2*3,x=cx,y=cy,step=Math.PI/spikes;

        ctx.beginPath();
        ctx.moveTo(cx,cy-r0);

        for(i=0;i<spikes;i++){
            x=cx+Math.cos(rot)*r0;
            y=cy+Math.sin(rot)*r0;
            ctx.lineTo(x,y);
            rot+=step;

            x=cx+Math.cos(rot)*r1;
            y=cy+Math.sin(rot)*r1;
            ctx.lineTo(x,y);
            rot+=step;
        }

        ctx.lineTo(cx,cy-r0);
        ctx.closePath();
        ctx.stroke();
        if (typeof fill != "undefined") {
            ctx.fillStyle = fill;
            ctx.fill();
        }
        ctx.restore();
    };

    /* 三宫格水平拉伸图像
         v1 v2
         |  |
         |  |
     */
    //x,y图像为绘制的坐标，width height 实际需要显示的宽高，为图片缩放后值,
    // scale图片缩放值
    //height必须 height = img.height*scale  
    //v1  v2相对原图左侧分割距离 v1 v2之间图像为拉伸区域
    Util.hScaleImage = function(context,img,v1,v2,x,y,width,height,scale){
        context.drawImage(img,0,0,v1,img.height,x,y,v1*scale,height);
        context.drawImage(img,v1,0,v2-v1,img.height,x+v1*scale,y,(width-v1-img.width+v2)*scale,height);
        context.drawImage(img,v2,0,img.width-v2,img.height,x+width-(img.width-v2)*scale,y,scale*(img.width-v2),height);
    };

    /* 三宫格垂直拉伸图像
     h1--|--|--
     h2--|--|--
     */
    Util.vScaleImage = function(context,img,h1,h2,x,y,width,height,scale){
        var w = img.width;
        var h = img.height;
        context.drawImage(img,0,0,w,h1,x,y,width,h1*scale);
        context.drawImage(img,0,h1,w,h2-h1,x,y+h1*scale,width,height-(h1+(w-h2))*scale);
        context.drawImage(img,0,h2,w,h-h2,x,y+height-(w-h2)*scale,width,(h-h2)*scale);

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
    Util.drawScale9Image = function(context,img,v1,v2,h1,h2,x,y,width,height){
        var w = img.width;
        var d = img.height;
        var w2 = v2-v1;
        var w3 = w-v2;
        var d2 = h2 - h1;
        var d3 = d - h2;

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
/***********************************************
 **************字符串类
 ***********************************************/
    //删除字符串前后空格
    Util.trimStr = function(str){
        return str.replace(/(^\s*)|(\s*$)/g,"");
    };
    fly.Util = Util;
}());