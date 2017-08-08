var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*/////////////////////////////////////////////////////////////////////////////////////
//公共事件
事件对象类型: ClickEvent
属性： ClickEvent.CLICK  当座位或者头像被点击的时候执行
      值 targetObject 当前事件对象
-------------
       
-------------

//公共属性
place:number 头像所在位置（只读） 0的位置是自己  0-3 逆时针循序
---------
emptyCode:number 座位的位置
-----------
tid:number //tid设置
--------
head:string//设置用户头像
-------
banker:boolean//显示专家
---------
ready:boolean//显示准备
-------
leave:number//设置离线时间 -1是不离线
-----
score:number;//积分设置
-----
sitDownEnabled:boolean;//坐下状态是否激活
//公共方法
clear();//清除座位信息
------
speechPlay();//语音播放
----
speechStop();//语音停止
/////////////////////////////////////////////////////////////////////////////////////*/
var UserIcon = (function (_super) {
    __extends(UserIcon, _super);
    function UserIcon(place) {
        var _this = _super.call(this) || this;
        //
        _this._place = 0;
        _this.tid = 0;
        _this.headContent = new egret.Sprite;
        _this.emptyCode = 0;
        _this.sex = "n";
        _this.leaveTimer = 0;
        //
        _this.headBim = new egret.Bitmap;
        _this.headDara = null;
        _this.headUrl = "";
        _this._sitDownEnabled = true;
        _this._place = place;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/usericon.exml";
        return _this;
    }
    UserIcon.prototype.onComplete = function () {
        this.init();
    };
    UserIcon.prototype.init = function () {
        //
        var r = new egret.Rectangle(10, 4, 33, 24);
        this.scoreBg.scale9Grid = r;
        this.headContent.addChild(this.headBim);
        this.addChildAt(this.headContent, 2);
        this.headContent.mask = this.masMc;
        this.headBg.visible = false;
        //	this.score=5;
        //
        //
        this.speech = MyUtils.createMovieClipByName("lb");
        this.speech.visible = false;
        this.addChild(this.speech);
        //
        this.addChild(this.button);
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buttonClick, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
    };
    Object.defineProperty(UserIcon.prototype, "leave", {
        get: function () {
            return this.leaveTimer;
            // return this.leaveBim.visible;
        },
        set: function (value) {
            this.leaveTimer = value;
            if (value > 0) {
                this.leaveBim.visible = true;
                this.leaveTimerTxt.visible = true;
                this.leaveTimerTxt.text = this.leaveTimer.toString();
            }
            else {
                this.leaveBim.visible = false;
                this.leaveTimerTxt.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    UserIcon.prototype.timers = function () {
        if (this.leaveTimer > 0) {
            this.leaveTimer--;
            this.leaveTimerTxt.text = this.leaveTimer.toString();
        }
    };
    Object.defineProperty(UserIcon.prototype, "banker", {
        get: function () {
            return this.bankerBim.visible;
        },
        set: function (type) {
            this.bankerBim.visible = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserIcon.prototype, "read", {
        get: function () {
            return this.bankerBim.visible;
        },
        set: function (type) {
            this.readyBim.visible = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserIcon.prototype, "score", {
        get: function () {
            return Number(this.scoreTxt.text);
        },
        set: function (value) {
            this.scoreTxt.text = value.toString();
            this.scoreBg.visible = true;
            this.scoreBg.width = this.scoreTxt.textWidth + 20;
            this.scoreBg.x = 44 - this.scoreBg.width / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserIcon.prototype, "place", {
        get: function () {
            return this._place;
        },
        enumerable: true,
        configurable: true
    });
    UserIcon.prototype.clear = function () {
        this.tid = 0;
        this.emptyBim.visible = true;
        this.nameTxt.text = "";
        this.headBg.visible = false;
        this.bankerBim.visible = false;
        if (this.headDara != null) {
            this.headDara.dispose();
            this.headDara = null;
        }
        //  RES.getResByUrl(url,this.loadComp,this,RES.ResourceItem.TYPE_IMAGE)
        if (this.loader != null) {
            this.loader.removeEventListener(egret.Event.COMPLETE, this.imageComplete, this);
            this.loader = null;
        }
    };
    Object.defineProperty(UserIcon.prototype, "head", {
        get: function () {
            return this.headUrl;
        },
        set: function (url) {
            this.headBg.visible = true;
            this.emptyBim.visible = false;
            this.headUrl = url;
            if (this.headDara != null) {
                this.headDara.dispose();
                this.headDara = null;
            }
            //  RES.getResByUrl(url,this.loadComp,this,RES.ResourceItem.TYPE_IMAGE)
            if (this.loader != null) {
                this.loader.removeEventListener(egret.Event.COMPLETE, this.imageComplete, this);
                this.loader = null;
            }
            this.loader = new egret.URLLoader();
            //设置加载方式为纹理
            this.loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
            //添加加载完成侦听
            this.loader.addEventListener(egret.Event.COMPLETE, this.imageComplete, this);
            var request = new egret.URLRequest(this.headUrl);
            //开始加载
            this.loader.load(request);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserIcon.prototype, "sitDownEnabled", {
        get: function () {
            return this._sitDownEnabled;
        },
        set: function (type) {
            this._sitDownEnabled = type;
            if (this._sitDownEnabled) {
                this.emptyBim.texture = RES.getRes("position2_png");
            }
            else
                this.emptyBim.texture = RES.getRes("position0_png");
        },
        enumerable: true,
        configurable: true
    });
    UserIcon.prototype.imageComplete = function (e) {
        this.loader.removeEventListener(egret.Event.COMPLETE, this.imageComplete, this);
        this.headDara = e.target.data;
        this.headBim.texture = this.headDara;
        this.headBim.x = 13;
        this.headBim.y = 12;
        this.headBim.width = 64;
        this.headBim.height = 64;
        this.loader = null;
    };
    //
    UserIcon.prototype.speechPlay = function () {
        this.speech.visible = true;
        this.speech.play(-1);
    };
    UserIcon.prototype.speechStop = function () {
        this.speech.stop();
        this.speech.visible = false;
    };
    //点击头像按钮
    UserIcon.prototype.buttonClick = function (e) {
        var event = new ButtonEvent(ButtonEvent.CLICK);
        event.targetObject = this;
        this.dispatchEvent(event);
    };
    //移除自己的时候
    UserIcon.prototype.removeThis = function (e) {
        this.button.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.buttonClick, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
        if (this.headDara != null) {
            this.headDara.dispose();
            this.headDara = null;
        }
        //  RES.getResByUrl(url,this.loadComp,this,RES.ResourceItem.TYPE_IMAGE)
        if (this.loader != null) {
            this.loader.removeEventListener(egret.Event.COMPLETE, this.imageComplete, this);
            this.loader = null;
        }
        console.log("移除头像");
    };
    return UserIcon;
}(eui.Component));
__reflect(UserIcon.prototype, "UserIcon");
//# sourceMappingURL=UserIcon.js.map