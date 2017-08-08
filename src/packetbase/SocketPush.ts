/**
 *
 * @author 
 *
 */
class SocketPush extends egret.EventDispatcher {
    private socket: egret.WebSocket;
    private byteData: egret.ByteArray = new egret.ByteArray;
    private ping:number=0;
    private play:boolean=false;
    private outStr:string="网络出错,断开链接，请重新进入程序!";
    private refreshEnabled:boolean=false;
    public constructor() {
        super();
        this.byteData.endian = egret.Endian.BIG_ENDIAN;
    }
    public refresh(_refresh:boolean=true){
         // alert("断线");
           WndManager.root.main.alert.show(GameData.textJson[5],[{texture:"ok_png",code:200},{texture:"go_png",code:1001}]);
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
         
    }
     public InitSocket() {
          
        console.log("????.......");
        //var port: any = "8080/RedMahjong/websocket";
        //this.socket.connect("127.0.0.1", port);
        this.socket = new egret.WebSocket();
        this.socket.type = egret.WebSocket.TYPE_BINARY;
        this.socket.addEventListener(egret.Event.CONNECT,this.onConnect,this);
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
        this.socket.addEventListener(egret.Event.CLOSE,this.onClose,this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        var port: any = GameData.socketPort+GameData.path;
        this.socket.connect(GameData.socketRequest,port);
        egret.setInterval(this.sendPING,this,10000);
    }
  public connect(){
    //   this.socket.connect(RES.getRes("configure_json").socketRequest,RES.getRes("configure_json").socketPort);
  }
  private onSocketError(event: egret.Event): void {
   this.dispatchEvent(new egret.Event("onSocketError"));
     //  Notify.root.console("onSocketError");
       this.refresh();
   }
  private onClose(event: egret.Event): void {
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
    }
    private onConnect(event: egret.Event): void {
        this.dispatchEvent(new egret.Event("NetConnected"));
         console.log("CONNECT");
        // Notify.root.console("CONNECT");
         if( this.refreshEnabled){//断线重连
            console.log("断线重连");
         }else{//第一次连
         console.log("链接成功");
         this.sendLoginMsg();
       }
    
    }
     private onReceiveMessage(event: egret.ProgressEvent): void {
        // console.log("sd");
      //  Notify.root.console("onReceiveMessage：");

        var by: egret.ByteArray = new egret.ByteArray;
        this.socket.readBytes(by);
    
        if(by && by.bytesAvailable > 0) {
            this.byteData.writeBytes(by);
            this.byteData.position -= by.bytesAvailable;
            while(1) {
                if(this.byteData.bytesAvailable >= 4) {
                    var pktLen: number = this.byteData.readInt();
                    this.byteData.position -= 4;
   
                    if(this.byteData.bytesAvailable >= pktLen ) {
                        pktLen = this.byteData.readInt();
                        var pktType = this.byteData.readInt();
                        this.byteData.position -= 8;
                        var pkt: Packet = new Packet;
                        pkt.read(this.byteData);
                       // console.log("包类型："+pkt.pkt_type,ture);
                        this.dealResviePkt(pkt);  
                    } else {
                        break;
                    }
                } else {
                    break;
                }
            }
        }

     }
        /**  处理收到的包*/
    private dealResviePkt(pkt: Packet): void {
       console.log(pkt.pkt_base); 
        var jsonObj = null;
        if (pkt.pkt_base.length > 0) {
            jsonObj = JSON.parse(pkt.pkt_base);
        } else {
            jsonObj = "";
            return;
        }        
        console.log(pkt.pkt_type)
         //收到的服务器返回结果
        switch (pkt.pkt_type) {
             case PKT_TYPE2.S2C_PING:
              //  this.signal=(new Date()).valueOf()-this.signalTimer1;
               // console.log("心跳时间戳:"+this.signal);
                 break;
                case PKT_TYPE2.MSG_CREATEROOM://用户信息
               GameData.tid=jsonObj.data.tid;
               GameData.nickname=jsonObj.data.nick;
               GameData.head=jsonObj.data.headimg;
               GameData.sexI=jsonObj.data.sex.toString();
               if(GameData.sexI=="2"){
                 GameData.sex="l";
                }
                 GameData.gotpPay=jsonObj.data.pay;
                 GameData.jewel=jsonObj.data.jewel;
                 GameData.glist=jsonObj.data.glist;
                 WndManager.root.main.loadingView.out();
                 WndManager.root.gameWnd.returnGold(jsonObj.data.msgList);
               //   WndManager.root.gameWnd.returnGold([{type:1,content:"127375,80"},{type:1,content:"12375,120"}]);
                break;
                case PKT_TYPE2.MSG_ADDWITNESS://场景和加入房间,
                GameData.rstate=jsonObj.data.rstate;
                GameData.roomid=jsonObj.data.rid;
                GameData.rtype=jsonObj.data.rtype;
                GameData.ownerTid=jsonObj.data.owner;
                GameData.bscore=jsonObj.data.bscore;
                GameData.rtime=jsonObj.data.rtime;
                GameData.ctime=jsonObj.data.ctime;  
                GameData.plays=jsonObj.data.plays;
                GameData.oname=jsonObj.data.oname;
                GameData.gotpGold=jsonObj.data.rcost;
                //
                WndManager.root.gameWnd.createRoom();
                WndManager.root.main._jssdk.init();
                break;
                case PKT_TYPE2.MSG_SEATED://坐下
                GameData.ownerTid=jsonObj.data.owner;
                GameData.oname=jsonObj.data.oname;
                GameData.plays=jsonObj.data.plays;
                WndManager.root.gameWnd.userRefresh();
                break;
                case PKT_TYPE2.MSG_USEROUT://玩家离开
                GameData.ownerTid=jsonObj.data.owner;
                GameData.oname=jsonObj.data.oname;
                if(GameData.rstate==2){//游戏已经开始
                 WndManager.root.gameWnd.gameContent.userLeave(jsonObj.data.tid,jsonObj.data.cdtime);
                }else{//游戏还没开始
                var l:number= GameData.plays.length;
                For:for(var i=0;i<l;i++){
                  if(GameData.plays[i].tid==jsonObj.data.tid){
                      GameData.plays[i].tid=0;
                      //console.log("删除")
                      break For;
                  }
                 }
                WndManager.root.gameWnd.userRefresh(false);
                }
                break;
                case PKT_TYPE2.MSG_BACKROOM://玩家重新进行游戏
                 WndManager.root.gameWnd.gameContent.backRoom(jsonObj.data.tid);
                break;
                case PKT_TYPE2.MSG_WATCH://违规
                GameData.ownerTid=jsonObj.data.owner;
                GameData.oname=jsonObj.data.oname;
                GameData.plays=jsonObj.data.plays;
                WndManager.root.gameWnd.userRefresh();
                break;
                case PKT_TYPE2.MSG_EXPANI://发送文本以及语音
                  WndManager.root.gameWnd.gameContent.getTextEmoji(jsonObj.data);
                break;
                case PKT_TYPE2.ALERT://警告和提示
                  WndManager.root.main.alert.show(jsonObj.msg,[{texture:"ok_png",code:100}]);
                break;
                case PKT_TYPE2.MSG_FIXBANKER://抛骰子定庄家
                GameData.banker=jsonObj.data.banker;
                GameData.dice1=jsonObj.data.dice1;
                GameData.dice2=jsonObj.data.dice2;
                 WndManager.root.gameWnd.startGames();
                break;
                case PKT_TYPE2.MSG_ROOMCARDS://房间玩家的牌(发牌和回到房间用)
                 var jssdk:boolean=GameData.rid<5;
                 GameData.rid=jsonObj.data.rid;
                 GameData.gid=jsonObj.data.gid;
                 GameData.bscore=jsonObj.data.bscore;
                 GameData.wr=jsonObj.data.wr;
                 GameData.rtime=jsonObj.data.etime;
                 GameData.rstate=jsonObj.data.rstate;
                 GameData.bnums=jsonObj.data.bnums;
                 GameData.banker=jsonObj.data.banker;
                 GameData.act=jsonObj.data.act;
                 GameData.actid=jsonObj.data.actid;
                 GameData.oc=jsonObj.data.oc.cid;
                 GameData.c=jsonObj.data.c.cid;
                 GameData.hcards=jsonObj.data.data;
                 GameData.nouts=jsonObj.data.nouts;
                 GameData.timerTid=jsonObj.data.actid;
                 GameData.roomid=jsonObj.data.rid;
                 WndManager.root.gameWnd.roomCards();
                 if(jssdk){
                      WndManager.root.main._jssdk.init();
                 }
                 /*
                 */
                break;
                case PKT_TYPE2.MSG_MENDFLOWER://补花
                 GameData.bnums=jsonObj.data.bnums
                 WndManager.root.gameWnd.gameContent.mendFlower(jsonObj.data);
                break;
                case PKT_TYPE2.MSG_WAITOUT://等待玩家出牌，倒计时
                   GameData.timerTid=jsonObj.data.tid;
                   WndManager.root.gameWnd.gameContent.userCountDown();
                 break;
                 case PKT_TYPE2.MSG_OUTCARD://玩家出牌
                   WndManager.root.gameWnd.operationButtonHide();
                   WndManager.root.gameWnd.gameContent.outCard(jsonObj.data);
                 break;
                  case PKT_TYPE2.MSG_ADDHISTORY://放入历史牌
                   WndManager.root.gameWnd.gameContent.addHistory(jsonObj.data);
                 break;
                   case PKT_TYPE2.MSG_DRAWCARD://摸牌
                   GameData.bnums=jsonObj.data.bnums;
                   WndManager.root.gameWnd.gameContent.drawCard(jsonObj.data);
                 break;
                   case PKT_TYPE2.MSG_PLAYERSELECT://吃碰胡动作
               //    GameData.timerTid=jsonObj.data.tid; 
                   WndManager.root.gameWnd.playerSelect(jsonObj.data);
                 break;
                 case PKT_TYPE2.MSG_BUMPCARD://玩家碰牌
                  WndManager.root.gameWnd.operationButtonHide();
                  WndManager.root.gameWnd.gameContent.bumpCard(jsonObj.data);
                  break;
                  case PKT_TYPE2.MSG_BARCARD://玩家杠牌
                  WndManager.root.gameWnd.operationButtonHide();
                  WndManager.root.gameWnd.gameContent.bumpCard(jsonObj.data);
                  break;
                  case PKT_TYPE2.MSG_EATCARD://吃牌
                  WndManager.root.gameWnd.operationButtonHide();
                  WndManager.root.gameWnd.gameContent.earCard(jsonObj.data);
                  break;
                  case PKT_TYPE2.MSG_ADDUSER://用户加入
                   var myDate = new Date();
                   GameData.newslistData.push({type:1,nick:jsonObj.data.nick,headimg:jsonObj.data.headimg,date:myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds()})
                 //  console.log( GameData.newslistData);
                   WndManager.root.gameWnd.addUser();
                  break;
                  case PKT_TYPE2.MSG_PLAYERCARD://所有玩家的牌(胡牌或流局时推送，结算弹窗后面的)
                  WndManager.root.gameWnd.operationButtonHide();
                  WndManager.root.gameWnd.gameContent.playerCard(jsonObj.data);
                  break;
                  case PKT_TYPE2.MSG_SETTLEMENT://结算(结算弹窗内容)
                  GameData.endData=jsonObj.data;
                   WndManager.root.gameWnd.gameContent.userScore(jsonObj.data.sps);
                  egret.setTimeout(()=>{
                      WndManager.switchWnd(EndWnd,WIN_OPERATOR.WIN_OPEN_NEW);
                  },this,3000); 
                  //WndManager.root.gameWnd.operationButtonHide();
                 //  WndManager.root.gameWnd.gameContent.playerCard(jsonObj.data);
                  break;
                  case PKT_TYPE2.GAMEGIDEND://当局结束，胡牌人信息
                    GameData.rstate=jsonObj.data.rstate;
                   WndManager.root.gameWnd.gameContent.gameGidEnd(jsonObj.data);
                  break;
                  case PKT_TYPE2.GAMETIMEREND://房间已经结束
                  GameData.gameEndTimer=true;
                  GameData.ctime=1;
                  GameData.rtime=1;
                  if(GameData.rstate==1){
                      WndManager.root.main.alert.show(GameData.textJson[6],[{texture:"go_png",code:1001}]);
                  }
                  if(GameData.endButtonClick){
                   if(GameJudge.ownPartake){
                     WndManager.root.main.alert.show(GameData.textJson[4],[{texture:"go_png",code:1001},{texture:"ck_png",code:1002}]);
                  }else{
                   WndManager.root.main.alert.show(GameData.textJson[13],[{texture:"go_png",code:1001}]);
                     }
                  }
                  break;
                  case PKT_TYPE2.MSG_SHOWRECORD://个人战绩
                   WndManager.root.gameWnd.showUserRecord(jsonObj.data);
                  break;
                  case PKT_TYPE2.MSG_SENDGIFT://礼物
                      WndManager.root.gameWnd.gameContent.sendGift(jsonObj.data);
                  break;
                  case PKT_TYPE2.MSG_CROWDOUT://账号在其它地方登录
                     WndManager.root.main.alert.show(GameData.textJson[10],[{texture:"go_png",code:1001}]);
                  break;
                  case PKT_TYPE2.MSG_ROOMNULL://房间不存在
                     WndManager.root.main.alert.show(GameData.textJson[11],[{texture:"go_png",code:1001}]);
                 break;
                 case PKT_TYPE2.MSG_SPEAK://播放用户语音到播放列队
                    // egret.log(JSON.stringify(jsonObj));
                     WndManager.root.gameWnd.userSoundPlay({tid:jsonObj.data.tid,url:GameData.speakUrl+"mj/"+jsonObj.data.day+"/"+jsonObj.data.mediaid+"."+jsonObj.data.suff,time:jsonObj.data.time});
                  //   WndManager.root.gameWnd.userSoundPlay({tid:jsonObj.data.tid,url:GameData.speakUrl+jsonObj.data.day+"/"+jsonObj.data.mediaid+"."+jsonObj.data.suff,time:jsonObj.data.time});
                 break;
                 case PKT_TYPE2.MSG_SHOWBAR://显示暗杆
                    WndManager.root.gameWnd.gameContent.showBar(jsonObj.data);
                 break;
                 case PKT_TYPE2.MSG_PLAYAGAIN://游戏准备
                  WndManager.root.gameWnd.gameContent.gameReady(jsonObj.data);
                 break;
                 case PKT_TYPE2.MSG_WITNESSLIST://显示观战看客
                  WndManager.root.gameWnd.watchShow(jsonObj.data);
                 break;
        }       

    }   
    //从昵称设置好或者拥有昵称后进入
    private nameGotoWnd(){
                    
    }
    //
    public sendPkt(pkt: Packet): void {
        console.log("发送请求:"+JSON.stringify(pkt.pkt_base));
        if(this.socket.connected) {
            this.socket.writeBytes(pkt.write());
            this.socket.flush();
        } else {
            egret.log("链接还没有建立成功");
        }
    }    
       /**
     * 发送登录请求
     */
    public sendLoginMsg(): void {
        // console.log(this.userid,this.nickname,this.headimg,this.sex,this.ip);
  // var temp = "robot" + Math.floor(Math.random() * 100000);
 
        var pkt = new Packet;
        pkt.pkt_type = PKT_TYPE2.MSG_ADDWITNESS;
        pkt.pkt_base = JSON.stringify({rkey:GameData.roomKey,pkey:GameData.userkey});
        console.log("--",pkt.pkt_base);
        WndManager.root.main.spush.sendPkt(pkt);
 
        //
    }
   //心跳
    private signalTimer1:number=0;
    private signal:number=0;
    private sendOpen:Boolean=false;
    public sendPING(){
        if(this.sendOpen){
       // console.log("心跳");
        this.signalTimer1=(new Date()).valueOf();
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.C2S_PING;
         pkt.pkt_base = JSON.stringify({tid:GameData.tid});
         WndManager.root.main.spush.sendPkt(pkt);
        }
    }
  //坐下
    public seated(idx:number){
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_SEATED;
         pkt.pkt_base = JSON.stringify({idx:idx});
         WndManager.root.main.spush.sendPkt(pkt);
    }
  //发表情和语音以及文本
  public  sendTextEmoji(str:string){
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_EXPANI;
         pkt.pkt_base = JSON.stringify({tid:GameData.tid,idx:str});
         WndManager.root.main.spush.sendPkt(pkt);
    }
  //房主开始游戏
  public startGame(){
        // console.log("开始游戏");
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_STARTGAME;
         pkt.pkt_base = JSON.stringify({tid:GameData.tid});
         WndManager.root.main.spush.sendPkt(pkt);  
  }
  //出牌
  public outCard(cid:number){
       //  console.log("出牌:"+cid);
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_OUTCARD;
         pkt.pkt_base = JSON.stringify({cid:cid});
         WndManager.root.main.spush.sendPkt(pkt);  
  }
  //碰
   public bumpCard(cid:number){
      //   console.log("碰:"+cid);
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_BUMPCARD;
         pkt.pkt_base = JSON.stringify({tid:GameData.tid});
         WndManager.root.main.spush.sendPkt(pkt);  
  }
  //杠
 public barCard(cid:number){
       //  console.log("杠:"+cid);
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_BARCARD;
         pkt.pkt_base = JSON.stringify({cid:cid});
         WndManager.root.main.spush.sendPkt(pkt);  
  }
  //吃牌
  public eatCard(tcid:number,ocid1:number,ocid2:number){
     //    console.log("吃:"+tcid,ocid1,ocid2);
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_EATCARD;
         pkt.pkt_base = JSON.stringify({tcid:tcid,ocid1:ocid1,ocid2:ocid2});
         WndManager.root.main.spush.sendPkt(pkt);  
  }
  //过牌
  public overCard(){
       //  console.log("过");
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_OVERCARD;
         pkt.pkt_base = JSON.stringify({tid:GameData.tid});
         WndManager.root.main.spush.sendPkt(pkt);  
  }
  //胡牌
    public endFlow(cid:number){
      //   console.log("胡");
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_HUFLOW;
         pkt.pkt_base = JSON.stringify({cid:cid});
         WndManager.root.main.spush.sendPkt(pkt);  
  }
  //胡牌
    public playAgin(){
       //  console.log("再来一局");
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_PLAYAGAIN;
         pkt.pkt_base = JSON.stringify({tid:GameData.tid});
         WndManager.root.main.spush.sendPkt(pkt);  
  }
   //观战
    public watch(){
        // console.log("观战");
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_WATCH;
         pkt.pkt_base = JSON.stringify({tid:GameData.tid});
         WndManager.root.main.spush.sendPkt(pkt);  
  }
  //踢人
   public tiren(tid:number){
       //  console.log("踢人");
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_OWNERKICK;
         pkt.pkt_base = JSON.stringify({tid:tid});
         WndManager.root.main.spush.sendPkt(pkt);  
  }
//查看战绩
 public showUserRecord(tid:number){
       //  console.log("查看战绩",tid);
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_SHOWRECORD;
         pkt.pkt_base = JSON.stringify({tid:tid});
         WndManager.root.main.spush.sendPkt(pkt);  
  }
  //送礼
  public sendGift(tid:number,gid:number){
       //  console.log("送礼",tid,gid);
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_SENDGIFT;
         pkt.pkt_base = JSON.stringify({tid:tid,gid:gid});
         WndManager.root.main.spush.sendPkt(pkt);  
  }
 //查看观战的用户 
  public watchUser(){
       //  console.log("送礼",tid,gid);
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_WITNESSLIST;
         pkt.pkt_base = JSON.stringify({tid:GameData.tid});
         WndManager.root.main.spush.sendPkt(pkt);  
  }
 //上传语音
  public speak(sid:string){
       //  var pkt = new Packet;
        // pkt.pkt_type = PKT_TYPE2.MSG_SPEAK;
       //  pkt.pkt_base = JSON.stringify({sid:sid});
        // WndManager.root.main.spush.sendPkt(pkt);  
       // var url = GameData.speakUpload+"?serverid="+sid+"&rkey="+GameData.roomKey+"&tid="+GameData.tid+"&time="+GameData.speakSec;
      var url:string=GameData.speakUp+"?serverid="+sid+"&gameid=mj";
      var speakSec:number=GameData.speakSec;
      //  egret.log("发送"+url);
       // console.log(url);
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(url);
        req.method = egret.URLRequestMethod.GET;
        var self = this;
      //  alert(url);
         urlloader.once(egret.Event.COMPLETE, (e) => {
               // alert(e.target.data);
             var jsObj = JSON.parse(e.target.data);
             if (jsObj) {
                self.speakUp(jsObj,speakSec);
                 }
            }, this);
        urlloader.load(req);   
  }
  public speakUp(json,speakSec){
      if(json.suff!=null){
          if(json.suff=="mp3"){
         var pkt = new Packet;
         pkt.pkt_type = PKT_TYPE2.MSG_SPEAK;
         pkt.pkt_base = JSON.stringify({day:json.day,mediaid:json.mediaid,suff:json.suff,time:speakSec});
         WndManager.root.main.spush.sendPkt(pkt);  
          }
      }
  }
 //
}