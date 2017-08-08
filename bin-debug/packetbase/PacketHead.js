var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PKT_TYPE2 = (function () {
    function PKT_TYPE2() {
    }
    return PKT_TYPE2;
}());
//客户端发送给服务端
PKT_TYPE2.C2S_PING = 1000; //心跳
PKT_TYPE2.S2C_PING = 1000; //心跳
PKT_TYPE2.MSG_CREATEROOM = 1001; //创建房间
PKT_TYPE2.MSG_ADDUSER = 10001; //用户加入
PKT_TYPE2.MSG_ADDWITNESS = 1002; //创建房间
PKT_TYPE2.MSG_SEATED = 1003; //坐下
PKT_TYPE2.MSG_USEROUT = 10002; //用户退出
PKT_TYPE2.ALERT = 100; //警告和提示
PKT_TYPE2.MSG_EXPANI = 1005; //文本和表情数据
PKT_TYPE2.MSG_STARTGAME = 1007; //房主开始游戏
PKT_TYPE2.MSG_FIXBANKER = 10003; //定庄家抛骰子(第一局掷骰子确定，后面局由前一局确定)
PKT_TYPE2.MSG_ROOMCARDS = 1008; //房间玩家的牌(发牌和回到房间用)
PKT_TYPE2.MSG_MENDFLOWER = 10004; //补花
PKT_TYPE2.MSG_PLAYERSELECT = 10005; //玩家可选操作(胡、杠、碰、吃)
PKT_TYPE2.MSG_WAITOUT = 10006; //等待玩家出牌
PKT_TYPE2.MSG_ADDHISTORY = 10007; //打出的牌放入历史
PKT_TYPE2.MSG_DRAWCARD = 10008; //玩家摸一张牌
PKT_TYPE2.MSG_OUTCARD = 1009; //玩家出牌
PKT_TYPE2.MSG_EATCARD = 1010; //玩家吃牌
PKT_TYPE2.MSG_BUMPCARD = 1011; //玩家碰牌
PKT_TYPE2.MSG_BARCARD = 1012; //玩家杠牌
PKT_TYPE2.MSG_OVERCARD = 1013; //过牌
PKT_TYPE2.MSG_HUFLOW = 1014; //胡牌或流局推送
PKT_TYPE2.MSG_PLAYERCARD = 10009; //所有玩家的牌(胡牌或流局时推送，结算弹窗后面的)
PKT_TYPE2.MSG_SETTLEMENT = 10010; //结算(结算弹窗内容)
PKT_TYPE2.MSG_PLAYAGAIN = 1015; //再来一局
PKT_TYPE2.MSG_WATCH = 1004; //观战   
PKT_TYPE2.MSG_BACKROOM = 10011; //玩家回到房间
PKT_TYPE2.GAMEGIDEND = 1014; //当局胡牌人
PKT_TYPE2.GAMETIMEREND = 10012; //房间时间结束
PKT_TYPE2.MSG_OWNERKICK = 1006; //房主踢人
PKT_TYPE2.MSG_SHOWRECORD = 1016; //个人战绩
PKT_TYPE2.MSG_SENDGIFT = 1017; //送礼 
PKT_TYPE2.MSG_CROWDOUT = 1018; //账号在其它地方登录
PKT_TYPE2.MSG_ROOMNULL = 10013; //房间不存在 
PKT_TYPE2.MSG_SPEAK = 1019; //语音 
PKT_TYPE2.MSG_SHOWBAR = 10014; //打开暗杠  ;
PKT_TYPE2.MSG_WITNESSLIST = 1020; //围观列表   请求和返回都是这个消息，请求不需要参数
__reflect(PKT_TYPE2.prototype, "PKT_TYPE2");
var CardContent = (function () {
    function CardContent() {
    }
    return CardContent;
}());
CardContent.TIAN_PAI_1 = 0x8c; //天牌1
CardContent.TIAN_PAI_2 = 0x4c; //天牌2
CardContent.DI_PAI_1 = 0x82; //地牌1
CardContent.DI_PAI_2 = 0x42; //地牌2
CardContent.REN_PAI_1 = 0x88; //人牌1
CardContent.REN_PAI_2 = 0x48; //人牌2
CardContent.E_PAI_1 = 0x84; //鹅牌1
CardContent.E_PAI_2 = 0x44; //鹅牌2
CardContent.MEI_PAI_1 = 0x2a; //梅牌1
CardContent.MEI_PAI_2 = 0x1a; //梅牌2
CardContent.CHANG_SAN_1 = 0x26; //长三1
CardContent.CHANG_SAN_2 = 0x16; //长三2
CardContent.BAN_DENG_1 = 0x24; //板凳1
CardContent.BAN_DENG_2 = 0x14; //板凳2
CardContent.FU_TOU_1 = 0x21; //斧头1
CardContent.FU_TOU_2 = 0x11; //斧头2
CardContent.HONT_TOU_1 = 0x8a; //红头1
CardContent.HONT_TOU_2 = 0x4a; //红头2
CardContent.GAO_JIAO_1 = 0x87; //高脚1
CardContent.GAO_JIAO_2 = 0x47; //高脚2
CardContent.TONG_CHUI_1 = 0x86; //铜锤1
CardContent.TONG_CHUI_2 = 0x46; //铜锤2
CardContent.SAN_LIU = 0x29; //三六
CardContent.SI_WU = 0x19; //四五
CardContent.SAN_WU = 0x28; //三五
CardContent.ER_LIU = 0x18; //二六
CardContent.SAN_SI = 0x27; //三四
CardContent.ER_WU = 0x17; //二五
CardContent.ER_SI = 0x600; //二四
CardContent.YI_SI = 0x25; //一四
CardContent.ER_SAN = 0x15; //二三
CardContent.YI_ER = 0x300; //一二
CardContent.CARDS_ID = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,
    9, 9, 10, 10, 11, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
CardContent.CARDS = [
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
    CardContent.YI_ER
];
CardContent.CARDS_NAME = ["天", "天", "地", "地", "人", "人", "鹅", "鹅", "梅", "梅",
    "长三", "长三", "板凳", "板凳", "斧头", "斧头", "红头十", "红头十", "高脚七",
    "高脚七", "铜锤六", "铜锤六", "三六", "四五", "三五", "二六", "三四", "二五",
    "二四", "一四", "二三", "一二"];
__reflect(CardContent.prototype, "CardContent");
//# sourceMappingURL=PacketHead.js.map