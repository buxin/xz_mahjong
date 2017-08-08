interface PacketHead {
    pkt_len: number;
    pkt_type: number;
    read(by: egret.ByteArray):void;
    write(): egret.ByteArray;
}


class PKT_TYPE2{
    //客户端发送给服务端
    public static  C2S_PING					    = 1000;//心跳
    public static  S2C_PING					    = 1000;//心跳
    public static  MSG_CREATEROOM			    = 1001;//创建房间
    public static  MSG_ADDUSER			        = 10001;//用户加入
    public static  MSG_ADDWITNESS			    = 1002;//创建房间
    public static  MSG_SEATED					= 1003;//坐下
    public static  MSG_USEROUT			        = 10002;//用户退出
    public static  ALERT                        =100;//警告和提示
    public static  MSG_EXPANI					= 1005;//文本和表情数据
    public static  MSG_STARTGAME				= 1007;//房主开始游戏
    public static  MSG_FIXBANKER				= 10003;//定庄家抛骰子(第一局掷骰子确定，后面局由前一局确定)
    public static  MSG_ROOMCARDS				= 1008;//房间玩家的牌(发牌和回到房间用)
    public static  MSG_MENDFLOWER				= 10004;//补花
	public static  MSG_PLAYERSELECT			    = 10005;//玩家可选操作(胡、杠、碰、吃)
	public static  MSG_WAITOUT					= 10006;//等待玩家出牌
	public static  MSG_ADDHISTORY				= 10007;//打出的牌放入历史
	public static  MSG_DRAWCARD				    = 10008;//玩家摸一张牌
    public static  MSG_OUTCARD					= 1009;//玩家出牌
	public static  MSG_EATCARD					= 1010;//玩家吃牌
	public static  MSG_BUMPCARD				    = 1011;//玩家碰牌
	public static  MSG_BARCARD				 	= 1012;//玩家杠牌
	public static  MSG_OVERCARD			    	= 1013;//过牌
    public static  MSG_HUFLOW					= 1014;//胡牌或流局推送
    public static  MSG_PLAYERCARD				= 10009;//所有玩家的牌(胡牌或流局时推送，结算弹窗后面的)
	public static  MSG_SETTLEMENT				= 10010;//结算(结算弹窗内容)
    public static  MSG_PLAYAGAIN				= 1015;//再来一局
     public static MSG_WATCH				    = 1004;//观战   
     public static MSG_BACKROOM				    = 10011;//玩家回到房间
     public static GAMEGIDEND                   =1014;//当局胡牌人
     public static GAMETIMEREND                 =10012;//房间时间结束
     public static  MSG_OWNERKICK				= 1006;//房主踢人
      public static MSG_SHOWRECORD				= 1016;//个人战绩
      public static   MSG_SENDGIFT				= 1017;//送礼 
      public static  MSG_CROWDOUT				= 1018;//账号在其它地方登录
      public static  MSG_ROOMNULL				= 10013;//房间不存在 
      public static  MSG_SPEAK                  =1019;//语音 
      public static   MSG_SHOWBAR				= 10014;//打开暗杠  ;
      public static   MSG_WITNESSLIST			= 1020;//围观列表   请求和返回都是这个消息，请求不需要参数
    //游戏部分
   
} 




class CardContent {

    public static  TIAN_PAI_1		= 0x8c;//天牌1
    public static  TIAN_PAI_2		= 0x4c;//天牌2
    public static  DI_PAI_1		    = 0x82;//地牌1
    public static  DI_PAI_2		    = 0x42;//地牌2
    public static  REN_PAI_1		= 0x88;//人牌1
    public static  REN_PAI_2		= 0x48;//人牌2
    public static  E_PAI_1			= 0x84;//鹅牌1
    public static  E_PAI_2			= 0x44;//鹅牌2
    public static  MEI_PAI_1		= 0x2a;//梅牌1
    public static  MEI_PAI_2		= 0x1a;//梅牌2
    public static  CHANG_SAN_1		= 0x26;//长三1
    public static  CHANG_SAN_2		= 0x16;//长三2
    public static  BAN_DENG_1		= 0x24;//板凳1
    public static  BAN_DENG_2		= 0x14;//板凳2
    public static  FU_TOU_1		    = 0x21;//斧头1
    public static  FU_TOU_2		    = 0x11;//斧头2
    public static  HONT_TOU_1		= 0x8a;//红头1
    public static  HONT_TOU_2		= 0x4a;//红头2
    public static  GAO_JIAO_1		= 0x87;//高脚1
    public static  GAO_JIAO_2		= 0x47;//高脚2
    public static  TONG_CHUI_1		= 0x86;//铜锤1
    public static  TONG_CHUI_2		= 0x46;//铜锤2
    public static  SAN_LIU			= 0x29;//三六
    public static  SI_WU			= 0x19;//四五
    public static  SAN_WU			= 0x28;//三五
    public static  ER_LIU			= 0x18;//二六
    public static  SAN_SI			= 0x27;//三四
    public static  ER_WU			= 0x17;//二五
    public static  ER_SI			= 0x600;//二四
    public static  YI_SI			= 0x25;//一四
    public static  ER_SAN			= 0x15;//二三
    public static  YI_ER			= 0x300;//一二
	
    public static CARDS_ID =
    [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,
        9, 9, 10, 10, 11, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    public static CARDS = [
        CardContent.TIAN_PAI_1,
        CardContent.TIAN_PAI_2,
        CardContent.DI_PAI_1,
        CardContent.DI_PAI_2,
        CardContent.REN_PAI_1,
        CardContent.REN_PAI_2,
        CardContent.E_PAI_1,
        CardContent.E_PAI_2,
        CardContent.MEI_PAI_1,
        CardContent.MEI_PAI_2,
        CardContent.CHANG_SAN_1,
        CardContent.CHANG_SAN_2,
        CardContent.BAN_DENG_1,
        CardContent.BAN_DENG_2,
        CardContent.FU_TOU_1,
        CardContent.FU_TOU_2,
        CardContent.HONT_TOU_1,
        CardContent.HONT_TOU_2,
        CardContent.GAO_JIAO_1,
        CardContent.GAO_JIAO_2,
        CardContent.TONG_CHUI_1,
        CardContent.TONG_CHUI_2,
        CardContent.SAN_LIU,
        CardContent.SI_WU,
        CardContent.SAN_WU,
        CardContent.ER_LIU,
        CardContent.SAN_SI,
        CardContent.ER_WU,
        CardContent.ER_SI,
        CardContent.YI_SI,
        CardContent.ER_SAN,
        CardContent.YI_ER];
    public static CARDS_NAME = ["天", "天", "地", "地", "人", "人", "鹅", "鹅", "梅", "梅",
        "长三", "长三", "板凳", "板凳", "斧头", "斧头", "红头十", "红头十", "高脚七",
        "高脚七", "铜锤六", "铜锤六", "三六", "四五", "三五", "二六", "三四", "二五",
        "二四", "一四", "二三", "一二"];

}