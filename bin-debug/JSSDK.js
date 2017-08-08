/**
 * Created by d8q8 on 2015/1/19.
 * @class JSSDK
 * @constructor
 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JSSDK = (function (_super) {
    __extends(JSSDK, _super);
    //  private time: number = 25;
    function JSSDK() {
        var _this = _super.call(this) || this;
        _this.CLASS_NAME = "JSSDK";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    JSSDK.prototype.onAddToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //初始化
        this.init();
    };
    Object.defineProperty(JSSDK.prototype, "Title", {
        get: function () {
            return this.title;
        },
        set: function (str) {
            this.title = str;
            this.getSignPackage();
            // this.getWeiXinConfig();
            // this.getWeiXinShareTimeline();//分享朋友圈
            //      this.getWeiXinShareTimeline();
        },
        enumerable: true,
        configurable: true
    });
    JSSDK.prototype.setLink = function (link) {
        this.link = link;
        this.getSignPackage();
    };
    JSSDK.prototype.setTitle_Desc = function (name1, name2) {
        //  this.title = " 其实父母是世界上最会说谎的人";
        // this.title = "哇，" + name1 + "最适合服侍他的鲜肉居然是" + name2 + "！"
        this.desc = "家 是原点，你回来又离开，只有他们，默默地在原地等待";
        //   this.imgUrl = "http://www.mmh5.cn/game/yixiangren/icon" + ".png";
        // this.link = "http://www.mmh5.cn/game/ransao/getinf.php";
        this.getSignPackage();
    };
    JSSDK.prototype.setData = function (title, upday, photo, code) {
        this.title = title;
        this.link = "http://h5web.bluemp.net/mpapi/auth/?act=auth&type=userinfo&callback=http://www.amo9.com/games/jan/jlg/index.html?upday=" + code;
        // console.log(this.link);
        this.getSignPackage();
    };
    Object.defineProperty(JSSDK.prototype, "Desc", {
        get: function () {
            return this.desc;
        },
        set: function (str) {
            this.desc = str;
        },
        enumerable: true,
        configurable: true
    });
    JSSDK.prototype.setRoomLink = function (roomid) {
        this.desc = GameData.nickname + "邀您一起斗牛";
        //    console.log("http://www.amo9.com/games/paohuzi/oauth2.do?roomid="+roomid+"&pword="+pword)
        this.link = RES.getRes("configure_json").link + "?roomkey=" + GameData.roomKey + "&gametype=" + RES.getRes("configure_json").gameType;
        // console.log(this.link)
        this.getSignPackage();
    };
    /**
     * 初始化
     **/
    JSSDK.prototype.init = function () {
        //定义皮肤
        //   this.skinName = "skins.jssdk.ShareSkin"targe;type
        //  console.log("jssdkinit");    
        //初始化分享内容
        this.title = GameData.nickname + GameData.textJson[1] + GameData.roomid;
        this.desc = GameData.nickname + GameData.textJson[2];
        this.link = GameData.loginlink + "oauth2.do?roomkey=" + GameData.roomKey + "&gametype=" + GameData.gameType + "&ghtid=" + GameData.ghtid + "&gname=" + GameData.gname;
        this.imgUrl = GameData.head;
        this.url = GameData.jssdkUrl + encodeURIComponent(location.href.split("#")[0]);
        //获取签名
        this.getSignPackage();
    };
    /**
     * 获取签名分享
     */
    JSSDK.prototype.getSignPackage = function () {
        var _this = this;
        var urlloader = new egret.URLLoader();
        var req = new egret.URLRequest(this.url);
        urlloader.load(req);
        req.method = egret.URLRequestMethod.GET;
        urlloader.addEventListener(egret.Event.COMPLETE, function (e) {
            _this.signPackage = JSON.parse(e.target.data);
            //........................................................
            //基本配置
            _this.getWeiXinConfig();
            //下面可以加更多接口,可自行扩展
            var self = _this;
            var funcSucceed = function () {
                //下面可以加更多接口,可自行扩展
                // egret.log("接jssdk成功！!!");
                self.getWeiXinShareTimeline(); //分享朋友圈
                self.getWeiXinShareAppMessage(); //分享朋友
                self.getWeiXinShareQQ(); //分享QQ
                self.getWeiXinShareWeiBo(); //分享到腾讯微博
                //  if(GameData.loadBgMP3){
                //  wx.hideOptionMenu(null);
                //  wx.hideAllNonBaseMenuItem(null);
                wx.hideMenuItems({
                    menuList: ["menuItem:copyUrl", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                });
                WndManager.root.musicPlay();
                // }
            };
            var funcError = function (res) {
                self.init();
                // egret.log("jssdk链接失败!!!");
            };
            wx.ready(funcSucceed);
            wx.error(funcError);
        }, this);
    };
    /**
     * 获取微信配置
     */
    JSSDK.prototype.getWeiXinConfig = function () {
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
        bodyConfig.debug = false; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        bodyConfig.appId = this.signPackage.appId; // 必填，公众号的唯一标识
        bodyConfig.timestamp = this.signPackage.timestamp; // 必填，生成签名的时间戳
        bodyConfig.nonceStr = this.signPackage.nonceStr; // 必填，生成签名的随机串
        bodyConfig.signature = this.signPackage.signature; // 必填，签名，见附录1
        bodyConfig.jsApiList = [
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard' //查看微信卡包中的卡券接口
        ];
        wx.config(bodyConfig);
    };
    /**
     * 获取微信分享到朋友圈
     */
    JSSDK.prototype.getWeiXinShareTimeline = function () {
        // this.btn_sharetimeline.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=> {
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        bodyMenuShareTimeline.title = this.title;
        bodyMenuShareTimeline.link = this.link;
        bodyMenuShareTimeline.imgUrl = this.imgUrl;
        bodyMenuShareTimeline.trigger = function () {
            // alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeline.success = function () {
            //   WndManager.root.main.protocol.onshare(2);
            //  alert('已分享');
            // this.thisObj.shareComplete();
            //    if(WndManager.getWnd(Page4Wnd)!=null){
            //    WndManager.getWnd(Page4Wnd).out();
            //   WndManager.switchWnd(Page4Wnd, WIN_OPERATOR.WIN_CLOSE_DELETE);
            //  WndManager.switchWnd(Page5Wnd, WIN_OPERATOR.WIN_OPEN_NEW,WIN_EFFECT.EFFECT_WIN_OPEN_SCALE); 
            // }
        };
        bodyMenuShareTimeline.cancel = function () {
            //  alert('已取消');
        };
        bodyMenuShareTimeline.fail = function (res) {
            //  alert(JSON.stringify(res));
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
        // alert('已注册获取“分享到朋友圈”状态事件');
        // }, this);
    };
    /**
     * 获取微信分享到朋友
     */
    JSSDK.prototype.getWeiXinShareAppMessage = function () {
        // this.btn_shareappmessage.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=> {
        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = this.title;
        bodyMenuShareAppMessage.desc = this.desc;
        bodyMenuShareAppMessage.link = this.link;
        bodyMenuShareAppMessage.imgUrl = this.imgUrl;
        bodyMenuShareAppMessage.trigger = function () {
            //   alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = function () {
            //  WndManager.root.main.protocol.onshare(1);
            //  if(WndManager.getWnd(Page4Wnd)!=null){
            // WndManager.getWnd(Page4Wnd).out();
            //  WndManager.switchWnd(Page4Wnd, WIN_OPERATOR.WIN_CLOSE_DELETE);
            //  WndManager.switchWnd(Page5Wnd, WIN_OPERATOR.WIN_OPEN_NEW,WIN_EFFECT.EFFECT_WIN_OPEN_SCALE); 
            //  }
            // alert('已分享');
        };
        bodyMenuShareAppMessage.cancel = function () {
            // alert('已取消');
        };
        bodyMenuShareAppMessage.fail = function (res) {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
        // alert('已注册获取“发送给朋友”状态事件');
        //   }, this);
    };
    /**
     * 获取微信分享到QQ
     */
    JSSDK.prototype.getWeiXinShareQQ = function () {
        // this.btn_shareqq.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=> {
        var bodyMenuShareQQ = new BodyMenuShareQQ();
        bodyMenuShareQQ.title = this.title;
        bodyMenuShareQQ.desc = this.desc;
        bodyMenuShareQQ.link = this.link;
        bodyMenuShareQQ.imgUrl = this.imgUrl;
        bodyMenuShareQQ.trigger = function () {
            //  alert('用户点击分享到QQ');
        };
        bodyMenuShareQQ.complete = function (res) {
            //  alert(JSON.stringify(res));
        };
        bodyMenuShareQQ.success = function () {
            // alert('已分享');
            // this.thisObj.shareComplete();
        };
        bodyMenuShareQQ.cancel = function () {
            // alert('已取消');
        };
        bodyMenuShareQQ.fail = function (res) {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareQQ(bodyMenuShareQQ);
        //alert('已注册获取“分享到QQ”状态事件');
        //  }, this);
    };
    /**
     * 获取微信分享到腾讯微博
     */
    JSSDK.prototype.getWeiXinShareWeiBo = function () {
        var bodyMenuShareWeibo = new BodyMenuShareWeibo();
        bodyMenuShareWeibo.title = this.title;
        bodyMenuShareWeibo.desc = this.desc;
        bodyMenuShareWeibo.link = this.link;
        bodyMenuShareWeibo.imgUrl = this.imgUrl;
        bodyMenuShareWeibo.trigger = function () {
            //  alert('用户点击分享到微博');
        };
        bodyMenuShareWeibo.complete = function (res) {
            // alert(JSON.stringify(res));
        };
        bodyMenuShareWeibo.success = function () {
            // alert('已分享');
            // this.thisObj.shareComplete();
        };
        bodyMenuShareWeibo.cancel = function () {
            // alert('已取消');
        };
        bodyMenuShareWeibo.fail = function (res) {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareWeibo(bodyMenuShareWeibo);
        //alert('已注册获取“分享到微博”状态事件');
    };
    //语音
    JSSDK.prototype.startRecord = function () {
        wx.startRecord(null);
    };
    //停止录音
    JSSDK.prototype.stopRecord = function (send) {
        var thisJssdk = this;
        wx.stopRecord({
            success: function (res) {
                var localId = res.localId;
                if (send) {
                    thisJssdk.uploadVoice(localId);
                }
            }
        });
    };
    //上传语音接口
    JSSDK.prototype.uploadVoice = function (id) {
        var thisJssdk = this;
        wx.uploadVoice({
            localId: id,
            isShowProgressTips: 0,
            success: function (res) {
                var serverId = res.serverId; // 返回音频的服务器端ID
                var event = new JssdkEvent(JssdkEvent.SENDSOUND);
                event.code = serverId;
                thisJssdk.dispatchEvent(event);
                // WndManager.root.main.spush.sendTextEmoji("3"+serverId);
                //alert(serverId);
            }
        });
    };
    //下载语音接口
    JSSDK.prototype.downloadVoice = function (id) {
        var thisJssdk = this;
        wx.downloadVoice({
            serverId: id,
            isShowProgressTips: 0,
            success: function (res) {
                var localId = res.localId; // 返回音频的本地ID
                thisJssdk.playVoice(localId);
            }
        });
    };
    //播放录音
    JSSDK.prototype.playVoice = function (id) {
        var thisJssdk = this;
        wx.playVoice({
            localId: id // 需要播放的音频的本地ID，由stopRecord接口获得
        });
        wx.onVoicePlayEnd({
            success: function (res) {
                var localId = res.localId; // 返回音频的本地ID
                var event = new JssdkEvent(JssdkEvent.SOUNDEND);
                event.code = localId;
                thisJssdk.dispatchEvent(event);
            }
        });
    };
    /**
    * 批量显示菜单项
    */
    JSSDK.prototype.getWeixinShowMenuItems = function (arr_menu) {
        if (arr_menu === void 0) { arr_menu = null; }
        var _arr_menu = [
            //传播类
            "menuItem:share:appMessage",
            "menuItem:share:timeline",
            "menuItem:share:qq",
            "menuItem:share:weiboApp",
            "menuItem:favorite",
            "menuItem:share:facebook",
            "menuItem:share:QZone",
            //保护类
            "menuItem:editTag",
            "menuItem:delete",
            "menuItem:copyUrl",
            "menuItem:originPage",
            "menuItem:readMode",
            "menuItem:openWithQQBrowser",
            "menuItem:openWithSafari",
            "menuItem:share:email",
            "menuItem:share:brand" //一些特殊公众号
        ];
        if (arr_menu != null) {
            _arr_menu = arr_menu;
        }
        ;
        wx.showMenuItems({
            menuList: _arr_menu,
            success: function (res) {
                // alert('已显示“分享到朋友圈”等按钮');
            },
            fail: function (res) {
                // alert(JSON.stringify(res));
            }
        });
    };
    /**
    * 批量隐藏菜单项
    */
    JSSDK.prototype.getWeixinHideMenuItems = function (arr_menu) {
        if (arr_menu === void 0) { arr_menu = null; }
        var _arr_menu = [
            //传播类
            "menuItem:share:appMessage",
            "menuItem:share:timeline",
            "menuItem:share:qq",
            "menuItem:share:weiboApp",
            "menuItem:favorite",
            "menuItem:share:facebook",
            "menuItem:share:QZone",
            //保护类
            "menuItem:editTag",
            "menuItem:delete",
            "menuItem:copyUrl",
            "menuItem:originPage",
            "menuItem:readMode",
            "menuItem:openWithQQBrowser",
            "menuItem:openWithSafari",
            "menuItem:share:email",
            "menuItem:share:brand" //一些特殊公众号
        ];
        if (arr_menu != null) {
            _arr_menu = arr_menu;
        }
        ;
        //  this.btn_hideMenuItems.addEventListener(egret.TouchEvent.TOUCH_TAP,(e) => { 
        wx.hideMenuItems({
            menuList: _arr_menu,
            success: function (res) {
                //  alert('已隐藏所有传播和保护类按钮');
            },
            fail: function (res) {
                ///  alert(JSON.stringify(res));
            }
        });
        //  },this);
    };
    return JSSDK;
}(egret.DisplayObjectContainer));
__reflect(JSSDK.prototype, "JSSDK");
//# sourceMappingURL=JSSDK.js.map