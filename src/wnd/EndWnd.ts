/*/////////////////////////////////////////////////////////////////////////////////////
//游戏界面

//公共方法

------------------
UILayout();//布局
/////////////////////////////////////////////////////////////////////////////////////*/
class EndWnd extends WinBase{



private _group: eui.Group;
private bg: eui.Image;
private bg0:eui.Rect;
private endButton:EndButton[]=[];
private hcid:number;
private sps:any;
private scs:any;
private hts:any;
private cardsMc:egret.Sprite=new egret.Sprite;
private ok:eui.Image;
private nullImage:eui.Image;
private htsTxt:eui.Label;
private totalTxt:eui.Label;
//
  public constructor() {
		super();
	  	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/end.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
    //
     var r:egret.Rectangle=new egret.Rectangle(23,20,572,254);  
     this.bg.scale9Grid=r;
     this.bg.width=972;
     this.bg.height=591;
     this.htsTxt.x=97;
     this.htsTxt.y=167;
     this.htsTxt.width=786;
     this.htsTxt.height=151;
     //
     this.hcid=GameData.endData.hcid;
     this.sps=GameData.endData.sps;//玩家结算数据
     this.scs=GameData.endData.scs;//胡的牌
     this.hts=GameData.endData.hts;//提示语
     //
     this.totalTxt.width=786;
     this.totalTxt.x=97;
     this.totalTxt.y=167+80;
     //
     //添加玩家数据按钮
     var l:number=this.sps.length;
     var endButton:EndButton;
     var clickI:number=-1;
     this.nullImage.visible=GameData.result==3;
     for(var i=0;i<l;i++){
        endButton=new EndButton();
        this.addChild(endButton);
        this.endButton.push(endButton);
        endButton.tid=this.sps[i].tid;
        endButton.nickTxt.text=this.sps[i].nick;
        if(this.sps[i].type==1){
           endButton.hp.visible=true;
           endButton.ico.visible=true;
           if(clickI==-1){
              clickI=i;
              this.addCards(this.sps[i].tid);
           }
        }else if(this.sps[i].type==2){
           endButton.dp.visible=true;
        }
         if(this.sps[i].wol>0){
         endButton.wolTxt.font=RES.getRes("end1Font_fnt");
         }
          endButton.wolTxt.text=this.sps[i].wol.toString();
          endButton.x=48+i*225;
          endButton.y=324;
          this._group.addChild(endButton);
          endButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.buttonClick,this);
          endButton=null;
     }
     //
     this.cardsMc.y=58;
     this._group.addChild(this.cardsMc);
     //
     this.ok.addEventListener(egret.TouchEvent.TOUCH_TAP,this.okClick,this);
     this.UILayout();
  }
   private okClick(e:egret.TouchEvent):void{
    // this.addCards(e.currentTarget.tid);
    GameData.endButtonClick=true;
    if(GameData.gameEndTimer){//如果房间已经被关闭
      if(GameJudge.ownPartake){
     WndManager.root.main.alert.show(GameData.textJson[4],[{texture:"go_png",code:1001},{texture:"ck_png",code:1002}]);
      }else{
          WndManager.root.main.alert.show(GameData.textJson[13],[{texture:"go_png",code:1001}]);
      }
    }else{
      WndManager.switchWnd(EndWnd,WIN_OPERATOR.WIN_CLOSE_DELETE);
      WndManager.root.main.spush.playAgin();
    }
  }
  private buttonClick(e:egret.TouchEvent):void{
     this.addCards(e.currentTarget.tid);
 
  }
  private currendTid:number=-1;
  private addCards(tid:number){
    if(this.currendTid==tid) return;
      //  console.log("添加牌");
    var l:number=this.scs.length;
     For:for(var i:number=0;i<l;i++){
         if(this.scs[i].tid==tid){
           //
           this.totalTxt.text="(合计: "+this.scs[i].total+" 台)";
           this.cardsMc.removeChildren();
           this.currendTid=tid;
            var cl:number=this.scs[i].cts.length;
            var cardsl:number=0;
            var cardsNum:number=0;
            var cardsW:number=0;
            var space:number=0;
            var tcid:number=0;
            var cid:number=0;
            var h:boolean=true;
            for(var t:number=0;t<cl;t++){
                cardsl=this.scs[i].cts[t].cards.length;
                tcid=this.scs[i].cts[t].tcid;
                for(var j:number=0;j<cardsl;j++){
                   cid=this.scs[i].cts[t].cards[j].cid;
                   var cards:Cards=new Cards();
			       cards.texture=RES.getRes("c0_"+ cid);
                   if(cid==this.hcid){
                      if(tcid==0&&h){
                        cards.texture=RES.getRes("black_c0_"+ cid);
                        h=false;
                      }
                   }
                   cards.width=54;
                   cards.height=81;
                   cards.x=space+cardsNum*54;
                   this.cardsMc.addChild(cards);
                   cards=null;
                   cardsNum++;
                 }
                if(tcid>0) space+=25;
            }
            //
            var hts:any=this.scs[i].hts;
            cl=hts.length;
            this.htsTxt.text="";
            for(t=0;t<cl;t++){
             if(hts[t].tai!=0) this.htsTxt.appendText(GameData.htsJson[hts[t].type]+" "+hts[t].tai+GameData.textJson[3]+"   ");
            }
           //
           //  cardsW=cardsNum*54+space;
           //
            this.cardsMc.x=972/2-this.cardsMc.width/2;
            break For;
         }
     }
  }
  public UILayout(){
      this._group.scaleX=this._group.scaleY=GameData.stageScale;
      this._group.x=GameData.stageWidth/2-(972*GameData.stageScale/2);
      this._group.y=GameData.stageHeight/2-(591*GameData.stageScale/2);
      this.bg0.width=GameData.stageWidth;
      this.bg0.height=GameData.stageHeight;
  }
   //删除对象的时候
    public Destroy() {
        super.Destroy();
        var l:number=this.endButton.length;
        for(var i=0;i<l;i++){
          this.endButton[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.buttonClick,this);
        }
         this.ok.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.okClick,this);
         this.endButton=null;
        console.log("删除结算");
    }

 }