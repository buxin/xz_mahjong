var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var SocketPush = (function (_super) {
    __extends(SocketPush, _super);
    function SocketPush() {
        var _this = _super.call(this) || this;
        _this.byteData = new egret.ByteArray;
        _this.ping = 0;
        _this.play = false;
        _this.outStr = "网络出错,断开链接，请重新进入程序!";
        _this.refreshEnabled = false;
        //心跳
        _this.signalTimer1 = 0;
        _this.signal = 0;
        _this.sendOpen = false;
        _this.byteData.endian = egret.Endian.BIG_ENDIAN;
        return _this;
    }
    SocketPush.prototype.refresh = function (_refresh) {
        if (_refresh === void 0) { _refresh = true; }
        // alert("断线");
        WndManager.root.main.alert.show(GameData.textJson[5], [{ texture: "ok_png", code: 200 }, { texture: "go_png", code: 1001 }]);
        /*
           if( this.socket!=null){
            this.refreshEnabled=true;
            this.sendOpen=false;
            this.socket.close();
            this.socket.removeEventListener(egret.Event.CONNECT,this.onConnect,this);
            this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
            this.socket.removeEventListener(egret.Event.CLOSE,this.onClose,this);
            this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.socket =null;
            //
           if(_refresh){
            egret.setTimeout(()=>{
            this.socket = new egret.WebSocket();
           this.socket.type = egret.WebSocket.TYPE_BINARY;
           this.socket.addEventListener(egret.Event.CONNECT,this.onConnect,this);
           this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
           this.socket.addEventListener(egret.Event.CLOSE,this.onClose,this);
           this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.socket.connect(RES.getRes("configure_json").socketRequest,RES.getRes("configure_json").socketPort);
           console.log("-----!");
            },this,2000);
           }
            //
           }
          */
    };
    SocketPush.prototype.InitSocket = function () {
        console.log("????.......");
        //var port: any = "8080/RedMahjong/websocket";
        //this.socket.connect("127.0.0.1", port);
        this.socket = new egret.WebSocket();
        this.socket.type = egret.WebSocket.TYPE_BINARY;
        this.socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        var port = GameData.socketPort + GameData.path;
        this.socket.connect(GameData.socketRequest, port);
        egret.setInterval(this.sendPING, this, 10000);
    };
    SocketPush.prototype.connect = function () {
        //   this.socket.connect(RES.getRes("configure_json").socketRequest,RES.getRes("configure_json").socketPort);
    };
    SocketPush.prototype.onSocketError = function (event) {
        this.dispatchEvent(new egret.Event("onSocketError"));
        //  Notify.root.console("onSocketError");
        this.refresh();
    };
    SocketPush.prototype.onClose = function (event) {
        this.dispatchEvent(new egret.Event("NetError"));
        egret.log("CLOSE!!!!!!");
        egret.log("链接还没有建立成功");
        //  Notify.root.console("CLOSE");
        /*
        if(this.outStr=="网络出错,断开链接，请重新进入程序!"){
        Notify.root.hint.alert(this.outStr,10002,false);
        }else Notify.root.hint.alert(this.outStr,44444,false);
         this.socket.close();
         */
        this.refresh();
    };
    SocketPush.prototype.onConnect = function (event) {
        this.dispatchEvent(new egret.Event("NetConnected"));
        console.log("CONNECT");
        // Notify.root.console("CONNECT");
        if (this.refreshEnabled) {
            console.log("断线重连");
        }
        else {
            console.log("链接成功");
            this.sendLoginMsg();
        }
    };
    SocketPush.prototype.onReceiveMessage = function (event) {
        // console.log("sd");
        //  Notify.root.console("onReceiveMessage：");
        var by = new egret.ByteArray;
        this.socket.readBytes(by);
        if (by && by.bytesAvailable > 0) {
            this.byteData.writeBytes(by);
            this.byteData.position -= by.bytesAvailable;
            while (1) {
                if (this.byteData.bytesAvailable >= 4) {
                    var pktLen = this.byteData.readInt();
                    this.byteData.position -= 4;
                    if (this.byteData.bytesAvailable >= pktLen) {
                        pktLen = this.byteData.readInt();
                        var pktType = this.byteData.readInt();
                        this.byteData.position -= 8;
                        var pkt = new Packet;
                        pkt.read(this.byteData);
                        // console.log("包类型："+pkt.pkt_type,ture);
                        this.dealResviePkt(pkt);
                    }
                    else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
        }
    };
    /**  处理收到的包*/
    SocketPush.prototype.dealResviePkt = function (pkt) {
        console.log(pkt.pkt_base);
        var jsonObj = null;
        if (pkt.pkt_base.length > 0) {
            jsonObj = JSON.parse(pkt.pkt_base);
        }
        else {
            jsonObj = "";
            return;
        }
        console.log(pkt.pkt_type);
        //收到的服务器返回结果
        switch (pkt.pkt_type) {
            case PKT_TYPE2.S2C_PING:
                //  this.signal=(new Date()).valueOf()-this.signalTimer1;
                // console.log("心跳时间戳:"+this.signal);
                break;
            case PKT_TYPE2.MSG_CREATEROOM:
                GameData.tid = jsonObj.data.tid;
                GameData.nickname = jsonObj.data.nick;
                GameData.head = jsonObj.data.headimg;
                GameData.sexI = jsonObj.data.sex.toString();
                if (GameData.sexI == "2") {
                    GameData.sex = "l";
                }
                GameData.gotpPay = jsonObj.data.pay;
                GameData.jewel = jsonObj.data.jewel;
                GameData.glist = jsonObj.data.glist;
                WndManager.root.main.loadingView.out();
                WndManager.root.gameWnd.returnGold(jsonObj.data.msgList);
                //   WndManager.root.gameWnd.returnGold([{type:1,content:"127375,80"},{type:1,content:"12375,120"}]);
                break;
            case PKT_TYPE2.MSG_ADDWITNESS:
                GameData.rstate = jsonObj.data.rstate;
                GameData.roomid = jsonObj.data.rid;
                GameData.rtype = jsonObj.data.rtype;
                GameData.ownerTid = jsonObj.data.owner;
                GameData.bscore = jsonObj.data.bscore;
                GameData.rtime = jsonObj.data.rtime;
                GameData.ctime = jsonObj.data.ctime;
                GameData.plays = jsonObj.data.plays;
                GameData.oname = jsonObj.data.oname;
                GameData.gotpGold = jsonObj.data.rcost;
                //
                WndManager.root.gameWnd.createRoom();
                WndManager.root.main._jssdk.init();
                break;
            case PKT_TYPE2.MSG_SEATED:
                GameData.ownerTid = jsonObj.data.owner;
                GameData.oname = jsonObj.data.oname;
                GameData.plays = jsonObj.data.plays;
                WndManager.root.gameWnd.userRefresh();
                break;
            case PKT_TYPE2.MSG_USEROUT:
                GameData.ownerTid = jsonObj.data.owner;
                GameData.oname = jsonObj.data.oname;
                if (GameData.rstate == 2) {
                    WndManager.root.gameWnd.gameContent.userLeave(jsonObj.data.tid, jsonObj.data.cdtime);
                }
                else {
                    var l = GameData.plays.length;
                    For: for (var i = 0; i < l; i++) {
                        if (GameData.plays[i].tid == jsonObj.data.tid) {
                            GameData.plays[i].tid = 0;
                            //console.log("删除")
                            break For;
                        }
                    }
                    WndManager.root.gameWnd.userRefresh(false);
                }
                break;
            case PKT_TYPE2.MSG_BACKROOM:
                WndManager.root.gameWnd.gameContent.backRoom(jsonObj.data.tid);
                break;
            case PKT_TYPE2.MSG_WATCH:
                GameData.ownerTid = jsonObj.data.owner;
                GameData.oname = jsonObj.data.oname;
                GameData.plays = jsonObj.data.plays;
                WndManager.root.gameWnd.userRefresh();
                break;
            case PKT_TYPE2.MSG_EXPANI:
                WndManager.root.gameWnd.gameContent.getTextEmoji(jsonObj.data);
                break;
            case PKT_TYPE2.ALERT:
                WndManager.root.main.alert.show(jsonObj.msg, [{ texture: "ok_png", code: 100 }]);
                break;
            case PKT_TYPE2.MSG_FIXBANKER:
                GameData.banker = jsonObj.data.banker;
                GameData.dice1 = jsonObj.data.dice1;
                GameData.dice2 = jsonObj.data.dice2;
                WndManager.root.gameWnd.startGames();
                break;
            case PKT_TYPE2.MSG_ROOMCARDS:
                var jssdk = GameData.rid < 5;
                GameData.rid = jsonObj.data.rid;
                GameData.gid = jsonObj.data.gid;
                GameData.bscore = jsonObj.data.bscore;
                GameData.wr = jsonObj.data.wr;
                GameData.rtime = jsonObj.data.etime;
                GameData.rstate = jsonObj.data.rstate;
                GameData.bnums = jsonObj.data.bnums;
                GameData.banker = jsonObj.data.banker;
                GameData.act = jsonObj.data.act;
                GameData.actid = jsonObj.data.actid;
                GameData.oc = jsonObj.data.oc.cid;
                GameData.c = jsonObj.data.c.cid;
                GameData.hcards = jsonObj.data.data;
                GameData.nouts = jsonObj.data.nouts;
                GameData.timerTid = jsonObj.data.actid;
                GameData.roomid = jsonObj.data.rid;
                WndManager.root.gameWnd.roomCards();
                if (jssdk) {
                    WndManager.root.main._jssdk.init();
                }
                /*
                */
                break;
            case PKT_TYPE2.MSG_MENDFLOWER:
                GameData.bnums = jsonObj.data.bnums;
                WndManager.root.gameWnd.gameContent.mendFlower(jsonObj.data);
                break;
            case PKT_TYPE2.MSG_WAITOUT:
                GameData.timerTid = jsonObj.data.tid;
                WndManager.root.gameWnd.gameContent.userCountDown();
                break;
            case PKT_TYPE2.MSG_OUTCARD:
                WndManager.root.gameWnd.operationButtonHide();
                WndManager.root.gameWnd.gameContent.outCard(jsonObj.data);
                break;
            case PKT_TYPE2.MSG_ADDHISTORY:
                WndManager.root.gameWnd.gameContent.addHistory(jsonObj.data);
                break;
            case PKT_TYPE2.MSG_DRAWCARD:
                GameData.bnums = jsonObj.data.bnums;
                WndManager.root.gameWnd.gameContent.drawCard(jsonObj.data);
                break;
            case PKT_TYPE2.MSG_PLAYERSELECT:
                //    GameData.timerTid=jsonObj.data.tid; 
                WndManager.root.gameWnd.playerSelect(jsonObj.data);
                break;
            case PKT_TYPE2.MSG_BUMPCARD:
                WndManager.root.gameWnd.operationButtonHide();
                WndManager.root.gameWnd.gameContent.bumpCard(jsonObj.data);
                break;
            case PKT_TYPE2.MSG_BARCARD:
                WndManager.root.gameWnd.operationButtonHide();
                WndManager.root.gameWnd.gameContent.bumpCard(jsonObj.data);
                break;
            case PKT_TYPE2.MSG_EATCARD:
                WndManager.root.gameWnd.operationButtonHide();
                WndManager.root.gameWnd.gameContent.earCard(jsonObj.data);
                break;
            case PKT_TYPE2.MSG_ADDUSER:
                var myDate = new Date();
                GameData.newslistData.push({ type: 1, nick: jsonObj.data.nick, headimg: jsonObj.data.headimg, date: myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds() });
                //  console.log( GameData.newslistData);
                WndManager.root.gameWnd.addUser();
                break;
            case PKT_TYPE2.MSG_PLAYERCARD:
                WndManager.root.gameWnd.operationButtonHide();
                WndManager.root.gameWnd.gameContent.playerCard(jsonObj.data);
                break;
            case PKT_TYPE2.MSG_SETTLEMENT:
                GameData.endData = jsonObj.data;
                WndManager.root.gameWnd.gameContent.userScore(jsonObj.data.sps);
                egret.setTimeout(function () {
                    WndManager.switchWnd(EndWnd, WIN_OPERATOR.WIN_OPEN_NEW);
                }, this, 3000);
                //WndManager.root.gameWnd.operationButtonHide();
                //  WndManager.root.gameWnd.gameContent.playerCard(jsonObj.data);
                break;
            case PKT_TYPE2.GAMEGIDEND:
                GameData.rstate = jsonObj.data.rstate;
                WndManager.root.gameWnd.gameContent.gameGidEnd(jsonObj.data);
                break;
            case PKT_TYPE2.GAMETIMEREND:
                GameData.gameEndTimer = true;
                GameData.ctime = 1;
                GameData.rtime = 1;
                if (GameData.rstate == 1) {
                    WndManager.root.main.alert.show(GameData.textJson[6], [{ texture: "go_png", code: 1001 }]);
                }
                if (GameData.endButtonClick) {
                    if (GameJudge.ownPartake) {
                        WndManager.root.main.alert.show(GameData.textJson[4], [{ texture: "go_png", code: 1001 }, { texture: "ck_png", code: 1002 }]);
                    }
                    else {
                        WndManager.root.main.alert.show(GameData.textJson[13], [{ texture: "go_png", code: 1001 }]);
                    }
                }
                break;
            case PKT_TYPE2.MSG_SHOWRECORD:
                WndManager.root.gameWnd.showUserRecord(jsonObj.data);
                break;
            case PKT_TYPE2.MSG_SENDGIFT:
                WndManager.root.gameWnd.gameContent.sendGift(jsonObj.data);
                break;
            case PKT_TYPE2.MSG_CROWDOUT:
                WndManager.root.main.alert.show(GameData.textJson[10], [{ texture: "go_png", code: 1001 }]);
                break;
            case PKT_TYPE2.MSG_ROOMNULL:
                WndManager.root.main.alert.show(GameData.textJson[11], [{ texture: "go_png", code: 1001 }]);
                break;
            case PKT_TYPE2.MSG_SPEAK:
                // egret.log(JSON.stringify(jsonObj));
                WndManager.root.gameWnd.userSoundPlay({ tid: jsonObj.data.tid, url: GameData.speakUrl + "mj/" + jsonObj.data.day + "/" + jsonObj.data.mediaid + "." + jsonObj.data.suff, time: jsonObj.data.time });
                //   WndManager.root.gameWnd.userSoundPlay({tid:jsonObj.data.tid,url:GameData.speakUrl+jsonObj.data.day+"/"+jsonObj.data.mediaid+"."+jsonObj.data.suff,time:jsonObj.data.time});
                break;
            case PKT_TYPE2.MSG_SHOWBAR:
                WndManager.root.gameWnd.gameContent.showBar(jsonObj.data);
                break;
            case PKT_TYPE2.MSG_PLAYAGAIN:
                WndManager.root.gameWnd.gameContent.gameReady(jsonObj.data);
                break;
            case PKT_TYPE2.MSG_WITNESSLIST:
                WndManager.root.gameWnd.watchShow(jsonObj.data);
                break;
        }
    };
    //从昵称设置好或者拥有昵称后进入
    SocketPush.prototype.nameGotoWnd = function () {
    };
    //
    SocketPush.prototype.sendPkt = function (pkt) {
        console.log("发送请求:" + JSON.stringify(pkt.pkt_base));
        if (this.socket.connected) {
            this.socket.writeBytes(pkt.write());
            this.socket.flush();
        }
        else {
            egret.log("链接还没有建立成功");
        }
    };
    /**
  * 发送登录请求
  */
    SocketPush.prototype.sendLoginMsg = function () {
        // console.log(this.userid,this.nickname,this.headimg,this.sex,this.ip);
        // var temp = "robot" + Math.floor(Math.random() * 100000);
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_ADDWITNESS;
        pkt.pkt_base = JSON.stringify({ rkey: GameData.roomKey, pkey: GameData.userkey });
        console.log("--", pkt.pkt_base);
        WndManager.root.main.spush.sendPkt(pkt);
        //
    };
    SocketPush.prototype.sendPING = function () {
        if (this.sendOpen) {
            // console.log("心跳");
            this.signalTimer1 = (new Date()).valueOf();
            var pkt = new Packet;
            pkt.pkt_type = PKT_TYPE2.C2S_PING;
            pkt.pkt_base = JSON.stringify({ tid: GameData.tid });
            WndManager.root.main.spush.sendPkt(pkt);
        }
    };
    //坐下
    SocketPush.prototype.seated = function (idx) {
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_SEATED;
        pkt.pkt_base = JSON.stringify({ idx: idx });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //发表情和语音以及文本
    SocketPush.prototype.sendTextEmoji = function (str) {
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_EXPANI;
        pkt.pkt_base = JSON.stringify({ tid: GameData.tid, idx: str });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //房主开始游戏
    SocketPush.prototype.startGame = function () {
        // console.log("开始游戏");
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_STARTGAME;
        pkt.pkt_base = JSON.stringify({ tid: GameData.tid });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //出牌
    SocketPush.prototype.outCard = function (cid) {
        //  console.log("出牌:"+cid);
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_OUTCARD;
        pkt.pkt_base = JSON.stringify({ cid: cid });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //碰
    SocketPush.prototype.bumpCard = function (cid) {
        //   console.log("碰:"+cid);
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_BUMPCARD;
        pkt.pkt_base = JSON.stringify({ tid: GameData.tid });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //杠
    SocketPush.prototype.barCard = function (cid) {
        //  console.log("杠:"+cid);
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_BARCARD;
        pkt.pkt_base = JSON.stringify({ cid: cid });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //吃牌
    SocketPush.prototype.eatCard = function (tcid, ocid1, ocid2) {
        //    console.log("吃:"+tcid,ocid1,ocid2);
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_EATCARD;
        pkt.pkt_base = JSON.stringify({ tcid: tcid, ocid1: ocid1, ocid2: ocid2 });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //过牌
    SocketPush.prototype.overCard = function () {
        //  console.log("过");
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_OVERCARD;
        pkt.pkt_base = JSON.stringify({ tid: GameData.tid });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //胡牌
    SocketPush.prototype.endFlow = function (cid) {
        //   console.log("胡");
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_HUFLOW;
        pkt.pkt_base = JSON.stringify({ cid: cid });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //胡牌
    SocketPush.prototype.playAgin = function () {
        //  console.log("再来一局");
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_PLAYAGAIN;
        pkt.pkt_base = JSON.stringify({ tid: GameData.tid });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //观战
    SocketPush.prototype.watch = function () {
        // console.log("观战");
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_WATCH;
        pkt.pkt_base = JSON.stringify({ tid: GameData.tid });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //踢人
    SocketPush.prototype.tiren = function (tid) {
        //  console.log("踢人");
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_OWNERKICK;
        pkt.pkt_base = JSON.stringify({ tid: tid });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //查看战绩
    SocketPush.prototype.showUserRecord = function (tid) {
        //  console.log("查看战绩",tid);
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_SHOWRECORD;
        pkt.pkt_base = JSON.stringify({ tid: tid });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //送礼
    SocketPush.prototype.sendGift = function (tid, gid) {
        //  console.log("送礼",tid,gid);
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_SENDGIFT;
        pkt.pkt_base = JSON.stringify({ tid: tid, gid: gid });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //查看观战的用户 
    SocketPush.prototype.watchUser = function () {
        //  console.log("送礼",tid,gid);
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_WITNESSLIST;
        pkt.pkt_base = JSON.stringify({ tid: GameData.tid });
        WndManager.root.main.spush.sendPkt(pkt);
    };
    //上传语音
    SocketPush.prototype.speak = function (sid) {
        //  var pkt = new Packet;
        // pkt.pkt_type = PKT_TYPE2.MSG_SPEAK;
        //  pkt.pkt_base = JSON.stringify({sid:sid});
        // WndManager.root.main.spush.sendPkt(pkt);  
        // var url = GameData.speakUpload+"?serverid="+sid+"&rkey="+GameData.roomKey+"&tid="+GameData.tid+"&time="+GameData.speakSec;
        var url = GameData.speakUp + "?serverid=" + sid + "&gameid=mj";
        var speakSec = GameData.speakSec;
        //  egret.log("发送"+url);
        // console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
        //  alert(url);
        urlloader.once(egret.Event.COMPLETE, function (e) {
            // alert(e.target.data);
            var jsObj = JSON.parse(e.target.data);
            if (jsObj) {
                self.speakUp(jsObj, speakSec);
            }
        }, this);
        urlloader.load(req);
    };
    SocketPush.prototype.speakUp = function (json, speakSec) {
        if (json.suff != null) {
            if (json.suff == "mp3") {
                var pkt = new Packet;
                pkt.pkt_type = PKT_TYPE2.MSG_SPEAK;
                pkt.pkt_base = JSON.stringify({ day: json.day, mediaid: json.mediaid, suff: json.suff, time: speakSec });
                WndManager.root.main.spush.sendPkt(pkt);
            }
        }
    };
    return SocketPush;
}(egret.EventDispatcher));
__reflect(SocketPush.prototype, "SocketPush");
//# sourceMappingURL=SocketPush.js.map