class GameData {
	public constructor() {
	}
	//链接
	static socketRequest:string="";
	static socketPort:number=0;
	static path:string="";
	static roomKey:string="";
	static userkey:string="";
	static ghtid:string="";
    static gname:string="";
	static hallversion:string="";
	//界面尺寸
	static refreshGoto:boolean=false;//是否是刷新进来的
	static rtypeList:string[]=["西周麻将","西周麻将","西周麻将"];//房间类型表
	static UIWidth:number=1166;
	static UIHeight:number=720;
	static userNumber:number=4;//用户数量（4个）
	//舞台大小
	static stageWidth:number=1166;
	static stageHeight:number=720;
	static stageScale:number=1;
	//
	static stageRotate:number=0;//旋转角度
	    //影片对象
	static tid:number=0; //游戏ID
	static nickname:string=""; //昵称
	static head:string="";//自己的头像地址，只有坐下的时候才会参数
	static gameWndOpen:boolean=false;//是否打开了游戏
	static bgSoundPlay:boolean=true;//背景声音是否打开
	//接收的数据
	static rstate:number=0;//房间状态 1-未开局 2-游戏中 3-已到时间结束  
	static roomid:number=0;//房间号
	static rtype:number=1;//房间类型
	static bscore:number=0;//低分
    static rtime:number=0;//游戏开始后房间结束时间秒；
	static ctime:number=0;//游戏未开始前的准备时间秒；
	static ownerTid:number=0;//房主TID
	static plays:any=[];//坐下来的用户
	static oname:string="无";//房主昵称
	static banker:number=0;//专家ID
	static dice1:number=1;//骰子1点数
	static dice2:number=1;//骰子2点数
	static gid:number=1;//当前局
	static rid:number=1;//总局数
	static wr:number=1;//风圈(1-东风圈 2-南风圈 3-西风圈 4-北风圈)
	static wrList:string[]=["","东风圈","南风圈","西风圈","北风圈"];//风圈(1-东风圈 2-南风圈 3-西风圈 4-北风圈)
	static bnums:number=0;//牌蹲上剩余牌数
	static act:number=0;//当前动作
	static actid:number=0;//当前动作玩家
	static oc:number=0;//当前桌面出的牌
	static c:any=[];//当前动作对应的牌
	static hcards:any=[];//房间所有人牌信息
	static timerTid:number=0;//当前计时的玩家
	static outCardCid:number=-1;//出牌的Cid
	static newslistData:any=[];//消息数据
	static endData:any=[];//结算数据
	static nouts:any=[];//禁止出的牌
	static sexList:string[]=["n","n","l","l"];
	static sex:string="n";//性别
	static sexI:string="0";//0 表示找不到性别 1是男性 2是女性
	//文本内容
    static emojiMcData:egret.MovieClipDataFactory[]=[];//表情动画
	static textJson;//文本内容
    static htsJson;//台文本内容
	static gameEndTimer:boolean=false;//房间是否时间已结束
	static gotpGold:number=100;//坐下的金币
	static gotpPay:boolean=false;//坐下是不用扣钱
	static currentSelectPlace:number=0;//当前选择的位置
	//系统设置
	static gameSound:boolean=true;//是否开启音效
	static dialectSound:string="";
	static speakSoundPlay:boolean=false;//录音是否正在播放
	static userCurrentSpeak:boolean=false;//用户是否正在录制语音
	//
	static result:number=0;// 3流局 1自摸 2点炮
	//
	static userSoundList:any=[];//用户录音列表
	static speakUp:string="";//语音上传接口
	static speakUrl:string="";//语音加载地址
	static speakUpload:string="";//上传
	static speakSec:number=0;//录制的时间
	static userTextList:any=[{id:0,txt:"我等的花儿也谢了!"}];//用户文本内容
	static userEmojiList:any=[];//用户表情列表
	static gameRule:string="";//游戏规则
	//礼物
	static jewel:number=0;//用户砖石
	static glist:any=[];//礼物
	static giftMcData:egret.MovieClipDataFactory;//礼物动画纹理 
	//
	static endButtonClick:boolean=false;//当局结束按钮是否点过
	static loginlink:string="";
	static gameType:string="";
	static jssdkUrl:string="";
}