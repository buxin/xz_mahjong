var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene(main) {
        var _this = _super.call(this) || this;
        _this.soundPlay = true; //声音是否播放
        _this.soundImg = new eui.Image();
        _this.wndSlideOpenDelay = true;
        _this.musicPlayI = 0;
        _this.bgPlay = false;
        _this.soundImg2 = new eui.Image();
        _this.main = main;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this._int, _this);
        return _this;
    }
    MainScene.prototype._int = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._int, this);
        //界面层
        this.firstLayer = new WinBase();
        this.addChild(this.firstLayer);
        //弹窗层
        WndManager.root = this;
        this.wndmanager = new WndManager;
        this.addChild(this.wndmanager);
        RES.getResByUrl("resource/bg1.mp3", this.onSoundLoadOK1, this);
        //	console.log("1123");
        //this.onSoundLoadOK();
        this.notifyWnd = new NotityWnd(this);
        this.addChild(this.notifyWnd);
        //egret.setTimeout(()=>{
        this.addListener();
        //},this,1500)
    };
    MainScene.prototype.musicPlay = function () {
        if (this.bgPlay) {
            if (this.musicChannel != null)
                this.musicChannel.stop();
            this.musicChannel = this.musicBg.play(0, 1);
            this.musicPlayI++;
        }
        if (this.musicPlayI > 5)
            this.bgPlay = false;
    };
    MainScene.prototype.onSoundLoadOK1 = function (data) {
        //
        this.musicBg = data;
        this.bgPlay = true;
        WndManager.root.main._jssdk.init();
    };
    MainScene.prototype.onSoundLoadOK2 = function (data) {
        if (this.musicChannel != null)
            this.musicChannel.stop();
        this.musicBg = data;
        if (GameData.bgSoundPlay) {
            this.musicChannel = this.musicBg.play(0, 99);
        }
    };
    MainScene.prototype.soundEvent1 = function (e) {
        this.soundPlay = this.soundPlay == false;
        if (this.soundPlay) {
            //	this.soundImg.alpha=1;
            this.soundImg.texture = RES.getRes("bt3_png");
            //egret.Tween.get(this.soundImg,{ loop: true }).to({ scaleX: 0.8,scaleY: 0.8 },800).to({ scaleX: 1,scaleY: 1 },800); 
            this.musicChannel = this.musicBg.play(0, 99);
        }
        else {
            this.soundImg.texture = RES.getRes("bt31_png");
            if (this.musicChannel != null)
                this.musicChannel.stop();
        }
    };
    MainScene.prototype.addListener = function () {
        /**
         *
         RoomCodeInputWnd //房间密卡输入界面

         *
        */
        //   WndManager.switchWnd(RoomCodeInputWnd, WIN_OPERATOR.WIN_OPEN_NEW);
        WndManager.switchWnd(GameWnd, WIN_OPERATOR.WIN_OPEN_NEW);
        WndManager.root.main.addSocketPush();
    };
    MainScene.prototype.onSoundLoadOK = function () {
        this.bgMusic = document.getElementById("bgMusic");
    };
    MainScene.prototype.soundEvent = function (e) {
        this.soundPlay = !this.soundPlay;
        if (this.soundPlay) {
            egret.Tween.get(this.soundImg, { loop: true }).to({ rotation: 360 }, 1000);
            //this.musicChannel = this.musicBg.play(0,0);	
            this.bgMusic.play();
        }
        else {
            egret.Tween.removeTweens(this.soundImg);
            this.soundImg.rotation = 0;
            this.bgMusic.pause();
        }
    };
    return MainScene;
}(eui.UILayer));
MainScene.screen_width = 640;
MainScene.screen_height = 1036;
MainScene.SCALE_STAGE = 0.6;
MainScene.phone = "";
__reflect(MainScene.prototype, "MainScene");
//# sourceMappingURL=MainScene.js.map