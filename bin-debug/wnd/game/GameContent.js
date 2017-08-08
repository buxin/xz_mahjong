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
事件对象类型:
-------------

//公共属性
-----------
userCardsLoadComplete:boolean;//用户的牌是否加载完成，true为是（只读）
//公共方法
UILayout();//UI布局
-------------------
eatCardLisrShow(cid:number);//吃牌组合显示
----------
userSpeechStop();//停止用户的语音图标播放
---------
userSpeechPlay(tid:number);//设置用户的喇叭播放
-----------
gangCard();//计算自己是否有杆牌
--------
getUserData(place:number):any//获取用户信息
返回{"tid":ID,"nick":"昵称","headimg":"头像"}
//Socket数据调用方法
userRefresh(readRefresh:boolean);//刷新用户数据
readRefresh:是否刷新准备状态
---------
getTextEmoji(data:any)//获取用户的文本和表情发送
---------
setDiceBanker();//摇骰子显示庄家
----------
mendFlower(data:any);//补花
--------
userCountDown();//用户倒计时
----
outCard({"tid":1113,"cid":36,"his":true});//出牌显示
---------
addHistory({"tid":11213,"cid":28})//历史牌
----
drawCard({"tid":1121213,"cid":36})//摸牌
------
bumpCard({"tid":178,"ct":{"cards":[{"cid":18},{"cid":18},{"cid":18}],"type":0,"stid":884,"tcid":18})//玩家碰牌
----
earCard({"tid":3634,"ct":{"cards":[{"cid":23},{"cid":24},{"cid":25}],"tcid":25});//吃牌
-----
userLeave(tid:number,cdtime:number);//用户离线
------
backRoom(tid:number);//用户上线
---------
gameGidEnd({"type":2,"htids":[3226]});//胡牌
----
sendGift({"sid":10188,"tid":10185,"gid":4});//礼物
-----
userScore([{"tid":1112,"nick":"b","type":0,"wol":0},{"tid":111,"nick":"b","type":2,"wol":-2},{"tid":1165,"nick":"e","type":0,"wol":0},{"tid":3226,"nick":"c","type":1,"wol":2}]);//刷新用户积分
/////////////////////////////////////////////////////////////////////////////////////*/
var GameContent = (function (_super) {
    __extends(GameContent, _super);
    //
    function GameContent() {
        var _this = _super.call(this) || this;
        _this.userIcon = []; //用户头像对象
        _this.textEmoji = []; //用户对象表情
        //牌的容器
        _this.userHcards0 = new eui.Group();
        _this.userHcards1 = new eui.Group();
        _this.userHcards2 = new eui.Group();
        _this.userHcards3 = new eui.Group();
        _this.userHcards = [];
        //
        _this.jt = MyUtils.createMovieClipByName("jt");
        //
        _this.position = [];
        //
        _this.getUserCards = false; //是否桌面上有牌
        _this.currentUserNumber = 0; //当前坐下的玩家数量
        //显示玩家的牌
        _this.showActivationNumber = 0; //显示调用2次才能被激活
        //用户牌组
        _this.userCards = [null, null, null, null];
        //
        _this.eventCards = []; //事件牌组
        //显示其他玩家的牌
        _this.cards_xy = [{ x: 962, y: 35, w: 74, h: 0, sizeW: 74, sizeH: 111, add: -1 },
            { x: 92, y: -18, w: 0, h: 24, sizeW: 19, sizeH: 47, add: 1 },
            { x: 66, y: 45, w: 38, h: 0, sizeW: 40, sizeH: 59, add: 1 },
            { x: 46, y: 455, w: 0, h: 24, sizeW: 19, sizeH: 47, add: -1 }];
        _this.gamePlayer = true; //是否是游戏玩家，flash为观战
        //添加花牌
        _this.fcards_deploy = [{ texture: "c00", x: 289, y: -15, w: 40 - 5, h: 59 - 5, wx: 40 - 5, hy: 0, add: 1, n: 0, _w: 40, _h: 59 },
            { texture: "c1", x: 20, y: 285, w: 52 - 5, h: 44 - 5, wx: 0, hy: 29 - 5, add: -1, n: 0, _w: 52, _h: 44 },
            { texture: "c2", x: 548, y: 1, w: 40 - 5, h: 59 - 5, wx: 40 - 5, hy: 0, add: -1, n: 0, _w: 40, _h: 59 },
            { texture: "c3", x: 73, y: 72, w: 52 - 5, h: 44 - 5, wx: 0, hy: 29 - 5, add: 1, n: 0, _w: 52, _h: 44 }];
        //按照CID删除用户牌
        _this.removeAdd = [1, -1, -1, 1];
        //添加牌
        _this.addUserCardsObject = [null, null, null, null];
        _this.addUserCardsXY = [{ x: 1059, y: 35 }, { x: 92, y: -75 }, { x: 0, y: 45 }, { x: 46, y: 510 }];
        //
        _this.directionTid = []; //保存方向的TID
        //牌点击事件
        _this.currentSelectCards = null;
        _this.currentSelectCardsY = 0;
        _this.mouseY = 0;
        _this.doubleClickTimer = new egret.Timer(1000, 1);
        _this.doubleClickID = -1;
        _this.cardsClick = false;
        //出牌
        _this.outCardBG = MyUtils.createBitmapByName("bg2_png");
        _this.outCardBGXY = [{ x: 537, y: -102 }, { x: -87, y: 89 }, { x: 243, y: 119 }, { x: 149, y: 185 }];
        _this.outCardObject = new egret.Bitmap;
        _this.outCardObjectXY = [{ x: 562, y: -59 }, { x: 13.05 - 10, y: 129 }, { x: 211, y: 125 }, { x: 117.85, y: 206 }];
        //历史牌
        _this.historyXY = [{ n: 0, x: 357, y: -80, w: 40, h: -44, add: 1 },
            { n: 0, x: -35, y: 330, w: -52, h: 29, add: -1 },
            { n: 0, x: 430, y: 139, w: -40, h: 44, add: 1 },
            { n: 0, x: 122, y: 162, w: 52, h: 29, add: 1 }];
        _this.historyMax = 11;
        //吃牌
        _this.earProhibitCard = false;
        //添加吃，碰，杠牌data [{"cid":18},{"cid":18},{"cid":18}]
        _this.operationCardsXY = [{ w: 59, h: 88, xy: [{ x: 3, y: 0 }, { x: 59, y: 0 }, { x: 115, y: 0 }, { x: 59, y: -10 }] },
            { w: 52, h: 44, xy: [{ x: 0, y: 58 }, { x: 0, y: 28 }, { x: 0, y: 0 }, { x: 0, y: 15 }] },
            { w: 40, h: 59, xy: [{ x: 78, y: 0 }, { x: 39, y: 0 }, { x: 0, y: 0 }, { x: 39, y: -7 }] },
            { w: 52, h: 44, xy: [{ x: 0, y: 0 }, { x: 0, y: 29 }, { x: 0, y: 60 }, { x: 0, y: 19 }] }];
        _this.operationObjectXY = [{ n: 0, x: 20, y: 66, w: 194, h: 0, add: 1 },
            { n: 0, x: 80, y: 320, w: 0, h: 108 - 10, add: -1 },
            { n: 0, x: 502, y: 50, w: 131 - 10, h: 0, add: -1 },
            { n: 0, x: 24, y: 42, w: 0, h: 109 - 10, add: 1 }];
        _this.operationCardTexture = ["c00", "c1", "c2", "c3"];
        _this.arrowXY = [{ w: 59, h: 66, x: 1, y: 0 },
            { w: 52, h: 28, x: 0, y: 1 },
            { w: 40, h: 44, x: 1, y: 0 },
            { w: 52, h: 29, x: 0, y: 1 }
        ];
        _this.operationCardRotate = [[0, 0, 90, 0, -90, 0, 0, 180], [180, 0, 0, -90, 0, 0, 0, 90], [90, 180, -90, 0, 0, 0, 0, 0], [0, 90, 180, 0, 0, 0, 0, -90]];
        //吃碰杆胡动画
        _this.cardActionEffectXY = [{ x: 0.5, y: 0.7 }, { x: 0.8, y: 0.5 }, { x: 0.5, y: 0.2 }, { x: 0.2, y: 0.5 }];
        //吃牌
        _this.eatList = [];
        _this.eatListDara = [];
        _this.eatListClickEventCode = 0;
        //所有玩家的牌(胡牌或流局时推送，结算弹窗后面的)
        _this.player_xy = [{ w: 59, h: 0, add: -1 },
            { w: 0, h: 27, add: 1 },
            { w: 40, h: 0, add: 1 },
            { w: 0, h: 27, add: -1 }];
        _this.dctsList = [[], [], [], []]; //暗杠的牌
        //计算杆牌
        _this.gangList = [];
        _this.penObject = [];
        //玩家之间互动的提示信息
        _this.hintTimer = 0;
        _this.hintList = [[], [], [], []];
        _this.hintType = ["吃了", "", "", "碰了", "杠了", ""];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/gamecontent.exml";
        return _this;
    }
    GameContent.prototype.onComplete = function () {
        this.init();
    };
    GameContent.prototype.init = function () {
        this.animation.touchThrough = this.mahjong.touchThrough = true;
        this.effect.touchThrough = true;
        this.gift.touchThrough = true;
        this.hint.touchThrough = true;
        this.userHcards0.touchThrough = this.userHcards1.touchThrough = this.userHcards2.touchThrough = this.userHcards3.touchThrough = true;
        this.userDirection = new UserDirection();
        this.addChildAt(this.userDirection, 0);
        //
        //
        var userIcon;
        var textEmoji;
        for (var i = 0; i < GameData.userNumber; i++) {
            userIcon = new UserIcon(i);
            userIcon.emptyCode = i;
            userIcon.x = this["userPosition" + i].x;
            userIcon.y = this["userPosition" + i].y;
            this.addChildAt(userIcon, 0);
            this.userIcon.push(userIcon);
            userIcon.addEventListener(ButtonEvent.CLICK, this.userIconClick, this);
            //添加表情
            textEmoji = new TextEmoji(i);
            textEmoji.x = userIcon.x;
            textEmoji.y = userIcon.y;
            this.textEmoji.push(textEmoji);
            this.addChild(textEmoji);
            //
            userIcon = null;
            this.removeChild(this["userPosition" + i]);
        }
        this.speech = MyUtils.createMovieClipByName("lb2");
        this.speech.visible = false;
        this.userIcon[0].addChild(this.speech);
        //
        this.dicemc = MyUtils.createMovieClipByName("dicemc");
        this.animation.addChild(this.dicemc);
        //	this.dicemc.play(-1);
        this.dice1 = MyUtils.createMovieClipByName("dice");
        this.animation.addChild(this.dice1);
        //	this.dice1.play(-1);
        this.dice2 = MyUtils.createMovieClipByName("dice");
        this.animation.addChild(this.dice2);
        //	this.dice2.play(-1);
        this.dicemc.visible = this.dice1.visible = this.dice2.visible = this.userDirection.visible = false;
        //
        // this.userHcards0.addChild(MyUtils.createBitmapByName("ck0_png"));
        // this.userHcards1.addChild(MyUtils.createBitmapByName("ck1_png"));
        // this.userHcards2.addChild(MyUtils.createBitmapByName("ck2_png"));
        // this.userHcards3.addChild(MyUtils.createBitmapByName("ck3_png"));
        this.userHcards.push(this.userHcards0);
        this.userHcards.push(this.userHcards1);
        this.userHcards.push(this.userHcards2);
        this.userHcards.push(this.userHcards3);
        this.mahjong.addChild(this.userHcards[2]);
        this.mahjong.addChild(this.userHcards[1]);
        this.mahjong.addChild(this.userHcards[3]);
        this.mahjong.addChild(this.userHcards[0]);
        //	 this.userHcards=[,this.userHcards1,this.userHcards2,this.userHcards3]; 
        this.doubleClickTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.doubleClickTimerEnd, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
        //
        //this.dice=RES.getRes("dice_mp3");
    };
    GameContent.prototype.UILayout = function () {
        //计算用户投标位置
        this.position = [];
        //
        this.position.push({ x: 60 * GameData.stageScale, y: GameData.stageHeight * 0.65 });
        this.position.push({ x: GameData.stageWidth - 122 * GameData.stageScale, y: GameData.stageHeight * 0.25 });
        this.position.push({ x: 230 * GameData.stageScale, y: 89 * GameData.stageScale });
        this.position.push({ x: 32 * GameData.stageScale, y: GameData.stageHeight * 0.3 });
        //
        //
        for (var i = 0; i < GameData.userNumber; i++) {
            this.userIcon[i].scaleX = this.userIcon[i].scaleY = GameData.stageScale;
            this.textEmoji[i].scaleX = this.textEmoji[i].scaleY = GameData.stageScale;
            this.userIcon[i].x = this.position[i].x;
            this.userIcon[i].y = this.position[i].y;
            this.textEmoji[i].x = this.position[i].x;
            this.textEmoji[i].y = this.position[i].y;
        }
        //
        this.userDirection.scaleX = this.userDirection.scaleY = GameData.stageScale;
        this.userDirection.x = GameData.stageWidth * 0.46;
        this.userDirection.y = GameData.stageHeight * 0.41;
        //
        this.dicemc.scaleX = this.dicemc.scaleY = GameData.stageScale;
        this.dicemc.x = GameData.stageWidth * 0.43;
        this.dicemc.y = GameData.stageHeight * 0.40;
        //
        this.dice1.scaleX = this.dice1.scaleY = GameData.stageScale;
        this.dice1.x = GameData.stageWidth * 0.43;
        this.dice1.y = GameData.stageHeight * 0.47;
        this.dice2.scaleX = this.dice2.scaleY = GameData.stageScale;
        this.dice2.x = GameData.stageWidth * 0.52;
        this.dice2.y = GameData.stageHeight * 0.47;
        //
        this.userHcards0.scaleX = this.userHcards0.scaleY = GameData.stageScale;
        this.userHcards0.y = GameData.stageHeight - 159 * GameData.stageScale;
        //
        this.userHcards1.scaleX = this.userHcards1.scaleY = GameData.stageScale;
        this.userHcards1.x = GameData.stageWidth - 269 * GameData.stageScale;
        this.userHcards1.y = GameData.stageHeight * 0.23;
        //
        this.userHcards2.scaleX = this.userHcards2.scaleY = GameData.stageScale;
        this.userHcards2.x = 320 * GameData.stageScale;
        this.userHcards2.y = 59 * GameData.stageScale;
        //
        this.userHcards3.scaleX = this.userHcards3.scaleY = GameData.stageScale;
        this.userHcards3.x = 111 * GameData.stageScale;
        this.userHcards3.y = GameData.stageHeight * 0.05;
        //	this.animation.width=GameData.stageWidth;
        //	this.animation.height=GameData.stageHeight;
        //this.mahjong.width=GameData.stageWidth;
        //this.mahjong.height=GameData.stageHeight;
        this.hint.scaleX = this.hint.scaleY = GameData.stageScale;
        this.hint.y = 69 * GameData.stageScale;
    };
    //用户头像点击事件
    GameContent.prototype.userIconClick = function (e) {
        if (e.targetObject.tid == 0) {
            //currentSelectPlace
            if (e.targetObject.sitDownEnabled) {
                GameData.currentSelectPlace = e.targetObject.emptyCode;
                if (GameData.gotpPay) {
                    WndManager.root.main.spush.seated(GameData.currentSelectPlace);
                }
                else {
                    WndManager.root.main.alert.show("本游戏工具为收费软件，按游戏时间扣除钻石一经确定不予退还（若因未开局造成房间解散钻石将会全额返还），是否花费" + GameData.gotpGold + "钻石加入牌局?", [{ texture: "ok_png", code: 101 }, { texture: "no_png", code: 100 }]);
                }
            }
            else
                WndManager.root.main.spush.seated(e.targetObject.emptyCode);
        }
        else {
            //	WndManager.root.sh
            WndManager.root.gameWnd.userDatagiftShow(e.targetObject.place);
        }
    };
    //接收用户文本信息
    GameContent.prototype.getTextEmoji = function (data) {
        var type = data.idx.substr(0, 1);
        /*
       if(type=="3"){
           WndManager.root.gameWnd.userSoundPlay({tid:data.tid,sound:data.idx.substr(1)});
           return;
       }*/
        For: for (var i = 0; i < GameData.userNumber; i++) {
            if (this.userIcon[i].tid == data.tid) {
                var content = data.idx.substr(1);
                if (type == "0") {
                    this.textEmoji[i].setTextDialogue(content);
                }
                else if (type == "1") {
                    var sex = content.substr(0, 1);
                    content = content.substr(1);
                    this.textEmoji[i].setTextDialogue(GameData.userTextList[Number(content)].txt);
                    WndManager.root.main.userTextSoundPlay(sex, "speak" + GameData.userTextList[Number(content)].id);
                }
                else if (type == "2") {
                    var idx = Number(content.substr(0, 1));
                    content = content.substr(2);
                    //console.log(idx,content,GameData.userEmojiList[idx].animation+content);
                    this.textEmoji[i].addAnimation(GameData.emojiMcData[idx].generateMovieClipData(GameData.userEmojiList[idx].animation + content), -43, -46, 3000);
                }
                break For;
            }
        }
    };
    GameContent.prototype.userSpeechPlay = function (tid) {
        var look = true;
        for (var i = 0; i < GameData.userNumber; i++) {
            if (this.userIcon[i].tid == tid) {
                this.speech.stop();
                this.speech.visible = false;
                this.userIcon[i].speechPlay();
                look = false;
            }
            else
                this.userIcon[i].speechStop();
        }
        if (look) {
            this.speech.visible = true;
            this.speech.play(-1);
        }
    };
    GameContent.prototype.userSpeechStop = function () {
        for (var i = 0; i < GameData.userNumber; i++) {
            this.userIcon[i].speechStop();
        }
        this.speech.stop();
        this.speech.visible = false;
    };
    GameContent.prototype.userRefresh = function (readRefresh) {
        if (readRefresh === void 0) { readRefresh = true; }
        var players = [{ tid: 0 }, { tid: 0 }, { tid: 0 }, { tid: 0 }];
        var i = 0;
        var emptyCode = [0, 1, 2, 3];
        var sitDownEnabled = true;
        if (GameJudge.ownPartake) {
            sitDownEnabled = false;
            //按自己的位置排列数据
            var endI = 0;
            var place = 0;
            var add = false;
            for (i = 0; i < GameData.userNumber; i++) {
                if (GameData.plays[i].tid == GameData.tid) {
                    add = true;
                    GameData.head = GameData.plays[i].headimg;
                    GameData.nickname = GameData.plays[i].nick;
                    endI = i;
                }
                if (add) {
                    players[place] = GameData.plays[i];
                    emptyCode[place] = i;
                    place++;
                }
            }
            place = GameData.userNumber - 1;
            for (i = endI; i > 0; i--) {
                players[place] = GameData.plays[i - 1];
                emptyCode[place] = i - 1;
                place--;
            }
        }
        else {
            for (i = 0; i < GameData.userNumber; i++) {
                players[i] = GameData.plays[i];
            }
        }
        //显示数据
        //console.log("emptyCode:",emptyCode)
        var currentUserNumber = 0;
        for (i = 0; i < GameData.userNumber; i++) {
            this.userIcon[i].clear();
            this.userIcon[i].emptyCode = emptyCode[i];
            this.userIcon[i].sitDownEnabled = sitDownEnabled;
            if (players[i].tid == 0) {
                this.userIcon[i].read = false;
                this.userIcon[i].leave = 0;
            }
            else {
                currentUserNumber++;
                this.userIcon[i].tid = players[i].tid;
                this.userIcon[i].sex = GameData.sexList[players[i].sex];
                this.userIcon[i].nameTxt.text = players[i].nick;
                this.userIcon[i].head = players[i].headimg;
                if (GameData.rstate == 1) {
                    this.userIcon[i].read = true;
                }
                else if (GameData.rstate == 3) {
                    if (readRefresh)
                        this.userIcon[i].read = players[i].ready;
                }
                else {
                    this.userIcon[i].read = false;
                }
            }
        }
        if (GameData.rstate == 3 && currentUserNumber > this.currentUserNumber) {
            this.deleteGameData();
        }
        this.currentUserNumber = currentUserNumber;
    };
    //游戏准备按钮
    GameContent.prototype.gameReady = function (data) {
        for (var i = 0; i < GameData.userNumber; i++) {
            For: if (this.userIcon[i].tid == data.tid) {
                this.userIcon[i].read = data.ready;
                break For;
            }
        }
    };
    //
    GameContent.prototype.setDiceBanker = function () {
        var _this = this;
        this.deleteGameData();
        for (var i = 0; i < GameData.userNumber; i++) {
            this.userIcon[i].read = false;
        }
        this.dicemc.visible = this.dice1.visible = this.dice2.visible = this.userDirection.visible = false;
        this.dicemc.visible = true;
        this.dicemc.gotoAndPlay(0, 1);
        egret.setTimeout(function () {
            _this.dicemc.visible = false;
            _this.dice1.gotoAndStop(GameData.dice1);
            _this.dice2.gotoAndStop(GameData.dice2);
            _this.dice1.visible = _this.dice2.visible = true;
            _this.bankerShow();
        }, this, 1200);
        egret.setTimeout(function () {
            _this.dicemc.visible = _this.dice1.visible = _this.dice2.visible = _this.userDirection.visible = false;
            _this.userDirection.visible = true;
            _this.userDirection.timerPlay(10);
            _this.userDirection.bnumsTxt.text = "剩" + GameData.bnums;
            _this.roomCards();
        }, this, 2000);
        WndManager.root.main.soundGamePlay("dice");
    };
    //
    GameContent.prototype.bankerShow = function () {
        for (var i = 0; i < GameData.userNumber; i++) {
            //   this.userIcon[i].read=false;
            this.userIcon[i].banker = false;
            if (this.userIcon[i].tid == GameData.banker) {
                this.userIcon[i].banker = true;
                this.userDirection.eastPlace = i;
                this.directionTid = [this.userIcon[i].tid];
                for (var c = (i + 1); c < GameData.userNumber; c++) {
                    this.directionTid.push(this.userIcon[c].tid);
                }
                for (c = 0; c < i; c++) {
                    this.directionTid.push(this.userIcon[c].tid);
                }
                this.userCountDown();
            }
        }
    };
    Object.defineProperty(GameContent.prototype, "userCardsLoadComplete", {
        get: function () {
            return this.getUserCards;
        },
        enumerable: true,
        configurable: true
    });
    GameContent.prototype.roomCards = function () {
        GameData.endButtonClick = false;
        var l = GameData.hcards.length;
        var i = 0;
        //
        if (GameData.plays.length == 0) {
            for (i = 0; i < l; i++) {
                GameData.plays = GameData.hcards;
                this.userRefresh();
            }
            this.showActivationNumber = 1;
            this.bankerShow();
            this.dicemc.visible = this.dice1.visible = this.dice2.visible = this.userDirection.visible = false;
            this.userDirection.visible = true;
            this.userDirection.timerPlay(10);
            this.userDirection.bnumsTxt.text = "剩" + GameData.bnums;
        }
        //
        this.showActivationNumber++;
        if (this.showActivationNumber == 2) {
            //显示手里的牌
            //  console.log("显示牌")
            GameData.outCardCid = -1;
            this.gamePlayer = this.userIcon[0].tid == GameData.tid;
            //
            for (i = 0; i < GameData.userNumber; i++) {
                For: for (var t = 0; t < l; t++) {
                    //   console.log(GameData.hcards[t].tid==this.userIcon[i].tid);
                    if (GameData.hcards[t].tid == this.userIcon[i].tid) {
                        this.userIcon[i].score = GameData.hcards[t].score;
                        this.cardsShow(GameData.hcards[t], i);
                        break For;
                    }
                }
            }
            //
            this.getUserCards = true;
            //判断桌面是否有用户出牌
            if (GameData.oc > 0) {
                this.outCard({ tid: GameData.actid, cid: GameData.oc, his: false }, false);
            }
            this.addEarPronhibitCard(GameData.tid, GameData.nouts);
        }
    };
    GameContent.prototype.cardsShow = function (data, place) {
        console.log("显示", place);
        var userCards = [];
        var l = data.hcards.length;
        for (var i = 0; i < l; i++) {
            var cards = new Cards();
            cards.texture = RES.getRes("c" + place + "_" + data.hcards[i].cid);
            console.log("c" + place + "_" + data.hcards[i].cid, place);
            cards.cid = data.hcards[i].cid;
            // cards.width=this.cards_xy[place].sizeW;
            // cards.height=this.cards_xy[place].sizeH;
            userCards.push(cards);
            this.userHcards[place].addChild(cards);
            cards = null;
        }
        this.userCards[place] = userCards;
        this.sortCards(place);
        //
        if (place == 0 && this.gamePlayer) {
            this.eventCards = [];
            l = this.userCards[0].length;
            for (i = 0; i < l; i++) {
                this.eventCards.push(this.userCards[0][i]);
                this.eventCards[i].touchEnabled = true;
                this.eventCards[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.cardsBegin, this);
            }
        }
        //断线重连，添加提示牌
        //添加历史牌
        l = data.ocards.length;
        for (i = 0; i < l; i++) {
            this.addHistoryObject([data.ocards[i].cid], place);
        }
        //添加花牌
        this.addFcards(data.fcards, place, false);
        this.textEmoji[place].zhnum = data.zhnum;
        this.textEmoji[place].yhnum = data.yhnum;
        //添加吃碰杠
        l = data.scts.length;
        var cardsData = [];
        for (i = 0; i < l; i++) {
            if (data.scts[i].cards.length == 4) {
                cardsData = [{ cid: data.scts[i].cards[0].cid }, { cid: data.scts[i].cards[1].cid }, { cid: data.scts[i].cards[2].cid }, { cid: data.scts[i].cards[3].cid }];
                this.addOperationCardObject(cardsData, place, -9, data.scts[i].stid, false);
            }
            else {
                cardsData = [{ cid: data.scts[i].cards[0].cid }, { cid: data.scts[i].cards[1].cid }, { cid: data.scts[i].cards[2].cid }];
                if (data.scts[i].cards[0].cid == data.scts[i].cards[1].cid) {
                    this.addOperationCardObject(cardsData, place, -9, data.scts[i].stid, false);
                }
                else {
                    this.addOperationCardObject(cardsData, place, data.scts[i].tcid, data.scts[i].stid, false);
                }
            }
        }
        //暗杠
        l = data.dcts.length;
        cardsData = [];
        for (i = 0; i < l; i++) {
            cardsData = [{ cid: data.dcts[i].cards[0].cid }, { cid: data.dcts[i].cards[1].cid }, { cid: data.dcts[i].cards[2].cid }, { cid: data.dcts[i].cards[3].cid }];
            this.addOperationCardObject(cardsData, place, -9, data.dcts[i].stid, false);
        }
        //设置时间
        this.userCountDown();
        //把最后一张牌挪到最后
        if (GameData.act == 0 && GameData.c != -1) {
            if (this.userIcon[place].tid == GameData.actid) {
                if (place == 0 && this.gamePlayer) {
                    // GameData.outCardCid=GameData.c;
                    this.cardsClick = true; //可以出牌
                    this.removeUserCards_Cid([GameData.c], place);
                    this.addUserCards(GameData.c, place);
                }
                else {
                    this.removeUserCards_Cid([0], place);
                    this.addUserCards(0, place);
                }
            }
        }
        //用户是否离线
        if (data.online == false) {
            this.userIcon[place].leave = data.cdtime;
        }
        //箭头隐藏
        this.jt.visible = false;
        //
    };
    //
    GameContent.prototype.sortCid = function (a, b) {
        var v0 = a.cid;
        var v1 = b.cid;
        if (v0 >= v1) {
            return -1;
        }
        else {
            return 1;
        }
    };
    //补花
    GameContent.prototype.mendFlower = function (data) {
        this.userDirection.bnumsTxt.text = "剩" + GameData.bnums;
        if (data.last == 0) {
            data.last = 2;
            egret.setTimeout(this.mendFlower, this, 3000, data);
        }
        else {
            //
            For: for (var i = 0; i < GameData.userNumber; i++) {
                if (data.tid == this.userIcon[i].tid) {
                    this.textEmoji[i].zhnum = data.zhnum;
                    this.textEmoji[i].yhnum = data.yhnum;
                    this.addFcards(data.fcards, i);
                    //添加牌  
                    var l = data.mcards.length;
                    for (var a = 0; a < l; a++) {
                        this.addUserCards(data.mcards[a].cid, i);
                    }
                    if (this.userIcon[i].banker == false && data.last == 2) {
                        this.sortCards(i);
                    }
                    WndManager.root.main.soundPlay(this.userIcon[i].sex, "bf");
                    break For;
                }
            }
        }
    };
    GameContent.prototype.addFcards = function (data, place, removeCrads) {
        if (removeCrads === void 0) { removeCrads = true; }
        var l = data.length;
        var num = 0;
        var addNum = 0;
        var remove = [];
        if (place == 3) {
            num = this.userHcards[place].numChildren;
            addNum = 1;
        }
        console.log("补花data", data);
        for (var i = 0; i < l; i++) {
            var cards = new Cards();
            cards.texture = RES.getRes(this.fcards_deploy[place].texture + "_" + data[i].cid);
            if (removeCrads) {
                if (place == 0 && this.gamePlayer) {
                    remove.push(data[i].cid);
                }
                else
                    remove.push(0);
            }
            cards.smoothing = true;
            cards.width = this.fcards_deploy[place].w;
            cards.height = this.fcards_deploy[place].h;
            // cards.x=this.fcards_deploy[place].x+(this.fcards_deploy[place].add*(this.fcards_deploy[place].n*this.fcards_deploy[place].wx));
            //cards.y=this.fcards_deploy[place].y+(this.fcards_deploy[place].add*(this.fcards_deploy[place].n*this.fcards_deploy[place].hy));
            cards.x = this.fcards_deploy[place].x + (this.fcards_deploy[place].add * (this.fcards_deploy[place].n * this.fcards_deploy[place].wx));
            cards.y = this.fcards_deploy[place].y + (this.fcards_deploy[place].add * (this.fcards_deploy[place].n * this.fcards_deploy[place].hy));
            cards.cid = data.cid;
            this.userHcards[place].addChildAt(cards, num);
            num += addNum;
            this.fcards_deploy[place].n++;
            cards = null;
        }
        this.removeUserCards_Cid(remove, place);
    };
    GameContent.prototype.removeUserCards_Cid = function (data, place) {
        //   console.log("删除：",data,place);
        var r = data.length;
        var l;
        for (var t = 0; t < r; t++) {
            l = this.userCards[place].length;
            For: for (var i = 0; i < l; i++) {
                if (data[t] == this.userCards[place][i].cid) {
                    //  console.log("删除：cid:",this.userCards[place][i].cid,i)
                    this.userHcards[place].removeChild(this.userCards[place][i]);
                    this.userCards[place][i] = null;
                    this.userCards[place].splice(i, 1);
                    break For;
                }
            }
        }
        if (r > 0)
            this.sortCards(place);
    };
    GameContent.prototype.addUserCards = function (cid, place) {
        //  for(var i=0;i<l;i++){
        if (this.addUserCardsObject[place] != null) {
            this.sortCards(place);
        }
        var cards = new Cards();
        cards.texture = RES.getRes("c" + place + "_" + cid);
        cards.x = this.addUserCardsXY[place].x;
        cards.y = this.addUserCardsXY[place].y;
        cards.cid = cid;
        this.userHcards[place].addChildAt(cards, 0);
        this.userCards[place].push(cards);
        this.addUserCardsObject[place] = cards;
        if (place == 0 && this.gamePlayer) {
            this.eventCards.push(cards);
            cards.touchEnabled = true;
            cards.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.cardsBegin, this);
        }
        cards = null;
        //}
    };
    //重新排序用户的牌
    GameContent.prototype.sortCards = function (place) {
        //按照CID排序
        this.userCards[place].sort(this.sortCid);
        var l = this.userCards[place].length;
        var num = this.userHcards[place].numChildren;
        //var addNum:number=0;
        if (place == 3)
            num = 0;
        for (var i = 0; i < l; i++) {
            this.userCards[place][i].x = this.cards_xy[place].x + this.cards_xy[place].add * (i * this.cards_xy[place].w);
            this.userCards[place][i].y = this.cards_xy[place].y + this.cards_xy[place].add * (i * this.cards_xy[place].h);
            this.userHcards[place].setChildIndex(this.userCards[place][i], num);
        }
        //  
    };
    //时间
    GameContent.prototype.timers = function () {
        this.userDirection.timer();
        if (this.hintTimer > 0) {
            this.hintTimer--;
            if (this.hintTimer == 0) {
                this.hint.visible = false;
            }
        }
        for (var i = 0; i < GameData.userNumber; i++) {
            this.userIcon[i].timers();
        }
    };
    GameContent.prototype.userCountDown = function () {
        this.cardsClick = true;
        var l = this.directionTid.length;
        // console.log("方向ID:"+this.directionTid)
        For: for (var i = 0; i < l; i++) {
            if (this.directionTid[i] == GameData.timerTid) {
                this.userDirection.direction = (i + 1);
                break For;
            }
        }
    };
    GameContent.prototype.cardsBegin = function (e) {
        // console.log("点击",GameData.timerTid,GameData.tid,this.userDirection.visible,this.cardsClick);
        if (GameData.timerTid == GameData.tid && this.userDirection.visible && this.cardsClick) {
            if (this.currentSelectCards != null)
                this.removeCards();
            this.currentSelectCards = e.currentTarget;
            this.currentSelectCardsY = this.currentSelectCards.y;
            this.mouseY = e.stageY;
            this.outCardShow(e.currentTarget.cid, 0);
            if (this.doubleClickID == e.currentTarget.id) {
                // console.log("出牌:"+this.currentSelectCards.cid);
                WndManager.root.main.spush.outCard(this.currentSelectCards.cid);
                this.currentSelectCards = null;
                this.cardsClick = false;
                return;
            }
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.cardsEnd, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.cardsMove, this);
            this.doubleClickID = e.currentTarget.id;
            this.doubleClickTimer.reset();
            this.doubleClickTimer.start();
        }
    };
    GameContent.prototype.cardsMove = function (e) {
        this.currentSelectCards.y = this.currentSelectCardsY + (e.stageY - this.mouseY);
    };
    GameContent.prototype.cardsEnd = function (e) {
        this.removeCards();
    };
    GameContent.prototype.removeCards = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.cardsEnd, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.cardsMove, this);
        if (this.currentSelectCards.y < this.cards_xy[0].y - 80) {
            //	console.log("出牌:"+this.currentSelectCards.cid);
            WndManager.root.main.spush.outCard(this.currentSelectCards.cid);
            this.currentSelectCards = null;
            this.cardsClick = false;
            return;
        }
        this.currentSelectCards.y = this.cards_xy[0].y;
        this.currentSelectCards = null;
    };
    GameContent.prototype.doubleClickTimerEnd = function (e) {
        this.doubleClickID = -1;
    };
    //注销数据 (销毁 删除游戏桌面上的数据)
    GameContent.prototype.deleteGameData = function () {
        GameData.outCardCid = -1;
        this.getUserCards = false;
        this.effect.removeChildren();
        this.showActivationNumber = 0;
        this.removeEatList();
        var l = this.eventCards.length;
        for (var i = 0; i < l; i++) {
            this.eventCards[i].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.cardsBegin, this);
            this.eventCards[i] = null;
        }
        this.eventCards = [];
        this.userDirection.visible = false;
        for (i = 0; i < GameData.userNumber; i++) {
            this.textEmoji[i].yhnum = 0;
            this.textEmoji[i].zhnum = 0;
            this.userHcards[i].removeChildren();
            this.historyXY[i].n = 0;
            this.operationObjectXY[i].n = 0;
            this.fcards_deploy[i].n = 0;
        }
        this.directionTid = [];
        this.userCards = [null, null, null, null];
        this.effect.removeChildren();
        this.gangList = [];
        this.penObject = [];
        this.hintTimer = 0;
        this.hint.visible = false;
        this.hintList = [[], [], [], []];
        this.dctsList = [[], [], [], []];
        //  this.cardsClick=false;
    };
    GameContent.prototype.outCard = function (data, removeCards) {
        if (removeCards === void 0) { removeCards = true; }
        this.earProhibitCardCancel();
        //console.log("出牌",data.tid);
        GameData.outCardCid = data.cid;
        if (data.his == false)
            this.userDirection.lightHide();
        For: for (var i = 0; i < GameData.userNumber; i++) {
            if (this.userIcon[i].tid == data.tid) {
                if (data.his == false) {
                    this.outCardShow(data.cid, i);
                }
                if (removeCards) {
                    if (i == 0 && this.gamePlayer) {
                        this.removeUserCards_Cid([data.cid], i);
                    }
                    else
                        this.removeUserCards_Cid([0], i);
                    WndManager.root.main.soundPlay(this.userIcon[i].sex, data.cid);
                    WndManager.root.main.soundGamePlay("pai");
                }
                break For;
            }
        }
    };
    GameContent.prototype.outCardShow = function (cid, place) {
        this.outCardBG.visible = true;
        this.outCardBG.x = this.outCardBGXY[place].x;
        this.outCardBG.y = this.outCardBGXY[place].y;
        this.userHcards[place].addChild(this.outCardBG);
        this.outCardObject.texture = RES.getRes("c00_" + cid);
        this.outCardObject.x = this.outCardBGXY[place].x + 6;
        this.outCardObject.y = this.outCardBGXY[place].y + 6;
        this.outCardObject.visible = true;
        this.userHcards[place].addChild(this.outCardObject);
    };
    GameContent.prototype.addHistory = function (data) {
        GameData.outCardCid = -1;
        this.removeEatList();
        this.outCardObject.visible = this.outCardBG.visible = false;
        For: for (var i = 0; i < GameData.userNumber; i++) {
            if (this.userIcon[i].tid == data.tid) {
                //   console.log("放入历史")
                this.addHistoryObject([data.cid], i);
                WndManager.root.main.soundGamePlay("pai");
                break For;
            }
        }
    };
    GameContent.prototype.addHistoryObject = function (cid, place) {
        var cidl = cid.length;
        var num = 0;
        var addNum = 0;
        var y = 0;
        var x = 0;
        if (place > 1) {
            num = this.userHcards[place].numChildren;
            addNum = 1;
        }
        for (var i = 0; i < cidl; i++) {
            this.historyXY[place].n++;
            y = Math.max(Math.ceil(this.historyXY[place].n / this.historyMax) - 1, 0);
            x = this.historyXY[place].n - (y * this.historyMax);
            var cards = new Cards();
            cards.texture = RES.getRes(this.fcards_deploy[place].texture + "_" + cid[i]);
            if (place == 0 || place == 2) {
                cards.x = this.historyXY[place].x + (x - 1) * (this.historyXY[place].add * this.historyXY[place].w);
                cards.y = this.historyXY[place].y + y * this.historyXY[place].h;
            }
            else {
                cards.x = this.historyXY[place].x + y * this.historyXY[place].w;
                cards.y = this.historyXY[place].y + (x - 1) * (this.historyXY[place].add * this.historyXY[place].h);
            }
            cards.width = this.fcards_deploy[place]._w;
            cards.height = this.fcards_deploy[place]._h;
            this.userHcards[place].addChildAt(cards, num);
            num + addNum;
            this.userHcards[place].addChild(this.jt);
            this.jt.visible = true;
            this.jt.x = cards.x + cards.width / 2;
            this.jt.y = cards.y + cards.height / 2;
            this.jt.play(-1);
            cards = null;
        }
    };
    //摸牌
    GameContent.prototype.drawCard = function (data) {
        //  GameData.outCardCid=-1;
        this.userDirection.bnumsTxt.text = "剩" + GameData.bnums;
        For: for (var i = 0; i < GameData.userNumber; i++) {
            if (this.userIcon[i].tid == data.tid) {
                //  console.log("摸牌")
                this.addUserCards(data.cid, i);
                break For;
            }
        }
    };
    //碰牌
    GameContent.prototype.bumpCard = function (data) {
        this.removeEatList();
        this.outCardObject.visible = this.outCardBG.visible = false;
        For: for (var i = 0; i < GameData.userNumber; i++) {
            if (this.userIcon[i].tid == data.tid) {
                this.addOperationCardObject(data.ct.cards, i, -9, data.ct.stid);
                if (data.ct.cards.length == 4) {
                    this.addCardActionEffect(i, "gandh", this.userIcon[i].sex, "gang");
                }
                else {
                    this.addCardActionEffect(i, "pengdh", this.userIcon[i].sex, "peng");
                    this.addEarPronhibitCard(data.tid, [data.ct.cards[0].cid]);
                }
                //this.removeUserCards_Cid([data.cid],i);
                break For;
            }
        }
    };
    GameContent.prototype.earCard = function (data) {
        this.removeEatList();
        this.outCardObject.visible = this.outCardBG.visible = false;
        For: for (var i = 0; i < GameData.userNumber; i++) {
            if (this.userIcon[i].tid == data.tid) {
                this.addOperationCardObject(data.ct.cards, i, data.ct.tcid, data.ct.stid);
                this.addCardActionEffect(i, "chidh", this.userIcon[i].sex, "chi");
                //this.removeUserCards_Cid([data.cid],i);
                break For;
            }
        }
        //设置禁止出的牌
        this.addEarPronhibitCard(data.tid, data.nouts);
    };
    GameContent.prototype.addEarPronhibitCard = function (tid, nouts) {
        var nl = nouts.length;
        if (nl > 0) {
            if (this.userIcon[0].tid == tid && this.gamePlayer) {
                var l = this.userCards[0].length;
                for (var i = 0; i < nl; i++) {
                    //	console.log("i",i)
                    this.earProhibitCard = true;
                    for (var t = 0; t < l; t++) {
                        //  console.log("t",this.userCards[0][t].cid,data.nouts[i]);
                        if (this.userCards[0][t].cid == nouts[i]) {
                            this.userCards[0][t].texture = RES.getRes("black_c0_" + this.userCards[0][t].cid);
                            this.userCards[0][t].touchEnabled = false;
                        }
                    }
                }
            }
        }
    };
    //取消不能出的牌
    GameContent.prototype.earProhibitCardCancel = function () {
        if (this.earProhibitCard) {
            var l = this.userCards[0].length;
            for (var t = 0; t < l; t++) {
                this.userCards[0][t].texture = RES.getRes("c0_" + this.userCards[0][t].cid);
                this.userCards[0][t].touchEnabled = true;
            }
        }
        this.earProhibitCard = false;
    };
    GameContent.prototype.addOperationCardObject = function (data, place, chiCid, stid, removeCards) {
        if (removeCards === void 0) { removeCards = true; }
        GameData.outCardCid = -1;
        var l = data.length;
        // console.log("添加组合:"+l,data,place,chiCid);
        var object = new egret.Sprite();
        var remove = []; //要从手上删除的牌
        var maskBg;
        var texture;
        var bg = data[0].cid == 0;
        var cardsjtX = this.arrowXY[place].w / 2 + (1 * (this.arrowXY[place].w * this.arrowXY[place].x));
        var cardsjtY = this.arrowXY[place].h / 2 + (1 * (this.arrowXY[place].h * this.arrowXY[place].y));
        var userName = "";
        var sex = "";
        var type = l;
        var addHist = true;
        //	var at:number=0;
        for (var i = 0; i < l; i++) {
            var cards = new Cards();
            if (bg) {
                texture = this.operationCardTexture[place] + "_" + "b";
            }
            else
                texture = this.operationCardTexture[place] + "_" + data[i].cid;
            cards.texture = RES.getRes(texture);
            cards.width = this.operationCardsXY[place].w;
            cards.height = this.operationCardsXY[place].h;
            cards.smoothing = true;
            cards.x = this.operationCardsXY[place].xy[i].x;
            cards.y = this.operationCardsXY[place].xy[i].y;
            object.addChild(cards);
            if (chiCid == data[i].cid) {
                type = 0;
                cards.texture = RES.getRes("black_" + texture);
                cardsjtX = cards.x + this.arrowXY[place].w / 2;
                cardsjtY = cards.y + this.arrowXY[place].h / 2;
            }
            else {
                if (removeCards) {
                    if (place == 0 && this.gamePlayer) {
                        remove.push(data[i].cid);
                    }
                    else
                        remove.push(0);
                }
            }
            cards = null;
        }
        if (place == 1) {
            object.setChildIndex(object.getChildAt(1), 0);
            object.setChildIndex(object.getChildAt(2), 0);
        }
        object.x = this.operationObjectXY[place].x + this.operationObjectXY[place].n * (this.operationObjectXY[place].add * this.operationObjectXY[place].w);
        object.y = this.operationObjectXY[place].y + this.operationObjectXY[place].n * (this.operationObjectXY[place].add * this.operationObjectXY[place].h);
        this.userHcards[place].addChild(object);
        object.scaleX = object.scaleY = 0.9;
        object.cacheAsBitmap = true;
        this.operationObjectXY[place].n++;
        //添加牌的吃碰杆方向箭头
        var r = 0;
        For: for (i = 0; i < GameData.userNumber; i++) {
            if (this.userIcon[i].tid == stid) {
                r = i;
                userName = this.userIcon[i].nameTxt.text;
                sex = this.userIcon[i].sex;
                break For;
            }
        }
        if (r == place) {
            r = 700;
            addHist = false;
        }
        else {
            r = place - r;
            r = Math.abs(r + -1);
            var cardsjt = MyUtils.createBitmapByName("cardsjt_png");
            cardsjt.anchorOffsetX = 19;
            cardsjt.anchorOffsetY = 16;
            cardsjt.x = cardsjtX;
            cardsjt.y = cardsjtY;
            cardsjt.rotation = this.operationCardRotate[place][r];
            object.addChild(cardsjt);
            cardsjt = null;
        }
        //
        this.userHcards[place].addChild(this.jt);
        this.jt.visible = true;
        this.jt.x = object.x + object.width / 2;
        this.jt.y = object.y + object.height / 2;
        this.jt.play(-1);
        //
        //如果是自己的吃碰杆
        object.name = "i0";
        if (l == 3 && chiCid == -9) {
            if (removeCards)
                remove.splice(0, 1);
            if (place == 0)
                this.gangList.push(data[0].cid); //如果是自己碰的，就添加到计算杆里
            object.name = "i" + data[0].cid;
            this.penObject.push(object);
        }
        else if (l == 4) {
            if (bg) {
                this.dctsList[place].push(object);
            }
            if (removeCards) {
                // if(r!=700){//如果不是自己杆自己的牌
                // remove.splice(0,1);
                //}
                //如果杆的这张牌之前有碰的话
                var penl = this.penObject.length;
                for (var v = 0; v < penl; v++) {
                    if (Number(this.penObject[v].name.substr(1)) == data[0].cid) {
                        addHist = false;
                        object.x = this.penObject[v].x;
                        object.y = this.penObject[v].y;
                        this.jt.x = object.x + object.width / 2;
                        this.jt.y = object.y + object.height / 2;
                        this.operationObjectXY[place].n--;
                        if (place != 0)
                            remove = [0]; //如果不是自己就只删除一个牌
                        if (this.gamePlayer == false)
                            remove = [0]; //如果自己没玩也只删除一个牌
                    }
                }
            }
        }
        object = null;
        this.removeUserCards_Cid(remove, place);
        //
        if (addHist) {
            this.hintList[place].push({ name: userName, stid: stid, type: type, sex: sex });
            if (removeCards)
                this.setHint(place, stid, type);
        }
    };
    //private cardEffectSound:string[]=["chi","peng","gang"]
    GameContent.prototype.addCardActionEffect = function (place, texture, sex, sound, removeMc) {
        if (removeMc === void 0) { removeMc = true; }
        //
        if (removeMc)
            this.effect.removeChildren();
        //console.log(this.effect.numChildren,"动画对象");
        var mc = MyUtils.createMovieClipByName(texture);
        mc.x = GameData.stageWidth * this.cardActionEffectXY[place].x;
        mc.y = GameData.stageHeight * this.cardActionEffectXY[place].y;
        mc.scaleX = mc.scaleY = GameData.stageScale;
        this.effect.addChild(mc);
        mc.gotoAndPlay(0, 1);
        mc.frameRate = 20;
        mc = null;
        WndManager.root.main.soundPlay(sex, sound);
        //if(texture="")
        //
    };
    GameContent.prototype.eatCardLisrShow = function (cid) {
        this.removeEatList();
        this.eatListDara = [];
        var type = Math.floor(cid / 10); //0是万  1是锁 2是筒 
        var l = this.userCards[0].length;
        var listCid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var cidType = 0;
        var showListData = [];
        var cidI = cid - type * 10;
        //
        for (var i = 0; i < l; i++) {
            cidType = Math.floor(this.userCards[0][i].cid / 10);
            if (cidType == type) {
                listCid[this.userCards[0][i].cid - type * 10] += 1; //添加到算牌数字里
            }
        }
        //开始算吃
        //判断后面能否组成顺子 
        // console.log("要算的牌：",listCid)
        if (listCid[cidI + 1] != 0 && listCid[cidI + 2] != 0) {
            // console.log("后:",cidI)
            this.eatListDara.push({ tcid: cid, ocid1: type * 10 + (cidI + 1), ocid2: type * 10 + (cidI + 2) });
            showListData.push({ tcid: cid, ocid1: type * 10 + (cidI + 1), ocid2: type * 10 + (cidI + 2), place: 0 });
        }
        //判断是否是中间顺子
        if (cidI != 1) {
            if (listCid[cidI - 1] != 0 && listCid[cidI + 1] != 0) {
                //console.log("中",cidI)
                this.eatListDara.push({ tcid: cid, ocid1: type * 10 + (cidI - 1), ocid2: type * 10 + (cidI + 1) });
                showListData.push({ tcid: type * 10 + (cidI - 1), ocid1: cid, ocid2: type * 10 + (cidI + 1), place: 1 });
            }
        }
        //判断是否是前顺子
        if (cidI > 2) {
            if (listCid[cidI - 1] != 0 && listCid[cidI - 2] != 0) {
                // console.log("前",cidI)
                this.eatListDara.push({ tcid: cid, ocid1: type * 10 + (cidI - 1), ocid2: type * 10 + (cidI - 2) });
                showListData.push({ tcid: type * 10 + (cidI - 2), ocid1: type * 10 + (cidI - 1), ocid2: cid, place: 2 });
            }
        }
        //
        //   console.log("组合牌",this.eatListDara);
        var l = this.eatListDara.length;
        //如果只有一组牌直接发送吃
        if (l == 1) {
            WndManager.root.main.spush.eatCard(this.eatListDara[0].tcid, this.eatListDara[0].ocid1, this.eatListDara[0].ocid2);
            return;
        }
        //添加界面
        var eatList;
        var bim;
        for (i = 0; i < l; i++) {
            eatList = new EatList();
            eatList.x = 586 - (l * 213) / 2 + i * 213;
            eatList.y = -76;
            this.userHcards[0].addChild(eatList);
            this.eatList.push(eatList);
            eatList.name = "i" + i;
            //
            bim = new egret.Bitmap(RES.getRes("c00_" + showListData[i].tcid));
            bim.width = 65;
            bim.height = 97;
            bim.x = 12;
            bim.y = 8;
            eatList.addChild(bim);
            bim = null;
            bim = new egret.Bitmap(RES.getRes("c00_" + showListData[i].ocid1));
            bim.width = 65;
            bim.height = 97;
            bim.x = 12 + 62;
            bim.y = 8;
            eatList.addChild(bim);
            bim = null;
            bim = new egret.Bitmap(RES.getRes("c00_" + showListData[i].ocid2));
            bim.width = 65;
            bim.height = 97;
            bim.x = 12 + 62 * 2;
            bim.y = 8;
            eatList.addChild(bim);
            bim = null;
            var maskBg = new egret.Shape();
            maskBg.graphics.beginFill(0, 0.5);
            maskBg.graphics.drawRoundRect(0, 0, 65, 97, 3);
            maskBg.graphics.endFill();
            eatList.addChild(maskBg);
            maskBg.y = 8;
            maskBg.x = 12 + showListData[i].place * 62;
            maskBg = null;
            this.eatListClickEventCode = 0;
            eatList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.eatListClick, this);
            eatList.touchEnabled = true;
            eatList.bg.width = 213;
            eatList.bg.height = 112;
            //
            eatList = null;
        }
        //
        showListData = null;
    };
    GameContent.prototype.eatListClick = function (e) {
        //console.log("121212");
        var i = Number(e.currentTarget.name.substr(1));
        if (this.eatListClickEventCode == 0) {
            WndManager.root.main.spush.eatCard(this.eatListDara[i].tcid, this.eatListDara[i].ocid1, this.eatListDara[i].ocid2);
        }
        else {
            WndManager.root.main.spush.barCard(i);
        }
    };
    GameContent.prototype.removeEatList = function () {
        var l = this.eatList.length;
        for (var i = 0; i < l; i++) {
            this.eatList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.eatListClick, this);
            this.userHcards[0].removeChild(this.eatList[i]);
            this.eatList[i] = null;
        }
        this.eatList = [];
    };
    GameContent.prototype.playerCard = function (data) {
        var l = 0;
        var i = 0;
        for (var t = 0; t < GameData.userNumber; t++) {
            l = this.userCards[t].length;
            for (var i = 0; i < l; i++) {
                this.userHcards[t].removeChild(this.userCards[t][i]);
                this.userCards[t][i] = null;
            }
            this.userCards[t] = null;
        }
        //给用户添加牌
        var place = 0;
        var cardsl = data.cards.length;
        var hcs;
        var dcts;
        var num = 0;
        var addNum = 1;
        var addW = 0;
        var addH = 0;
        for (i = 0; i < GameData.userNumber; i++) {
            for (t = 0; t < cardsl; t++) {
                For: if (this.userIcon[i].tid == data.cards[t].tid) {
                    place = i;
                    //把暗杆显示出来
                    //  console.log(place,this.gamePlayer);
                    if (place == 0 && this.gamePlayer) {
                        console.log("无视");
                    }
                    else {
                        dcts = data.cards[t].dcts;
                        l = dcts.length;
                        for (var c = 0; c < l; c++) {
                            //	console.log("添加暗杆",dcts[c]);
                            this.dctsList[place][c].removeChildren();
                            for (var k = 0; k < 4; k++) {
                                var cards = new Cards();
                                cards.texture = RES.getRes(this.operationCardTexture[place] + "_" + dcts[c]);
                                cards.width = this.operationCardsXY[place].w;
                                cards.height = this.operationCardsXY[place].h;
                                cards.smoothing = true;
                                cards.x = this.operationCardsXY[place].xy[k].x;
                                cards.y = this.operationCardsXY[place].xy[k].y;
                                this.dctsList[place][c].addChild(cards);
                                cards = null;
                            }
                        }
                    }
                    // this.dctsList[i]
                    //添加剩余的牌
                    hcs = data.cards[t].hcs;
                    if (place == 0 || place == 3) {
                        hcs.sort(this.sortNumber1);
                    }
                    else
                        hcs.sort(this.sortNumber2);
                    l = hcs.length;
                    num = 0;
                    addNum = 1;
                    var object = new egret.Sprite();
                    for (c = 0; c < l; c++) {
                        var cards = new Cards();
                        cards.texture = RES.getRes(this.fcards_deploy[place].texture + "_" + hcs[c]);
                        cards.width = this.operationCardsXY[place].w;
                        cards.height = this.operationCardsXY[place].h;
                        cards.smoothing = true;
                        cards.x = c * this.player_xy[place].w;
                        cards.y = c * this.player_xy[place].h;
                        object.addChildAt(cards, num);
                        num += addNum;
                        cards = null;
                    }
                    //
                    object.x = this.operationObjectXY[place].x + this.operationObjectXY[place].n * (this.operationObjectXY[place].add * this.operationObjectXY[place].w);
                    object.y = this.operationObjectXY[place].y + this.operationObjectXY[place].n * (this.operationObjectXY[place].add * this.operationObjectXY[place].h);
                    this.userHcards[place].addChild(object);
                    object.cacheAsBitmap = true;
                    //
                    if (place == 1) {
                        object.y = this.operationObjectXY[place].y + Math.max(0, this.operationObjectXY[place].n - 1) * (this.operationObjectXY[place].add * this.operationObjectXY[place].h);
                        object.y -= object.height;
                    }
                    else if (place == 2) {
                        object.x = this.operationObjectXY[place].x + Math.max(0, this.operationObjectXY[place].n - 1) * (this.operationObjectXY[place].add * this.operationObjectXY[place].w);
                        object.x -= (object.width + 9);
                    }
                    //
                    this.operationObjectXY[place].n++;
                    //
                    break For;
                }
            }
        }
        this.userDirection.stop();
    };
    GameContent.prototype.sortNumber1 = function (a, b) {
        var v0 = a;
        var v1 = b;
        if (v0 >= v1) {
            return 1;
        }
        else {
            return -1;
        }
    };
    GameContent.prototype.sortNumber2 = function (a, b) {
        var v0 = a;
        var v1 = b;
        if (v0 >= v1) {
            return -1;
        }
        else {
            return 1;
        }
    };
    //显示暗杆
    GameContent.prototype.showBar = function (data) {
        for (var i = 0; i < GameData.userNumber; i++) {
            For: if (this.userIcon[i].tid == data.tid) {
                var l = data.cids.length;
                var place = i;
                for (var c = 0; c < l; c++) {
                    this.dctsList[place][0].removeChildren();
                    for (var k = 0; k < 4; k++) {
                        var cards = new Cards();
                        cards.texture = RES.getRes(this.operationCardTexture[place] + "_" + data.cids[c]);
                        cards.width = this.operationCardsXY[place].w;
                        cards.height = this.operationCardsXY[place].h;
                        cards.smoothing = true;
                        cards.x = this.operationCardsXY[place].xy[k].x;
                        cards.y = this.operationCardsXY[place].xy[k].y;
                        this.dctsList[place][0].addChild(cards);
                        cards = null;
                    }
                    if (place == 1) {
                        this.dctsList[place][0].setChildIndex(this.dctsList[place][0].getChildAt(1), 0);
                        this.dctsList[place][0].setChildIndex(this.dctsList[place][0].getChildAt(2), 0);
                    }
                    this.dctsList[place].splice(0, 1);
                }
                break For;
            }
        }
    };
    //用户离线
    GameContent.prototype.userLeave = function (tid, cdtime) {
        For: for (var i = 0; i < GameData.userNumber; i++) {
            if (this.userIcon[i].tid == tid) {
                this.userIcon[i].leave = cdtime;
                break For;
            }
        }
    };
    //用户重新加入
    GameContent.prototype.backRoom = function (tid) {
        For: for (var i = 0; i < GameData.userNumber; i++) {
            if (this.userIcon[i].tid == tid) {
                this.userIcon[i].leave = -1;
                break For;
            }
        }
    };
    //胡牌
    GameContent.prototype.gameGidEnd = function (data) {
        GameData.result = data.type;
        var n = data.htids.length;
        for (var c = 0; c < n; c++) {
            For: for (var i = 0; i < GameData.userNumber; i++) {
                if (this.userIcon[i].tid == data.htids[c]) {
                    if (data.type == 1) {
                        this.addCardActionEffect(i, "zimodh", this.userIcon[i].sex, "zimo", c == 0);
                    }
                    else if (data.type == 2) {
                        this.addCardActionEffect(i, "dianpao", this.userIcon[i].sex, "hu", c == 0);
                    }
                    break For;
                }
            }
        }
    };
    //刷新用户积分
    GameContent.prototype.userScore = function (data) {
        var l = data.length;
        for (var i = 0; i < GameData.userNumber; i++) {
            For: for (var t = 0; t < l; t++) {
                if (this.userIcon[i].tid == data[t].tid) {
                    this.userIcon[i].score = this.userIcon[i].score + data[t].wol;
                    break For;
                }
            }
        }
    };
    GameContent.prototype.gangCard = function () {
        this.removeEatList();
        this.eatListDara = [];
        var showListData = [];
        var l = this.userCards[0].length;
        var card = [];
        for (var i = 0; i < 50; i++) {
            card.push(0);
        }
        for (i = 0; i < l; i++) {
            card[this.userCards[0][i].cid] += 1;
        }
        var g = this.gangList.length;
        for (i = 0; i < g; i++) {
            card[this.gangList[i]] += 3;
        }
        // console.log(card);
        for (i = 0; i < 50; i++) {
            if (card[i] == 4) {
                //	WndManager.root.main.spush.barCard(i);
                this.eatListDara.push({ tcid: i, ocid1: i, ocid2: i });
                showListData.push({ tcid: i, ocid1: i, ocid2: i, place: 0 });
            }
        }
        var l = this.eatListDara.length;
        //如果只有一组牌直接发送杆
        if (l == 1) {
            WndManager.root.main.spush.barCard(this.eatListDara[0].tcid);
            return;
        }
        //添加界面
        var eatList;
        var bim;
        for (i = 0; i < l; i++) {
            eatList = new EatList();
            eatList.x = 586 - (l * 275) / 2 + i * 275;
            eatList.y = -76;
            this.userHcards[0].addChild(eatList);
            this.eatList.push(eatList);
            eatList.name = "i" + showListData[i].tcid;
            //
            for (var t = 0; t < 4; t++) {
                bim = new egret.Bitmap(RES.getRes("c00_" + showListData[i].tcid));
                bim.width = 65;
                bim.height = 97;
                bim.x = 12 + 62 * t;
                bim.y = 8;
                eatList.addChild(bim);
                bim = null;
            }
            //
            this.eatListClickEventCode = 1;
            eatList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.eatListClick, this);
            eatList.touchEnabled = true;
            eatList.bg.width = 275;
            eatList.bg.height = 112;
            eatList = null;
        }
        showListData = null;
    };
    GameContent.prototype.setHint = function (place, stid, type) {
        //
        var l = this.hintList[place].length;
        var userNumber = 0;
        var userName = "";
        var typeNumber = 0;
        var sex = "";
        var sex1 = "";
        var sound = "shengyi";
        for (var i = 0; i < l; i++) {
            if (this.hintList[place][i].stid == stid) {
                userNumber++;
                userName = this.hintList[place][i].name;
                if (type == this.hintList[place][i].type) {
                    typeNumber++;
                }
            }
        }
        if (stid == GameData.tid) {
            if (userNumber > 2) {
                this.hintTxt.text = "你和[" + this.userIcon[place].nameTxt.text + "]做生意了";
                if (userNumber == 3)
                    sex = this.userIcon[place].sex;
            }
            else {
                this.hintTxt.text = "你被[" + this.userIcon[place].nameTxt.text + "]" + this.hintType[type] + typeNumber + "口";
            }
        }
        else if (this.userIcon[place].tid == GameData.tid) {
            if (userNumber > 2) {
                this.hintTxt.text = "你和[" + userName + "]做生意了";
                if (userNumber == 3)
                    sex = this.userIcon[place].sex;
            }
            else {
                this.hintTxt.text = "你" + this.hintType[type] + "[" + userName + "]" + typeNumber + "口";
            }
        }
        else {
            if (userNumber > 2) {
                this.hintTxt.text = "[" + this.userIcon[place].nameTxt.text + "]和[" + userName + "]做生意了";
                if (userNumber == 3)
                    sex = this.userIcon[place].sex;
            }
            else {
                this.hintTxt.text = "[" + userName + "]被[" + this.userIcon[place].nameTxt.text + "]" + this.hintType[type] + typeNumber + "口";
            }
        }
        //
        this.hint.visible = true;
        this.hintTimer = 8;
        if (sex != "") {
            WndManager.root.main.soundPlay(sex, sound);
        }
    };
    //获取用户信息
    GameContent.prototype.getUserData = function (place) {
        return { "tid": this.userIcon[place].tid, "nick": this.userIcon[place].nameTxt.text, "headimg": this.userIcon[place].head };
    };
    //礼物动画
    GameContent.prototype.sendGift = function (data) {
        var startX = 0;
        var startY = 0;
        var endX = 0;
        var endY = 0;
        for (var i = 0; i < GameData.userNumber; i++) {
            if (this.userIcon[i].tid == data.sid) {
                startX = this.userIcon[i].x + 90 / 2 * GameData.stageScale;
                startY = this.userIcon[i].y + 90 / 2 * GameData.stageScale;
            }
            if (this.userIcon[i].tid == data.tid) {
                endX = this.userIcon[i].x + 90 / 2 * GameData.stageScale;
                endY = this.userIcon[i].y + 90 / 2 * GameData.stageScale;
            }
        }
        var mc = new egret.MovieClip();
        mc.movieClipData = GameData.giftMcData.generateMovieClipData("gift" + data.gid);
        mc.x = startX;
        mc.y = startY;
        mc.scaleX = mc.scaleY = GameData.stageScale;
        this.gift.addChild(mc);
        egret.Tween.get(mc).to({ x: endX, y: endY }, 500).call(this.giftMove, this, [mc]);
    };
    GameContent.prototype.giftMove = function (mc) {
        var _this = this;
        mc.gotoAndPlay(1);
        egret.setTimeout(function () {
            _this.gift.removeChild(mc);
            mc = null;
        }, this, 3000);
    };
    //移除自己的时候
    GameContent.prototype.removeThis = function (e) {
        this.deleteGameData();
        // this.userCards=[];
        // this.userCards=null;
        this.doubleClickTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.doubleClickTimerEnd, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeThis, this);
        for (var i = 0; i < GameData.userNumber; i++) {
            this.userIcon[i].removeEventListener(ButtonEvent.CLICK, this.userIconClick, this);
            this.userIcon[i] = null;
        }
        console.log("移除游戏内容");
    };
    return GameContent;
}(eui.Component));
__reflect(GameContent.prototype, "GameContent");
//# sourceMappingURL=GameContent.js.map