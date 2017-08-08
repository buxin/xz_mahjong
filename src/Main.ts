//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
declare function  onStageSize(selectedFunc, thisValue): void;
class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
	public _jssdk:JSSDK=new JSSDK();
    //  public listJsonParser:ListJsonParser;
    public loadingView: LoadingUI; 
    public alert:AlertWnd;
    private transverseICO:eui.Image;
    protected createChildren(): void {
              //  alert(egret.localStorage.getItem("nlq"));
        //
       //  }else window.location.href=str+"?qzopenid="+MyUtils.getMyParamer("qzopenid")+"&goto="+Math.random();
        //
      //   alert(MyUtils.getMyParamer("goto"))
      
        // if(MyUtils.getMyParamer("goto")==null){
          //    window.location.href="http://www.amo9.com/games/jan/jlg/oauth3.do"+ document.location.search+"&goto=123";
           //  return;
        // }
        //
        GameData.socketRequest=MyUtils.getMyParamer("ip");
        GameData.socketPort=Number(MyUtils.getMyParamer("port"));
        GameData.path=MyUtils.getMyParamer("path");
        GameData.roomKey=MyUtils.getMyParamer("roomkey");
        GameData.userkey=MyUtils.getMyParamer("key");
        if(MyUtils.getMyParamer("ghtid")!=null){
            GameData.ghtid=MyUtils.getMyParamer("ghtid");
        }
        if(MyUtils.getMyParamer("gname")!=null){
            GameData.gname=MyUtils.getMyParamer("gname");
        }
         //
         this.name="_main";
         GameData.textJson=["西周麻将","西周麻将","西周麻将"];
         GameData.loginlink="http://www.naliqu.net/hall/";
         GameData.gameType="2";
         GameData.jssdkUrl="http://www.naliqu.net/jssdk/sign.do?url=";
         GameData.head="";
         this.addChild(this._jssdk);
        super.createChildren();
     //egret.localStorage.clear();
       // this.sc = new SeedController();
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        // initialize the Resource loading library
      //  egret.log("接口3");
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        //
     //   this.addEventListener(egret.Event.ADDED_TO_STAGE,()=>{
          //   this.stage.addEventListener(egret.Event.RESIZE,this.stageSize,this);
        //  var radio = window.devicePixelRatio || 1;
        //  egret.log(radio);
         // this.stage.setContentSize(this.stage.stageWidth*radio,this.stage.stageHeight*radio);
         // console.log("舞台大小",this.stage.stageWidth,this.stage.stageHeight)
      //     this.stageSize(null);
       // },this)
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("beforePreload"); 
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        //this.createScene();
        // console.log("onThemeLoadComplete");
        this.enterGame();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName == "beforePreload") {
         //   this.loadingView.setImg();
             GameData.textJson=RES.getRes("text_json").txt;
             GameData.htsJson=RES.getRes("text_json").hts;
             GameData.userTextList=RES.getRes("configure_json").speak;
             GameData.userEmojiList=RES.getRes("configure_json").emoji;
             GameData.gameRule=RES.getRes("text_json").rule;
             GameData.speakUrl=RES.getRes("configure_json").speakUrl;
             GameData.speakUpload="http://"+GameData.socketRequest+":"+GameData.socketPort+GameData.path.split("gameservice")[0]+"speak.do";
             GameData.loginlink=RES.getRes("configure_json").loginlink;
             GameData.gameType=RES.getRes("configure_json").gameType;
             GameData.jssdkUrl=RES.getRes("configure_json").jssdkUrl;
             GameData.speakUp=RES.getRes("configure_json").speakUp;
            // egret.localStorage.setItem("nlq","1");
             var str:string=egret.localStorage.getItem("nlq");
            if(str!="1"){
               window.location.href= GameData.loginlink+"oauth2.do?roomkey="+GameData.roomKey+"&gametype="+GameData.gameType+"&ghtid="+GameData.ghtid+"&gname="+GameData.gname;
            }else{
             this.transverseICO=new eui.Image(RES.getRes("hp_png"));
             this.loadingView = new LoadingUI(this);
             this.loadingView.main=this;
             this.addChild(this.loadingView);
             this.addChild(this._jssdk);
            }
            egret.localStorage.setItem("nlq","0")
          // egret.localStorage.clear();
            // console.log("-----");
        }
        if (event.groupName == "preload") {
             this.isResourceLoadEnd = true;
            // console.log("9999");
            //   //加载json
            //   this.listJsonParser = new ListJsonParser();
            //   this.listJsonParser.parser();
             this.enterGame();  
        }
               
    }
    private size(thisRef:any,w:number,h:number,radio:number,phone:string){
        var endW:number=0;
        var endH:number=0;
       // console.log(thisRef,w,h,"-------------");
        if(phone=="ios"){
            endW=w*radio;
            endH=h*radio;
        }else if(phone=="pc"){
            endW=w;
            endH=h;
        }else{
           endW=w*radio;
           endH=h*radio;
        }
          if(endW%2!=0) endW+=1;
          if(endH%2!=0) endH+=1;
          if(phone=="pc"||phone=="ios"){
          thisRef.stage.setContentSize(endW,endH);
         // thisRef.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
         // thisRef.stage.orientation = egret.OrientationMode.AUTO;
          if(phone=="pc"){
               thisRef.stage.orientation = egret.OrientationMode.AUTO;
          }else thisRef.stage.orientation = egret.OrientationMode.LANDSCAPE_FLIPPED;
           thisRef.stageSize(null);
          }
      //  if(thisRef.loadingView==null){
          
           //thisRef.showUI();
           
           // egret.log("w:",w);
           // egret.log("h:",h)
          //  egret.log("分辨率:",radio)
         //   egret.log("w*radio:",w*radio);
        //    egret.log("h*radio:",h*radio);
            
      //  }
    }
    public showUI(){
        //if(this.loadingView==null){
          
           // RES.loadGroup("preload"); 
      //  }
    }
    public loadGameGroup(){
           onStageSize(this.size,this)
        RES.loadGroup("preload"); 
    }
    public enterGame():void
    {
        // console.log("enterGame");
        if(this.isResourceLoadEnd && this.isThemeLoadEnd)
        {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            
            this.createScene();
        }
    }
    private createScene(){
       //  console.log(this.isThemeLoadEnd,this.isResourceLoadEnd);
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
      //  console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
      //  console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
           // egret.log("name:"+ event.resItem);
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    private textfield:egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */

    private mainScene:MainScene;
    public arrow:eui.Image;
    public devicemotion:boolean=false;
    public spush = new SocketPush; 
    protected startCreateScene(): void {
      //  console.log("2");
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        //RES.getResAsync("description_json", this.startAnimation, this);
        //egret.log("loading,,,,,,");
        //添加表情动画纹理数据
        var l:number=Math.min(GameData.userEmojiList.length,5);//最多添加5组表情
        for(var i=0;i<l;i++){
        var resJs = RES.getRes(GameData.userEmojiList[i].animation+"_json");
        var resPng = RES.getRes(GameData.userEmojiList[i].animation+"_png");
        GameData.emojiMcData.push(new egret.MovieClipDataFactory(resJs , resPng));
        }
        resJs = RES.getRes("gift_json");
        resPng = RES.getRes("gift_png");
        GameData.giftMcData=new egret.MovieClipDataFactory(resJs , resPng);
      //  console.log(GameData.textJson[0]);
        //
        this.mainScene = new MainScene(this);
        this.addChild(this.mainScene);
        this.alert=new AlertWnd();
        this.addChild(this.alert);
        this.alert.addEventListener(ButtonEvent.CLICK,this.alertClick,this);
        this.addChild(this.transverseICO);
        this.transverseICO.width=GameData.stageWidth;
        this.transverseICO.height=GameData.stageHeight;
         //
         this._jssdk.addEventListener(JssdkEvent.SENDSOUND,this.sendSpeech,this);
        // this._jssdk.addEventListener(JssdkEvent.SOUNDEND,this.soundEnd,this);
         //
         egret.setInterval(this.timerPlay,this,1000);
         /*
          
         console.log("http://192.168.1.58:8080/hall/enter.do?openid=o39HWv5fVYm20E3Gaa1EGgk9OZjw&nick=111");
         console.log("http://192.168.1.58:8080/hall/enter.do?openid=o39HWvyv5QRwxzdY08wTkc7tyw9Y&gametype=2&roomkey="+MyUtils.getMyParamer("roomkey"));
         console.log("http://192.168.1.58:8080/hall/enter.do?openid=o39HWv18zaIqaPqCrMBu5I4f1r9g&gametype=2&roomkey="+MyUtils.getMyParamer("roomkey"));
         console.log("http://192.168.1.58:8080/hall/enter.do?openid=o39HWv79xDci9Gk5QcZS_tHHU0oE&gametype=2&roomkey="+MyUtils.getMyParamer("roomkey"));
         console.log("http://192.168.1.58:8080/hall/enter.do?openid=o39HWvxkx-Fh38Qrtf1lzUFcdTQY&gametype=2&roomkey="+MyUtils.getMyParamer("roomkey"));
         console.log("http://192.168.1.58:8080/hall/enter.do?openid=o39HWvyrRESeBjDFxKZUovxSjn8M&gametype=2&roomkey="+MyUtils.getMyParamer("roomkey"));
         */
   }
    private sendSpeech(e:JssdkEvent):void{
         WndManager.root.main.spush.speak(e.code);
    }
     private soundEnd(e:JssdkEvent):void{

    }
    public addSocketPush(){
            this.spush = new SocketPush; 
            this.spush.InitSocket();
            if(egret.localStorage.getItem("mjSetDialectSound")!=null){
             GameData.dialectSound=egret.localStorage.getItem("mjSetDialectSound");
	         }
             console.log("sound","sound"+GameData.dialectSound);
            RES.loadGroup("sound"+GameData.dialectSound); 
            var url = RES.getRes("configure_json").hallversion;
           console.log(url);
           var urlloader = new egret.URLLoader();
            var req = new egret.URLRequest(url);
            req.method = egret.URLRequestMethod.GET;
            var self = this;
            urlloader.addEventListener(egret.Event.COMPLETE, (e) => {
                egret.log("v",e.target.data);
                GameData.hallversion=e.target.data;
            }, this);
           urlloader.load(req);
    }
    private alertClick(e:ButtonEvent):void{
       // console.log(e.code);
        switch(e.code){
            case 1007:case 100:
            this.alert.close();
            break;
            case 200://断线重连
            location.reload() 
            break;
            case 101://坐下
            GameData.gotpPay=true;
            WndManager.root.main.spush.seated(GameData.currentSelectPlace);
            this.alert.close();
            break; 
            case 1001://跳到大厅
            window.location.href=RES.getRes("configure_json").halllink+GameData.hallversion+"/index.html?page=2&key="+GameData.userkey+"&ghtid="+GameData.ghtid+"&gname="+GameData.gname;
            break;
            case 1002://跳到战绩
            window.location.href=RES.getRes("configure_json").halllink+GameData.hallversion+"/index.html?page=1&key="+GameData.userkey+"&gametype="+RES.getRes("configure_json").gameType+"&roomkey="+GameData.roomKey+"&ghtid="+GameData.ghtid+"&gname="+GameData.gname;
            break;
        }
    }
    private stageSize(e:egret.Event):void{
          GameData.stageWidth=this.stage.stageWidth;
          GameData.stageHeight=this.stage.stageHeight;
          GameData.stageScale=GameData.stageWidth/GameData.UIWidth;
           this.transverseICO.width=GameData.stageWidth;
            this.transverseICO.height=GameData.stageHeight;
         if(GameData.gameWndOpen){
            WndManager.getWnd(GameWnd).UILayout();
            if(WndManager.getWnd(ShareWnd)) WndManager.getWnd(ShareWnd).UILayout(); 	
            this.alert.UILayout(); 
            if(WndManager.getWnd(EndWnd)!=null){
                 WndManager.getWnd(EndWnd).UILayout();
            }
           }else{
             //  if(this.loadingView=null){
                    this.loadingView.UILayout(); 
             //  }
           }
      
      // 
    }
    private timerPlay(){
        if(GameData.gameWndOpen){
           WndManager.getWnd(GameWnd).timers();
        }
    }
    public transverse(type,rotate){
           if(rotate==true) {
           if(this.transverseICO)  this.transverseICO.visible=type;
           }else this.transverseICO.visible=false;
       // console.log("是否横屏"+type);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }
    //
      //加载语音
    private playSound: egret.Sound;
    private playSoundChannel: egret.SoundChannel;
    public soundPlay(sex:string,sound:string){
        if(GameData.gameSound&&GameData.speakSoundPlay==false&&GameData.userCurrentSpeak==false){
       //  console.log(sex+"_"+sound+"_mp3");
         RES.getResAsync(sex+GameData.dialectSound+"_"+sound+"_mp3", this.playSoundComplete, this);
        }
    }
     public userTextSoundPlay(sex:string,sound:string){
        if(GameData.gameSound&&GameData.speakSoundPlay==false&&GameData.userCurrentSpeak==false){
       //  console.log(sex+"_"+sound+"_mp3");
         RES.getResAsync(sex+"_"+sound+"_mp3", this.playSoundComplete, this);
        }
    }
     public soundGamePlay(sound:string){
          if(GameData.gameSound&&GameData.speakSoundPlay==false&&GameData.userCurrentSpeak==false){
         RES.getResAsync(sound+"_mp3", this.playSoundComplete, this);
          }
    }
    private playSoundComplete(data) {
       this.playSound = data; 
      if(this.playSound!=null) this.playSoundChannel = this.playSound.play(0,1);
    }
    public userCurrentSpeakPlay(){
          GameData.userCurrentSpeak=true;
        if(this.playSoundChannel!=null){
            this.playSoundChannel.stop();
            this.playSoundChannel=null;
        }
    }
     public userCurrentSpeakStop(){
         GameData.userCurrentSpeak=false;
    }
    public speakSoundPlay(){
        GameData.speakSoundPlay=true;
        if(this.playSoundChannel!=null) {
            this.playSoundChannel.stop();
            this.playSoundChannel=null;
        }
    }
    public speakSoundStop(){
        GameData.speakSoundPlay=false;
    }
    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
    //
}
