/*/////////////////////////////////////////////////////////////////////////////////////
//游戏界面
//框架
//Banner() 顶部横幅文字内容
//GameContent() 用户头像，牌和动画框架
//GameButton();游戏按钮框架
//startGame(); 开始界面信息
//收到的Soclet消息
createRoom();//进入了房间
-------------
//公共属性
-----------
ownPartake:boolean;//判断自己是否坐下（只读）
----------
userPartake:boolean;//判断是否有用户坐下（只读）
-------------
//公共方法
userSoundPlay(soundId:string);//播放玩家语音ID
--------------
//Socket数据调用方法
userRefresh();//刷新用户数据
--------
startGames();//摇骰子显示庄家
-------
roomCards();//刷新牌数据
-------
playerSelect({"hu":false,"gang":false,"peng":false,"chi":true});//吃碰胡动作
-------
operationButtonHide();//隐藏 吃碰胡按钮
/////////////////////////////////////////////////////////////////////////////////////*/
class GameWnd extends WinBase{


private bg: eui.Image;
private logo: eui.Image;
private banner:Banner=new Banner();
public gameContent:GameContent=new GameContent();
private gameButton:GameButton=new GameButton();
private startGame:StartGame=new StartGame();
private userDataGift:UserDataGift=new UserDataGift();//用户信息
private gameScale:number=0;
 //输入文本框
 private sendTxt:SendTxt;
 private sendEmoji:SendEmoji;
 private currentCommunicateWnd:eui.Component;//当前打开的通信窗口
 private currentCommunicateButtonString:string="";//当前选中的通信按钮名字
 //
 private newsList:NewsList=new NewsList();
 private systemSettings:SystemSettings=new SystemSettings();
//
  public constructor() {
		super();
	  	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/game.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
    //
    WndManager.root.gameWnd=this;
    this.addChild(this.banner);//添加横幅文字和按钮
    this.addChild(this.gameContent);//添加游戏内容，用户信息，动画等
    this.addChild(this.gameButton);//添加游戏操作按钮
    this.addChild(this.startGame);
    this.addChild(this.userDataGift);
    this.userDataGift.addEventListener(ButtonEvent.CLICK,this.userDataGiftEvent,this);
    this.addChild(this.newsList);
    this.systemSettings.visible=false;
    this.addChild(this.systemSettings);
    this.startGame.visible=false;
    this.gameButton.addEventListener(ButtonEvent.CLICK,this.gameButtonEvent,this);
    this.startGame.addEventListener(ButtonEvent.CLICK,this.startGameEvent,this);
    //
     GameData.gameWndOpen=true;
     this.UILayout();
  }
  public watchShow(data:any){
      this.newsList.watchShow(data);
  }
  //按钮点击事件
  public gameButtonEvent(e:ButtonEvent):void{
   //  console.log(e.name);
     switch(e.name){
        case "system_menu"://系统菜单
       
       break;
       case "system_sound"://消息面板
     //  if(this.newsList.visible){
          //   this.newsList.hide();
      // }else 
      if(this.newsList.visible==false){
       this.newsList.show(GameData.newslistData);
       this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.newslistOut,this);
      }
       break;
       case "system_set"://系统设置
       if(this.systemSettings.visible==false){
       this.systemSettings.visible=true;
       this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.systemSettingsOut,this);
       }
       break;
       case "send_txt"://点击发送文本
       if(this.currentCommunicateWnd!=null){
         this.currentCommunicateWnd.removeEventListener(ButtonEvent.CLICK,this.communicateClick,this);
         this.removeChild(this.currentCommunicateWnd);
         this.currentCommunicateWnd=null;
       }
       this.sendTxt=new SendTxt();
       this.addChild(this.sendTxt);
       this.currentCommunicateButtonString=e.name;
       this.currentCommunicateWnd=this.sendTxt;
       this.currentCommunicateWnd.addEventListener(ButtonEvent.CLICK,this.communicateClick,this);
       this.sendTxt=null;
       this.communicateWndLayout();
       //
       break;
       case "speech_paly"://点击开始录音
         WndManager.root.main.userCurrentSpeakPlay();
         if(this.currentCommunicateWnd!=null){
          this.currentCommunicateWnd.removeEventListener(ButtonEvent.CLICK,this.communicateClick,this);
         this.removeChild(this.currentCommunicateWnd);
         this.currentCommunicateWnd=null;
       }
        WndManager.root.main._jssdk.startRecord();
      //  WndManager.root.main.alert.show("是否授权调用微信录音",[{texture:"ok_png",code:1007},{texture:"no_png",code:1007}]);
       break;
        case "speech_stop"://停止录音
         WndManager.root.main.userCurrentSpeakStop();
        WndManager.root.main._jssdk.stopRecord(false);
        break;
        case "send_speech"://点击发送录音
         WndManager.root.main.userCurrentSpeakStop();
        GameData.speakSec=e.timer*1000;
        WndManager.root.main._jssdk.stopRecord(true);
        break;
       case "send_emoji"://点击发送语表情
         if(this.currentCommunicateWnd!=null){
          this.currentCommunicateWnd.removeEventListener(ButtonEvent.CLICK,this.communicateClick,this);
         this.removeChild(this.currentCommunicateWnd);
         this.currentCommunicateWnd=null;
       }
       this.sendEmoji=new SendEmoji();
       this.addChild(this.sendEmoji);
       this.currentCommunicateButtonString=e.name;
       this.currentCommunicateWnd=this.sendEmoji;
       this.currentCommunicateWnd.addEventListener(ButtonEvent.CLICK,this.communicateClick,this);
       this.sendEmoji=null;
       this.communicateWndLayout();
       break;
        case "chi":
        this.gameButton.operationButtonHide();
        this.gameContent.eatCardLisrShow(GameData.outCardCid);
        break;
        case "peng":
      //  console.log("碰");
        WndManager.root.main.spush.bumpCard(GameData.outCardCid);
        break;
        case "gang":
         //console.log("杠",GameData.outCardCid);
        if(GameData.outCardCid>0){
         WndManager.root.main.spush.barCard(GameData.outCardCid);
        }else{ 
           this.gameButton.operationButtonHide();
           this.gameContent.gangCard();
        }
        break;
        case "hu":
     //   console.log("胡");
         this.gameButton.operationButtonHide();
         WndManager.root.main.spush.endFlow(GameData.outCardCid);
        // this.operationButtonHide();
        break;
        case "guo":
        this.gameButton.operationButtonHide();
        WndManager.root.main.spush.overCard();
        break;
        case "menuList_watch"://观战
         WndManager.root.main.spush.watch();
        break;
        case "menuList_invitation"://邀请好友
         WndManager.switchWnd(ShareWnd, WIN_OPERATOR.WIN_OPEN_NEW);
        break;
        case "menuList_outRoom"://退出房间
         window.location.href=RES.getRes("configure_json").halllink+GameData.hallversion+"/index.html?page=2&key="+GameData.userkey+"&ghtid="+GameData.ghtid+"&gname="+GameData.gname;
        break;
        case "menuList_rule"://游戏规则
       if(this.newsList.visible==false){
       this.newsList.ruleOpen(GameData.gameRule);
       this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.newslistOut,this);
      }
        break;
     }
  }
  //
  public operationButtonHide(){
    this.gameButton.operationButtonHide();
  }
  //通信表情，文本，语音事件
  private communicateWndLayout(){
    switch(this.currentCommunicateButtonString){
     case "send_txt"://点击发送文本
       this.currentCommunicateWnd.scaleX=this.currentCommunicateWnd.scaleY=GameData.stageScale;
       this.currentCommunicateWnd.x=GameData.stageWidth*0.27;
       this.currentCommunicateWnd.y=GameData.stageHeight*0.19;
       break;
    case "send_emoji"://点击发送文本
       this.currentCommunicateWnd.scaleX=this.currentCommunicateWnd.scaleY=GameData.stageScale;
       this.currentCommunicateWnd.x=GameData.stageWidth*0.22;
       this.currentCommunicateWnd.y=GameData.stageHeight*0.19;
       break;
   }
  }
  private communicateClick(e:ButtonEvent):void{
          switch(e.name){
            case "write":
            var sendTxt:SendTxt=this.currentCommunicateWnd as SendTxt;
            var writeText:string=sendTxt.writeText;
            sendTxt=null;
           if(writeText.length==0){ 
              WndManager.root.main.alert.show(GameData.textJson[0],[{texture:"ok_png",code:100}]);
              return;
           }else{
             	WndManager.root.main.spush.sendTextEmoji("0"+writeText);
           }
            break;
            case "txt":
            WndManager.root.main.spush.sendTextEmoji("1"+GameData.sex+e.code);
             this.gameButton.textEnabled=false;
            egret.setTimeout(()=>{
               this.gameButton.textEnabled=true;
            },this,4000);
            break;
            case "emkji":
           	WndManager.root.main.spush.sendTextEmoji("2"+e.codeStr);
            this.gameButton.emojiEnabled=false;
            egret.setTimeout(()=>{
               this.gameButton.emojiEnabled=true;
            },this,4000);
            break;
          }
           if(this.currentCommunicateWnd!=null){
            this.currentCommunicateWnd.removeEventListener(ButtonEvent.CLICK,this.communicateClick,this);
            this.removeChild(this.currentCommunicateWnd);
            this.currentCommunicateWnd=null;
           }
  }
  //
  public startGames(){
           this.startGame.visible=false;
        this.gameContent.setDiceBanker();
  }
  //
  public UILayout(){
     this.bg.width=GameData.stageWidth;
     this.bg.height=GameData.stageHeight;
     this.logo.scaleX=this.logo.scaleY=GameData.stageScale;
     this.logo.x=GameData.stageWidth/2;
     this.logo.y=GameData.stageHeight/2;
     this.banner.scaleX=this.banner.scaleY=GameData.stageScale;
     //
     this.gameContent.UILayout();
     this.gameButton.UILayout();
      if(this.currentCommunicateWnd!=null){
         this.communicateWndLayout();
      }
     //
     this.startGame.scaleX=this.startGame.scaleY=GameData.stageScale;
     this.startGame.x=this.logo.x-325*GameData.stageScale/2;
     this.startGame.y=this.logo.y-80*GameData.stageScale;
     //
     this.newsList.scaleX=this.newsList.scaleY=GameData.stageScale;
     this.newsList.y=GameData.stageHeight*0.18;
     this.newsList.setHeight(GameData.stageHeight*0.82/GameData.stageScale);
     //
     this.systemSettings.scaleX=this.systemSettings.scaleY=GameData.stageScale; 
     this.systemSettings.x=GameData.stageWidth/2-(545/2)*GameData.stageScale;
     this.systemSettings.y=GameData.stageHeight/2-(336/2)*GameData.stageScale;
     //
     this.userDataGift.scaleX=this.userDataGift.scaleY=GameData.stageScale; 
     this.userDataGift.x=GameData.stageWidth*0.31;
     this.userDataGift.y=GameData.stageHeight*0.19;
     //
    // this.newsList.size(GameData.stageWidth*0.39,GameData.stageHeight*0.82);
  }
  //显示用户信息
  private userDatagiftXY:any=[{x:0.31,y:0.19},{x:0.59,y:0.07},{x:0.23,y:0.06},{x:0.02,y:0.07}];
  private userDatagiftPlace:number=0;
  public userDatagiftShow(place:number){
    var data:any=this.gameContent.getUserData(place);
   // console.log(place,data.tid);
    if(GameData.rstate==1&&GameData.tid!=data.tid){
        this.userDataGift.tirenEnabled=GameData.tid==GameData.ownerTid;
    }else this.userDataGift.tirenEnabled=false;
    this.userDatagiftPlace=place;
    this.userDataGift.setUserData(data.tid,data.nick,data.headimg);
    this.userDataGift.visible=true;
  //  this.userDataGift.x=GameData.stageWidth*this.userDatagiftXY[this.userDatagiftPlace].x;
   // this.userDataGift.y=GameData.stageHeight*this.userDatagiftXY[this.userDatagiftPlace].y;
    this.userDataGift.hideRecordData();
    WndManager.root.main.spush.showUserRecord(data.tid);
}
public showUserRecord(data:any){
 this.userDataGift.showRecordData(data.totalRound,data.winNum,data.escapeNum,data.tieNum);
}
  //用户信息退出
  public userDataGiftEvent(e:ButtonEvent):void{
     switch(e.name){
        case "close"://关闭窗口
        this.userDataGift.visible=false;
        break;
        case "tiren"://踢出玩家
        this.userDataGift.visible=false;
         WndManager.root.main.spush.tiren(e.code);
        break;
     }

  }
  //注销数据
  private deleteGameData(){
     this.gameContent.deleteGameData();
  }
  //时间
  public timers(){

  if(GameData.rstate==1){
  if(GameData.ctime>0){
      GameData.ctime--;
      this.startGame.ctimeTxt.text=MyUtils.secToTime(GameData.ctime);
  }
    }else {
       if(GameData.rtime>0){
         GameData.rtime--;
         this.banner.gameTimeTxt.text=MyUtils.secToTime(GameData.rtime);
       }
       this.gameContent.timers();
    }
    this.gameButton.timers();
  }

 
  //接收的消息
  public createRoom(){
        this.banner.roomIDTxt.textFlow = <Array<egret.ITextElement>>[
         {text: "房间号:", style: {"textColor": 0x95EE95}}
        ,{text:GameData.roomid.toString(), style: {"textColor": 0x95EE95}} 
        ];
         this.banner.stakeScoreTxt.textFlow = <Array<egret.ITextElement>>[
         {text: "底分:", style: {"textColor": 0x95EE95}}
        ,{text:GameData.bscore.toString(), style: {"textColor": 0x95EE95}} 
        ];
        this.banner.typeTxt.text=GameData.rtypeList[GameData.rtype];
         //
         this.startGame.rtimeTxt.text=MyUtils.secToTime(GameData.rtime);
         this.banner.gameTimeTxt.text=MyUtils.secToTime(GameData.rtime);
         this.startGame.rtypeTxt.text=GameData.rtypeList[GameData.rtype];
         this.startGame.theOwnerTxt.text=GameData.oname;
         //判断开始或者邀请按钮是否显示
         this.startGame.startEnabled=false;
        if(GameJudge.userPartake){
         if(GameData.ownerTid==GameData.tid){
           this.startGame.startEnabled=true
          if(GameJudge.userFull) {
            this.startGame.switchButton("start");
          }else  this.startGame.switchButton("invitation");
         } 
         this.gameContent.userRefresh();
        }//
         this.startGame.visible=true;
         this.gameButton.communicateShow=GameJudge.ownPartake;
  }
  public userRefresh(readRefresh:boolean=true){
         //判断开始或者邀请按钮是否显示
         if(GameData.rstate==1){
         this.startGame.startEnabled=false;
        if(GameJudge.userPartake){
         if(GameData.ownerTid==GameData.tid){
           this.startGame.startEnabled=true
          if(GameJudge.userFull) {
            this.startGame.switchButton("start");
          }else  this.startGame.switchButton("invitation");
         } 
        }//
         }
        //是否显示通信按钮
         this.gameButton.communicateShow=GameJudge.ownPartake;
         this.startGame.theOwnerTxt.text=GameData.oname;
        //
        this.gameContent.userRefresh(readRefresh);
  }
  private startGameEvent(e:ButtonEvent):void{
   // console.log(e.name);
    if(e.name=="start"){
        WndManager.root.main.spush.startGame();
    }else{
      WndManager.switchWnd(ShareWnd, WIN_OPERATOR.WIN_OPEN_NEW);
    }
  }
  //房获取房间的牌数据
  public roomCards(){
       this.banner.roomIDTxt.textFlow = <Array<egret.ITextElement>>[
         {text: "房间号:", style: {"textColor": 0x95EE95}}
        ,{text:GameData.roomid.toString(), style: {"textColor": 0x95EE95}} 
        ];
      this.banner.typeTxt.text=GameData.wrList[GameData.wr];
      this.banner.stakeScoreTxt.textFlow = <Array<egret.ITextElement>>[
         {text: "底分:", style: {"textColor": 0x95EE95}}
        ,{text:GameData.bscore.toString(), style: {"textColor": 0x95EE95}} 
        ];
      this.gameContent.roomCards();
      this.gameButton.communicateShow=GameJudge.ownPartake;
  }
  //吃碰胡动作
  public playerSelect(data:any){ 
    if(this.gameContent.userCardsLoadComplete){
      this.gameButton.operationButtonShowHide(data);
    }else{
     egret.setTimeout(()=>{
        this.playerSelect(data);
     },this,2000);
    }
  }
//退还金币消息提示
 public returnGold(data:any){
   var l:number=data.length;
   if(l>0){
     for(var i=0;i<l;i++){
        GameData.newslistData.push({type:2,roomid:data[i].content.split(",")[0],gold:data[i].content.split(",")[1],headimg:"resource/systemico.jpg"});
     }
    this.addUser();
   }
 }
 //用户进入消息提示
 public addUser(){
      this.gameButton.newsPlay();
      if(this.newsList.visible){
         this.newsList.show(GameData.newslistData);
      }
 }
 private newslistOut(e:egret.TouchEvent):void{
    var mouseX:number=e.stageX;
    var mouseY:number=e.stageY;
    if(this.newsList.hitTestPoint(mouseX,mouseY)==false){
      this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.newslistOut,this);
      this.newsList.hide();
    }
 }
 //退出系统设置
  private systemSettingsOut(e:egret.TouchEvent):void{
    var mouseX:number=e.stageX;
    var mouseY:number=e.stageY;
    if(this.systemSettings.hitTestPoint(mouseX,mouseY)==false){
      this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.systemSettingsOut,this);
      this.systemSettings.visible=false;
    }
 }
 //用户播放语音
   //加载语音
 private speakSound: egret.Sound;
 private speakSoundChannel: egret.SoundChannel;
 private userSoundPlayEnabled:boolean=false;//语音是否在播放
 private speakPlayTimer:number=0;
 public userSoundPlay(data:any){
     GameData.userSoundList.push(data);
     if(this.userSoundPlayEnabled==false){//语音如果没有在播放
         this.userSoundPlayEnabled=true;
         //var l:number=GameData.userSoundList.length;
         this.gameContent.userSpeechPlay(GameData.userSoundList[0].tid);
         this.gameButton.speechEnabled=false;
         this.speakPlayTimer=Number(GameData.userSoundList[0].time);
        // WndManager.root.main._jssdk.setLink(GameData.userSoundList[0].url);
         RES.getResByUrl(GameData.userSoundList[0].url,this.loadSpeakComplete,this,RES.ResourceItem.TYPE_SOUND);
         GameData.userSoundList.splice(0,1);
         WndManager.root.main.speakSoundPlay();
   }

     
 }
 private loadSpeakComplete(data){
      this.speakSound=data;
     // this.speakSound.type=egret.Sound.EFFECT;
      this.speakSoundChannel=this.speakSound.play(0,1);
    // this.speakSoundChannel.addEventListener(egret.Event.SOUND_COMPLETE,this.userSoundStop,this);
   // egret.log("加载",this.speakPlayTimer);
     egret.setTimeout(()=>{
       this.userSoundStop();
     },this,this.speakPlayTimer)
}
 //用户语音播放完毕
 private userSoundStop(){
  //  egret.log("播放完成")
  // this.speakSoundChannel.removeEventListener(egret.Event.SOUND_COMPLETE,this.userSoundStop,this);
   if(GameData.userSoundList.length>0){
   //  egret.log(GameData.userSoundList[0].url);
     this.gameContent.userSpeechPlay(GameData.userSoundList[0].tid);
     this.speakPlayTimer=Number(GameData.userSoundList[0].time);
     RES.getResByUrl(GameData.userSoundList[0].url,this.loadSpeakComplete,this,RES.ResourceItem.TYPE_SOUND);
   //  WndManager.root.main._jssdk.downloadVoice(GameData.userSoundList[0].sound);
     GameData.userSoundList.splice(0,1);
   }else{
   this.userSoundPlayEnabled=false;
   this.gameButton.speechEnabled=true;
   this.gameContent.userSpeechStop();
   WndManager.root.main.speakSoundStop();
   }
 }
   //删除对象的时候
    public Destroy() {
        super.Destroy();
        for(var i=0;i<this.numChildren;i++){
           egret.Tween.removeTweens(this.getChildAt(i));
        }
        this.userDataGift.removeEventListener(ButtonEvent.CLICK,this.userDataGiftEvent,this);
         this.gameButton.removeEventListener(ButtonEvent.CLICK,this.gameButtonEvent,this);
           this.startGame.removeEventListener(ButtonEvent.CLICK,this.startGameEvent,this);
           if(this.currentCommunicateWnd!=null){
            this.currentCommunicateWnd.removeEventListener(ButtonEvent.CLICK,this.communicateClick,this);
            this.removeChild(this.currentCommunicateWnd);
            this.currentCommunicateWnd=null;
           }
        console.log("删除游戏");
    }

 }