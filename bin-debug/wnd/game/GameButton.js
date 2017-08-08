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
属性： ClickEvent.CLICK  当按钮被点击的时候执行
参数： name:点击的按钮昵称
       值:send_txt 点击发送文本按钮
         speech_paly 发送录音
         speech_stop 停止录音
         send_speech 点击发送语音按钮
         send_emoji  点击发送表情按钮
         system_menu   系统菜单按钮
         system_sound   系统声音按钮
         system_set   系统设置按钮
        //
        hu：胡
        gang：杆
        peng：碰
        chi：吃
        guo：过
        //菜单系统
        menuList_watch:观战
        menuList_invitation:邀请
        menuList_rule：规则
        menuList_outRoom：退出房间
-------------

//公共属性
-----------
communicateShow:boolean;//是否显示通信按钮，如果显示，将显示文本和语音表情输入
-------------
emojiEnabled:boolean;//表情按钮是否可点击
-----------
textEnabled:boolean;//文本按钮是否可点击
--------
speechEnabled:boolean;//语音按钮是否可点击
//公共方法
UILayout();//UI布局
------------
operationButtonShowHide({"hu":false,"gang":false,"peng":false,"chi":true});操作按钮的显示与隐藏
----------
operationButtonHide();//隐藏吃碰胡操作按钮
-------
newsPlay();//消息提示
/////////////////////////////////////////////////////////////////////////////////////*/
var GameButton = (function (_super) {
    __extends(GameButton, _super);
    //
    function GameButton() {
        var _this = _super.call(this) || this;
        _this.button = [];
        //
        _this.listEvent = ["menuList_watch", "menuList_invitation", "menuList_rule", "menuList_outRoom"];
        //
        _this.second = 0;
        _this.move = false;
        _this.moveY = 0;
        _this.speechClick = true;
        //
        _this.buuton_x = [937, 816, 695, 575, 454];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/gamebutton.exml";
        return _this;
    }
    GameButton.prototype.onComplete = function () {
        this.init();
    };
    GameButton.prototype.init = function () {
        this.menuList.visible = false;
        this.button.push(this.guoButton);
        this.button.push(this.huButton);
        this.button.push(this.pengButton);
        this.button.push(this.gangButton);
        this.button.push(this.chiButton);
        this.speechHint = new SpeechHint();
        this.speechHint.visible = false;
        this.speechHint.enabled = false;
        this.addChild(this.speechHint);
        this.txtButton.smoothing = true;
        this.speechButton.smoothing = true;
        this.emojiButton.smoothing = true;
        this.txtButton.name = "send_txt";
        this.speechButton.name = "send_speech";
        this.emojiButton.name = "send_emoji";
        this.menuButton.name = "system_menu";
        this.soundButton = MyUtils.createMovieClipByName("sound0");
        this.soundButton.y = 4;
        this.addChild(this.soundButton);
        this.soundButton.touchEnabled = true;
        this.soundButton.name = "system_sound";
        this.setButton.name = "system_set";
        //
        this.guoButton.visible = this.gangButton.visible = this.pengButton.visible = this.huButton.visible = this.chiButton.visible = false;
        this.guoButton.name = "guo";
        this.gangButton.name = "gang";
        this.pengButton.name = "peng";
        this.huButton.name = "hu";
        this.chiButton.name = "chi";
        //
        this.guoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.operationClick, this);
        this.gangButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.operationClick, this);
        this.pengButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.operationClick, this);
        this.huButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.operationClick, this);
        this.chiButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.operationClick, this);
        //
        this.txtButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.communicateClick, this);
        this.speechButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.speechBegin, this);
        this.emojiButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.communicateClick, this);
        this.menuButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.systemClick, this);
        this.soundButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.systemClick, this);
        this.setButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.systemClick, this);
        //
        for (var i = 0; i < 4; i++) {
            this["button" + i].name = "i" + i;
            this["button" + i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.menuListClick, this);
        }
        //
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
        this.communicateShow = false;
    };
    GameButton.prototype.speechBegin = function (e) {
        if (egret.Capabilities.isMobile) {
            if (this.speechHint.visible) {
                this.moveY = e.stageY;
                this.move = true;
            }
            else {
                if (this.speechClick) {
                    this.second = 15;
                    this.speechHint.timerText.text = this.second + '"';
                    this.speechHint.visible = true;
                    this.move = false;
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.speechStageEnd, this);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.speechStageEnd, this);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.speechStageMove, this);
                    var event = new ButtonEvent(ButtonEvent.CLICK);
                    event.name = "speech_paly";
                    this.dispatchEvent(event);
                }
            }
        }
        else {
            WndManager.root.main.alert.show(GameData.textJson[12], [{ texture: "ok_png", code: 100 }]);
        }
    };
    GameButton.prototype.speechStageMove = function (e) {
        if (this.moveY - e.stageY > 150) {
            this.speechHintOut();
            var event = new ButtonEvent(ButtonEvent.CLICK);
            event.name = "speech_stop";
            this.dispatchEvent(event);
        }
    };
    GameButton.prototype.speechStageEnd = function (e) {
        if (this.move) {
            var event = new ButtonEvent(ButtonEvent.CLICK);
            event.timer = 15 - this.second;
            event.name = "send_speech";
            this.dispatchEvent(event);
            this.speechHintOut();
        }
    };
    GameButton.prototype.speechHintOut = function () {
        this.move = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.speechStageEnd, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.speechStageEnd, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.speechStageMove, this);
        this.second = 0;
        this.speechHint.visible = false;
    };
    GameButton.prototype.timers = function () {
        if (this.second > 0) {
            this.second--;
            this.speechHint.timerText.text = this.second + '"';
            if (this.second == 0) {
                var event = new ButtonEvent(ButtonEvent.CLICK);
                event.timer = 15 - this.second;
                event.name = "send_speech";
                this.dispatchEvent(event);
                this.speechHintOut();
            }
        }
    };
    //
    GameButton.prototype.menuListClick = function (e) {
        //	 this.menuList.visible=false;
        var event = new ButtonEvent(ButtonEvent.CLICK);
        event.name = this.listEvent[Number(e.currentTarget.name.substr(1))];
        this.dispatchEvent(event);
    };
    GameButton.prototype.systemClick = function (e) {
        if (e.currentTarget == this.soundButton) {
            this.soundButton.gotoAndStop(0);
        }
        else if (e.currentTarget == this.menuButton) {
            if (this.menuList.visible == false) {
                this.menuList.visible = true;
                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.menuListOut, this);
            }
        }
        var event = new ButtonEvent(ButtonEvent.CLICK);
        event.name = e.currentTarget.name;
        this.dispatchEvent(event);
    };
    GameButton.prototype.menuListOut = function (e) {
        this.menuList.visible = false;
    };
    GameButton.prototype.operationClick = function (e) {
        var event = new ButtonEvent(ButtonEvent.CLICK);
        event.name = e.currentTarget.name;
        this.dispatchEvent(event);
    };
    GameButton.prototype.communicateClick = function (e) {
        egret.Tween.removeTweens(e.currentTarget);
        e.currentTarget.scaleX = e.currentTarget.scaleY = GameData.stageScale / 2;
        egret.Tween.get(e.currentTarget).to({ scaleX: GameData.stageScale, scaleY: GameData.stageScale }, 800, egret.Ease.backOut);
        var event = new ButtonEvent(ButtonEvent.CLICK);
        event.name = e.currentTarget.name;
        this.dispatchEvent(event);
    };
    Object.defineProperty(GameButton.prototype, "communicateShow", {
        get: function () {
            return this.txtButton.visible;
        },
        //
        set: function (type) {
            this.txtButton.visible = this.emojiButton.visible = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameButton.prototype, "emojiEnabled", {
        get: function () {
            return this.emojiButton.touchEnabled;
        },
        set: function (type) {
            this.emojiButton.touchEnabled = type;
            if (type) {
                this.emojiButton.texture = RES.getRes("emoji0_png");
            }
            else {
                this.emojiButton.texture = RES.getRes("emoji1_png");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameButton.prototype, "textEnabled", {
        get: function () {
            return this.txtButton.touchEnabled;
        },
        set: function (type) {
            this.txtButton.touchEnabled = type;
            if (type) {
                this.txtButton.texture = RES.getRes("text0_png");
            }
            else {
                this.txtButton.texture = RES.getRes("text1_png");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameButton.prototype, "speechEnabled", {
        get: function () {
            return this.speechButton.touchEnabled;
        },
        set: function (type) {
            this.speechClick = type;
            // this.speechButton.touchEnabled=type;
            if (type) {
                this.speechButton.texture = RES.getRes("speech0_png");
            }
            else {
                this.speechButton.texture = RES.getRes("speech1_png");
            }
        },
        enumerable: true,
        configurable: true
    });
    GameButton.prototype.operationButtonShowHide = function (data) {
        this.gangButton.visible = data.gang;
        this.pengButton.visible = data.peng;
        this.huButton.visible = data.hu;
        this.chiButton.visible = data.chi;
        this.guoButton.visible = true;
        var xi = 0;
        for (var i = 0; i < 5; i++) {
            if (this.button[i].visible) {
                this.button[i].x = GameData.stageWidth * (this.buuton_x[xi] / GameData.UIWidth);
                xi++;
            }
        }
    };
    GameButton.prototype.operationButtonHide = function () {
        this.guoButton.visible = this.gangButton.visible = this.pengButton.visible = this.huButton.visible = this.chiButton.visible = false;
    };
    GameButton.prototype.newsPlay = function () {
        this.soundButton.gotoAndPlay(1, 1);
    };
    //舞台大小
    GameButton.prototype.UILayout = function () {
        this.menuButton.scaleX = this.menuButton.scaleY = GameData.stageScale;
        this.soundButton.scaleX = this.soundButton.scaleY = GameData.stageScale;
        this.setButton.scaleX = this.setButton.scaleY = GameData.stageScale;
        this.soundButton.x = GameData.stageWidth * 0.79;
        this.setButton.x = GameData.stageWidth * 0.86;
        //
        this.txtButton.scaleX = this.txtButton.scaleY = GameData.stageScale;
        this.speechButton.scaleX = this.speechButton.scaleY = GameData.stageScale;
        this.emojiButton.scaleX = this.emojiButton.scaleY = GameData.stageScale;
        //
        this.speechButton.x = this.txtButton.x = GameData.stageWidth - 62 * GameData.stageScale;
        this.emojiButton.x = GameData.stageWidth - 62 * GameData.stageScale;
        this.txtButton.y = GameData.stageHeight * 0.58;
        this.speechButton.y = GameData.stageHeight * 0.68;
        this.emojiButton.y = GameData.stageHeight * 0.78;
        //
        this.guoButton.scaleX = this.guoButton.scaleY = GameData.stageScale;
        this.gangButton.scaleX = this.gangButton.scaleY = GameData.stageScale;
        this.pengButton.scaleX = this.pengButton.scaleY = GameData.stageScale;
        this.huButton.scaleX = this.huButton.scaleY = GameData.stageScale;
        this.chiButton.scaleX = this.chiButton.scaleY = GameData.stageScale;
        this.guoButton.scaleX = this.guoButton.scaleY = GameData.stageScale;
        var xi = 0;
        for (var i = 0; i < 5; i++) {
            if (this.button[i].visible) {
                this.button[i].x = GameData.stageWidth * (this.buuton_x[xi] / GameData.UIWidth);
                xi++;
            }
        }
        this.guoButton.y = this.gangButton.y = this.pengButton.y = this.huButton.y = this.chiButton.y = GameData.stageHeight * (516 / 720);
        //
        //
        this.menuList.scaleX = this.menuList.scaleY = GameData.stageScale;
        this.menuList.x = this.menuButton.x + 72 * GameData.stageScale;
        this.menuList.y = this.menuButton.y + 72 * GameData.stageScale / 2;
        //
        this.speechHint.scaleX = this.speechHint.scaleY = GameData.stageScale;
        this.speechHint.x = this.speechButton.x - (105 * GameData.stageScale) / 2;
        this.speechHint.y = this.speechButton.y - (135 * GameData.stageScale);
    };
    //移除自己的时候
    GameButton.prototype.removeThis = function (e) {
        this.txtButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.communicateClick, this);
        this.speechButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.communicateClick, this);
        this.emojiButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.communicateClick, this);
        //
        this.guoButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.operationClick, this);
        this.gangButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.operationClick, this);
        this.pengButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.operationClick, this);
        this.huButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.operationClick, this);
        this.chiButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.operationClick, this);
        //
        this.menuButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.systemClick, this);
        this.soundButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.systemClick, this);
        this.setButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.systemClick, this);
        //
        for (var i = 0; i < 4; i++) {
            this["button" + i].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.menuListClick, this);
        }
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
        console.log("移除按钮");
    };
    return GameButton;
}(eui.Component));
__reflect(GameButton.prototype, "GameButton");
//# sourceMappingURL=GameButton.js.map