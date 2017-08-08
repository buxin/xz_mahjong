/**
 * Created by d8q8 on 2015/1/19.
 * @class JSSDK
 * @constructor
 **/

interface SignPackage {
    appId: string;
    nonceStr: string;
    timestamp: number;
    signature: string;
    url: string;
}

class JSSDK extends egret.DisplayObjectContainer {
    public CLASS_NAME: string = "JSSDK";

    //  private btn_sharetimeline:egret.gui.Button;//分享朋友圈按钮
    // private btn_shareappmessage:egret.gui.Button;//分享朋友按钮
    //  private btn_shareqq:egret.gui.Button;//分享QQ按钮
    //  private btn_shareweibo:egret.gui.Button;//分享微博按钮
    
    //  private btn_showMenuItems: egret.gui.Button;//批量显示菜单项
    //  private btn_hideMenuItems: egret.gui.Button;//批量隐藏菜单项
    
    //  private title:egret.gui.TextArea;
    //   private desc:egret.gui.TextArea;
    //   private link:egret.gui.TextArea;
    //   private imgUrl:egret.gui.TextArea;

    
    private signPackage: SignPackage;
    private url: string;

    private title: string;
    private desc: string;
    public link: string;
    public imgUrl: string;
    public shareComplete: any;
    public thisObj: any;
    //  private time: number = 25;
   
    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    protected onAddToStage(e: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        //初始化
        this.init();
    }
    public get Title(): string {
        return this.title;
    }

    public setLink(link: string): void {
        this.link = link;
        this.getSignPackage();
    }
    public setTitle_Desc(name1: string,name2: string): void {
      //  this.title = " 其实父母是世界上最会说谎的人";
        // this.title = "哇，" + name1 + "最适合服侍他的鲜肉居然是" + name2 + "！"
        this.desc = "家 是原点，你回来又离开，只有他们，默默地在原地等待";
     //   this.imgUrl = "http://www.mmh5.cn/game/yixiangren/icon" + ".png";
       // this.link = "http://www.mmh5.cn/game/ransao/getinf.php";
        this.getSignPackage();
    }
    public setData(title: string,upday:string,photo:string,code:string): void {
        this.title = title;
        this.link = "http://h5web.bluemp.net/mpapi/auth/?act=auth&type=userinfo&callback=http://www.amo9.com/games/jan/jlg/index.html?upday="+code;
       // console.log(this.link);
        this.getSignPackage();
    }
    public set Title(str: string) {

        this.title = str;
        this.getSignPackage();
        // this.getWeiXinConfig();
        // this.getWeiXinShareTimeline();//分享朋友圈
        //      this.getWeiXinShareTimeline();
    }
    public get Desc(): string {
        return this.desc;
    }
    public set Desc(str: string) {
 
        this.desc = str;
    }
     public setRoomLink(roomid:string){
        this.desc = GameData.nickname+"邀您一起斗牛";
    //    console.log("http://www.amo9.com/games/paohuzi/oauth2.do?roomid="+roomid+"&pword="+pword)
        this.link = RES.getRes("configure_json").link+"?roomkey="+GameData.roomKey+"&gametype="+RES.getRes("configure_json").gameType;
     // console.log(this.link)
        this.getSignPackage();
    }
    /**
     * 初始化
     **/
    public init() {
        //定义皮肤
        //   this.skinName = "skins.jssdk.ShareSkin"targe;type
      //  console.log("jssdkinit");    
        //初始化分享内容
        this.title = GameData.nickname+GameData.textJson[1]+GameData.roomid;
        this.desc = GameData.nickname+GameData.textJson[2];
        this.link =  GameData.loginlink+"oauth2.do?roomkey="+GameData.roomKey+"&gametype="+GameData.gameType+"&ghtid="+GameData.ghtid+"&gname="+GameData.gname;
        this.imgUrl =GameData.head;
        this.url = GameData.jssdkUrl+ encodeURIComponent(location.href.split("#")[0]);
        //获取签名
        this.getSignPackage();
    }

    /**
     * 获取签名分享
     */
    private getSignPackage() {
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(this.url);
        urlloader.load(req);
        req.method = egret.URLRequestMethod.GET;
        urlloader.addEventListener(egret.Event.COMPLETE,(e) => {
            this.signPackage = <SignPackage>JSON.parse(e.target.data);
            //........................................................
            //基本配置
            this.getWeiXinConfig();
            //下面可以加更多接口,可自行扩展
            var self = this;
            var funcSucceed = () => {
                //下面可以加更多接口,可自行扩展
                // egret.log("接jssdk成功！!!");

                self.getWeiXinShareTimeline();//分享朋友圈
                self.getWeiXinShareAppMessage();//分享朋友
                self.getWeiXinShareQQ();//分享QQ
                self.getWeiXinShareWeiBo();//分享到腾讯微博
              //  if(GameData.loadBgMP3){
              //  wx.hideOptionMenu(null);
              //  wx.hideAllNonBaseMenuItem(null);
               wx.hideMenuItems({
                menuList:["menuItem:copyUrl","menuItem:readMode", "menuItem:openWithQQBrowser","menuItem:openWithSafari","menuItem:share:email"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
               });
                 WndManager.root.musicPlay();
               // }
            };

            var funcError = (res) => {
                self.init();
                // egret.log("jssdk链接失败!!!");
            }

            wx.ready(funcSucceed);
            wx.error(funcError);
        },this);
    }

    /**
     * 获取微信配置
     */
    private getWeiXinConfig() {
        /*
         * 注意：
         * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
         * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
         * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
         *
         * 如有问题请通过以下渠道反馈：
         * 邮箱地址：weixin-open@qq.com
         * 邮件主题：【微信JS-SDK反馈】具体问题
         * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
         */
        //配置参数
        var bodyConfig = new BodyConfig();
        bodyConfig.debug = false;// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        bodyConfig.appId = this.signPackage.appId;// 必填，公众号的唯一标识
        bodyConfig.timestamp = this.signPackage.timestamp;// 必填，生成签名的时间戳
        bodyConfig.nonceStr = this.signPackage.nonceStr;// 必填，生成签名的随机串
        bodyConfig.signature = this.signPackage.signature;// 必填，签名，见附录1
        bodyConfig.jsApiList = [// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',//判断当前客户端是否支持指定JS接口
            'onMenuShareTimeline',//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            'onMenuShareAppMessage',//获取“分享给朋友”按钮点击状态及自定义分享内容接口
            'onMenuShareQQ',//获取“分享到QQ”按钮点击状态及自定义分享内容接口
            'onMenuShareWeibo',//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
            'hideMenuItems',//批量隐藏功能按钮接口
            'showMenuItems',//批量显示功能按钮接口
            'hideAllNonBaseMenuItem',//隐藏所有非基础按钮接口
            'showAllNonBaseMenuItem',//显示所有功能按钮接口
            'translateVoice',//识别音频并返回识别结果接口
            'startRecord',//开始录音接口
            'stopRecord',//停止录音接口
            'playVoice',//播放语音接口
            'pauseVoice',//暂停播放接口
            'stopVoice',//停止播放接口
            'uploadVoice',//上传语音接口
            'downloadVoice',//下载语音接口
            'chooseImage',//拍照或从手机相册中选图接口
            'previewImage',//预览图片接口
            'uploadImage',//上传图片接口
            'downloadImage',//下载图片接口
            'getNetworkType',//获取网络状态接口
            'openLocation',//使用微信内置地图查看位置接口
            'getLocation',//获取地理位置接口
            'hideOptionMenu',//隐藏右上角菜单接口
            'showOptionMenu',//显示右上角菜单接口
            'closeWindow',//关闭当前网页窗口接口
            'scanQRCode',//调起微信扫一扫接口
            'chooseWXPay',//发起一个微信支付请求
            'openProductSpecificView',//跳转微信商品页接口
            'addCard',//批量添加卡券接口
            'chooseCard',//调起适用于门店的卡券列表并获取用户选择列表
            'openCard'//查看微信卡包中的卡券接口
        ];
        wx.config(bodyConfig);
    }

    /**
     * 获取微信分享到朋友圈
     */
    private getWeiXinShareTimeline() {
        // this.btn_sharetimeline.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=> {
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        bodyMenuShareTimeline.title = this.title;
        bodyMenuShareTimeline.link = this.link;
        bodyMenuShareTimeline.imgUrl = this.imgUrl;
        bodyMenuShareTimeline.trigger = () => {
            // alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeline.success = () => {
           //   WndManager.root.main.protocol.onshare(2);
            //  alert('已分享');
           // this.thisObj.shareComplete();
       //    if(WndManager.getWnd(Page4Wnd)!=null){
           //    WndManager.getWnd(Page4Wnd).out();
             //   WndManager.switchWnd(Page4Wnd, WIN_OPERATOR.WIN_CLOSE_DELETE);
              //  WndManager.switchWnd(Page5Wnd, WIN_OPERATOR.WIN_OPEN_NEW,WIN_EFFECT.EFFECT_WIN_OPEN_SCALE); 
          // }
        };
        bodyMenuShareTimeline.cancel = () => {
            //  alert('已取消');
        };
        bodyMenuShareTimeline.fail = (res) => {
            //  alert(JSON.stringify(res));
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
        // alert('已注册获取“分享到朋友圈”状态事件');
        // }, this);
    }

    /**
     * 获取微信分享到朋友
     */
    private getWeiXinShareAppMessage() {
        // this.btn_shareappmessage.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=> {
        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = this.title;
        bodyMenuShareAppMessage.desc = this.desc;
        bodyMenuShareAppMessage.link = this.link;
        bodyMenuShareAppMessage.imgUrl = this.imgUrl;
        bodyMenuShareAppMessage.trigger = () => {
            //   alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = () => {
           //  WndManager.root.main.protocol.onshare(1);
           //  if(WndManager.getWnd(Page4Wnd)!=null){
               // WndManager.getWnd(Page4Wnd).out();
              //  WndManager.switchWnd(Page4Wnd, WIN_OPERATOR.WIN_CLOSE_DELETE);
              //  WndManager.switchWnd(Page5Wnd, WIN_OPERATOR.WIN_OPEN_NEW,WIN_EFFECT.EFFECT_WIN_OPEN_SCALE); 
         //  }
            // alert('已分享');
        };
        bodyMenuShareAppMessage.cancel = () => {
            // alert('已取消');
        };
        bodyMenuShareAppMessage.fail = (res) => {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
        // alert('已注册获取“发送给朋友”状态事件');
        //   }, this);
    }

    /**
     * 获取微信分享到QQ
     */
    private getWeiXinShareQQ() {
        // this.btn_shareqq.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=> {
        var bodyMenuShareQQ = new BodyMenuShareQQ();
        bodyMenuShareQQ.title = this.title;
        bodyMenuShareQQ.desc = this.desc;
        bodyMenuShareQQ.link = this.link;
        bodyMenuShareQQ.imgUrl = this.imgUrl;
        bodyMenuShareQQ.trigger = () => {
            //  alert('用户点击分享到QQ');
        };
        bodyMenuShareQQ.complete = (res) => {
            //  alert(JSON.stringify(res));
        };
        bodyMenuShareQQ.success = () => {
            // alert('已分享');
           // this.thisObj.shareComplete();
        };
        bodyMenuShareQQ.cancel = () => {
            // alert('已取消');
        };
        bodyMenuShareQQ.fail = (res) => {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareQQ(bodyMenuShareQQ);
        //alert('已注册获取“分享到QQ”状态事件');
        //  }, this);
    }

    /**
     * 获取微信分享到腾讯微博
     */
    private getWeiXinShareWeiBo() {

        var bodyMenuShareWeibo = new BodyMenuShareWeibo();
        bodyMenuShareWeibo.title = this.title;
        bodyMenuShareWeibo.desc = this.desc;
        bodyMenuShareWeibo.link = this.link;
        bodyMenuShareWeibo.imgUrl = this.imgUrl;
        bodyMenuShareWeibo.trigger = () => {
            //  alert('用户点击分享到微博');
        };
        bodyMenuShareWeibo.complete = (res) => {
            // alert(JSON.stringify(res));
        };
        bodyMenuShareWeibo.success = () => {
            // alert('已分享');
           // this.thisObj.shareComplete();
        };
        bodyMenuShareWeibo.cancel = () => {
            // alert('已取消');
        };
        bodyMenuShareWeibo.fail = (res) => {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareWeibo(bodyMenuShareWeibo);
        //alert('已注册获取“分享到微博”状态事件');
      
        
    }
    //语音
    public startRecord(){
       wx.startRecord(null);
    }
    //停止录音
    public stopRecord(send:boolean){
        var thisJssdk=this;
        wx.stopRecord({
         success: function (res) {
          var localId = res.localId;
          if(send){
          thisJssdk.uploadVoice(localId);
          }
         }
    });
    }
    //上传语音接口
    public uploadVoice(id){
        var thisJssdk=this;
        wx.uploadVoice({
        localId: id, // 需要上传的音频的本地ID，由stopRecord接口获得
     isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function (res) {
        var serverId = res.serverId; // 返回音频的服务器端ID
        var event:JssdkEvent = new JssdkEvent(JssdkEvent.SENDSOUND);
        event.code=serverId;
        thisJssdk.dispatchEvent(event);
        // WndManager.root.main.spush.sendTextEmoji("3"+serverId);
        //alert(serverId);
    }
    });
    }
    //下载语音接口
    public downloadVoice(id){
         var thisJssdk=this;
        wx.downloadVoice({
        serverId:id, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function (res) {
           var localId = res.localId; // 返回音频的本地ID
           thisJssdk.playVoice(localId);
       }
       });
    }
    //播放录音
    public playVoice(id){
         var thisJssdk=this;
        wx.playVoice({
         localId: id // 需要播放的音频的本地ID，由stopRecord接口获得
      });
    wx.onVoicePlayEnd({
    success: function (res) {
        var localId = res.localId; // 返回音频的本地ID
        var event:JssdkEvent = new JssdkEvent(JssdkEvent.SOUNDEND);
        event.code=localId;
        thisJssdk.dispatchEvent(event);
    }
   });
    }
    /**
    * 批量显示菜单项
    */
    private getWeixinShowMenuItems(arr_menu: any[] = null) {
        var _arr_menu: any[] = [
        //传播类
            "menuItem:share:appMessage",//发送给朋友
            "menuItem:share:timeline",//分享到朋友圈
            "menuItem:share:qq",//分享到QQ
            "menuItem:share:weiboApp",//分享到Weibo
            "menuItem:favorite",//收藏
            "menuItem:share:facebook",//分享到FB
            "menuItem:share:QZone",//分享到 QQ 空间
            
        //保护类
            "menuItem:editTag",//编辑标签
            "menuItem:delete",//删除
            "menuItem:copyUrl",//复制链接
            "menuItem:originPage",//原网页
            "menuItem:readMode",//阅读模式
            "menuItem:openWithQQBrowser",//在QQ浏览器中打开
            "menuItem:openWithSafari",//在Safari中打开
            "menuItem:share:email",//邮件
            "menuItem:share:brand" //一些特殊公众号
        ];
        if(arr_menu != null) {
            _arr_menu = arr_menu;
        };

        wx.showMenuItems({
            menuList: _arr_menu,
            success: (res) => {
                // alert('已显示“分享到朋友圈”等按钮');
            },
            fail: (res) => {
                // alert(JSON.stringify(res));
            }
        });

    }
    
    /**
    * 批量隐藏菜单项
    */
    private getWeixinHideMenuItems(arr_menu: any[] = null) {
        var _arr_menu: any[] = [
        //传播类
            "menuItem:share:appMessage",//发送给朋友
            "menuItem:share:timeline",//分享到朋友圈
            "menuItem:share:qq",//分享到QQ
            "menuItem:share:weiboApp",//分享到Weibo
            "menuItem:favorite",//收藏
            "menuItem:share:facebook",//分享到FB
            "menuItem:share:QZone",//分享到 QQ 空间
            
        //保护类
            "menuItem:editTag",//编辑标签
            "menuItem:delete",//删除
            "menuItem:copyUrl",//复制链接
            "menuItem:originPage",//原网页
            "menuItem:readMode",//阅读模式
            "menuItem:openWithQQBrowser",//在QQ浏览器中打开
            "menuItem:openWithSafari",//在Safari中打开
            "menuItem:share:email",//邮件
            "menuItem:share:brand" //一些特殊公众号
        ];
        if(arr_menu != null) {
            _arr_menu = arr_menu;
        };
        //  this.btn_hideMenuItems.addEventListener(egret.TouchEvent.TOUCH_TAP,(e) => { 
        wx.hideMenuItems({
            menuList: _arr_menu,
            success: (res) => {
                //  alert('已隐藏所有传播和保护类按钮');
            },
            fail: (res) => {
                ///  alert(JSON.stringify(res));
            }
        });
        //  },this);
    }
}