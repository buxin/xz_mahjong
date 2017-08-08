var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    return GameData;
}());
//链接
GameData.socketRequest = "";
GameData.socketPort = 0;
GameData.path = "";
GameData.roomKey = "";
GameData.userkey = "";
GameData.ghtid = "";
GameData.gname = "";
GameData.hallversion = "";
//界面尺寸
GameData.refreshGoto = false; //是否是刷新进来的
GameData.rtypeList = ["西周麻将", "西周麻将", "西周麻将"]; //房间类型表
GameData.UIWidth = 1166;
GameData.UIHeight = 720;
GameData.userNumber = 4; //用户数量（4个）
//舞台大小
GameData.stageWidth = 1166;
GameData.stageHeight = 720;
GameData.stageScale = 1;
//
GameData.stageRotate = 0; //旋转角度
//影片对象
GameData.tid = 0; //游戏ID
GameData.nickname = ""; //昵称
GameData.head = ""; //自己的头像地址，只有坐下的时候才会参数
GameData.gameWndOpen = false; //是否打开了游戏
GameData.bgSoundPlay = true; //背景声音是否打开
//接收的数据
GameData.rstate = 0; //房间状态 1-未开局 2-游戏中 3-已到时间结束  
GameData.roomid = 0; //房间号
GameData.rtype = 1; //房间类型
GameData.bscore = 0; //低分
GameData.rtime = 0; //游戏开始后房间结束时间秒；
GameData.ctime = 0; //游戏未开始前的准备时间秒；
GameData.ownerTid = 0; //房主TID
GameData.plays = []; //坐下来的用户
GameData.oname = "无"; //房主昵称
GameData.banker = 0; //专家ID
GameData.dice1 = 1; //骰子1点数
GameData.dice2 = 1; //骰子2点数
GameData.gid = 1; //当前局
GameData.rid = 1; //总局数
GameData.wr = 1; //风圈(1-东风圈 2-南风圈 3-西风圈 4-北风圈)
GameData.wrList = ["", "东风圈", "南风圈", "西风圈", "北风圈"]; //风圈(1-东风圈 2-南风圈 3-西风圈 4-北风圈)
GameData.bnums = 0; //牌蹲上剩余牌数
GameData.act = 0; //当前动作
GameData.actid = 0; //当前动作玩家
GameData.oc = 0; //当前桌面出的牌
GameData.c = []; //当前动作对应的牌
GameData.hcards = []; //房间所有人牌信息
GameData.timerTid = 0; //当前计时的玩家
GameData.outCardCid = -1; //出牌的Cid
GameData.newslistData = []; //消息数据
GameData.endData = []; //结算数据
GameData.nouts = []; //禁止出的牌
GameData.sexList = ["n", "n", "l", "l"];
GameData.sex = "n"; //性别
GameData.sexI = "0"; //0 表示找不到性别 1是男性 2是女性
//文本内容
GameData.emojiMcData = []; //表情动画
GameData.gameEndTimer = false; //房间是否时间已结束
GameData.gotpGold = 100; //坐下的金币
GameData.gotpPay = false; //坐下是不用扣钱
GameData.currentSelectPlace = 0; //当前选择的位置
//系统设置
GameData.gameSound = true; //是否开启音效
GameData.dialectSound = "";
GameData.speakSoundPlay = false; //录音是否正在播放
GameData.userCurrentSpeak = false; //用户是否正在录制语音
//
GameData.result = 0; // 3流局 1自摸 2点炮
//
GameData.userSoundList = []; //用户录音列表
GameData.speakUp = ""; //语音上传接口
GameData.speakUrl = ""; //语音加载地址
GameData.speakUpload = ""; //上传
GameData.speakSec = 0; //录制的时间
GameData.userTextList = [{ id: 0, txt: "我等的花儿也谢了!" }]; //用户文本内容
GameData.userEmojiList = []; //用户表情列表
GameData.gameRule = ""; //游戏规则
//礼物
GameData.jewel = 0; //用户砖石
GameData.glist = []; //礼物
//
GameData.endButtonClick = false; //当局结束按钮是否点过
GameData.loginlink = "";
GameData.gameType = "";
GameData.jssdkUrl = "";
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map