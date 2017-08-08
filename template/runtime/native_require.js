
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/socket/socket.js",
	"libs/modules/eui/eui.js",
	"libsrc/bin/weixinapi/weixinapi.js",
	"bin-debug/ui/WinBase.js",
	"bin-debug/ui/WndManager.js",
	"bin-debug/GameData.js",
	"bin-debug/GameJudge.js",
	"bin-debug/JSSDK.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/MainScene.js",
	"bin-debug/MyUtils.js",
	"bin-debug/NotityWnd.js",
	"bin-debug/packetbase/Packet.js",
	"bin-debug/packetbase/PacketHead.js",
	"bin-debug/packetbase/RevicePktEvent.js",
	"bin-debug/packetbase/SocketPush.js",
	"bin-debug/qrcode/QR8bitByte.js",
	"bin-debug/qrcode/QRBitBuffer.js",
	"bin-debug/qrcode/QRCode.js",
	"bin-debug/qrcode/QRCodeModel.js",
	"bin-debug/qrcode/QRErrorCorrectLevel.js",
	"bin-debug/qrcode/QRMaskPattern.js",
	"bin-debug/qrcode/QRMath.js",
	"bin-debug/qrcode/QRMode.js",
	"bin-debug/qrcode/QRPolynomial.js",
	"bin-debug/qrcode/QRRSBlock.js",
	"bin-debug/qrcode/QRUtil.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/ui/Notify.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/game_packet/CommonUtils.js",
	"bin-debug/wnd/AlertWnd.js",
	"bin-debug/wnd/EndWnd.js",
	"bin-debug/wnd/event/ButtonEvent.js",
	"bin-debug/wnd/event/JssdkEvent.js",
	"bin-debug/wnd/game/Banner.js",
	"bin-debug/wnd/game/Cards.js",
	"bin-debug/wnd/game/EatList.js",
	"bin-debug/wnd/game/EndButton.js",
	"bin-debug/wnd/game/GameButton.js",
	"bin-debug/wnd/game/GameContent.js",
	"bin-debug/wnd/game/GiftObject.js",
	"bin-debug/wnd/game/HeadImage.js",
	"bin-debug/wnd/game/NewsList.js",
	"bin-debug/wnd/game/NewsListObject.js",
	"bin-debug/wnd/game/SendEmoji.js",
	"bin-debug/wnd/game/SendTxt.js",
	"bin-debug/wnd/game/SpeechHint.js",
	"bin-debug/wnd/game/StartGame.js",
	"bin-debug/wnd/game/SystemSettings.js",
	"bin-debug/wnd/game/TextDialogue.js",
	"bin-debug/wnd/game/TextEmoji.js",
	"bin-debug/wnd/game/UserDataGift.js",
	"bin-debug/wnd/game/UserDirection.js",
	"bin-debug/wnd/game/UserIcon.js",
	"bin-debug/wnd/game/WatchObject.js",
	"bin-debug/wnd/GameWnd.js",
	"bin-debug/wnd/ShareWnd.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "exactFit",
		contentWidth: 1166,
		contentHeight: 720,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};