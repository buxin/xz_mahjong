/*/////////////////////////////////////////////////////////////////////////////////////
//公共属性
tirenEnabled:boolean;//踢人是否激活
//公共方法
setUserData(tid:number,nick:string,headimg:string)//设置用户数据
tid 用户ID
nick 昵称
headimg 头像
----------
showRecordData(total:number,winNumber:number,flatNumber:number,failNumber:number);//显示战绩
total 总局数
winNumber 赢的局数
flatNumber 平的局数
failNumber 输的局数
---------
hideRecordData()//隐藏战绩数据
/////////////////////////////////////////////////////////////////////////////////////*/
class UserDataGift extends eui.Component{

  private maskMc:egret.Shape=new egret.Shape;
  private gules: eui.Image;
  private gameNumberTxt: eui.Label;
  private stateNumberTxt: eui.Label;
  private tirenButton:eui.Image;
  private closeButton: eui.Image;
  private nameTxt:eui.Label;
  private headContent:egret.Sprite=new egret.Sprite;
  private headBim:egret.Bitmap=new egret.Bitmap;
  private headDara:egret.Texture=null;
  private headUrl:string="";
  private loader: egret.URLLoader;
  private headMasMc: eui.Image;
  private _scroller: eui.Scroller;
  private _group: eui.Group;
  private page_left: eui.Rect;
  private page_right: eui.Rect;

  public constructor() {
		super();
	 	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/userdatagift.exml";
	}
  private onComplete():void{
		this.init();
    }
  private init():void{
  this.tirenButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tirenClick,this);
  this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeClick,this);
 // this.page_left.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pageEvent,this);
 // this.page_right.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pageEvent,this);
  this.visible=false;
	this.maskMc.mask=this.gules;
	this.addChild(this.maskMc);
  this.addChild(this.headContent);
  this.headContent.addChild(this.headBim);
  this.headContent.mask=this.headMasMc;
   this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeThis,this);
		}
    //
    private tid:number=0;
    private loadGift:boolean=true;
    private giftNumber:number=0;
    private giftObject:GiftObject[]=[];
    public setUserData(tid:number,nick:string,headimg:string){
         this.tid=tid;
         this.nameTxt.text=nick;
         this.head(headimg);
         this.giftNumber=GameData.glist.length;
        if(this.loadGift){//如果加载礼物
          this.loadGift=false;
        //  GameData.glist=[{id:0,jewel:3},{id:1,jewel:2},{id:2,jewel:2},{id:3,jewel:3},{id:4,jewel:5},{id:5,jewel:5}];
          var giftObject:GiftObject;
          for(var i=0;i<this.giftNumber;i++){
             giftObject=new GiftObject();
             giftObject.x=i*77;
             giftObject.jewel=GameData.glist[i].jewel;
             giftObject.txt.text=GameData.glist[i].jewel.toString();
             giftObject.gid=GameData.glist[i].id;
             giftObject.ico.texture=RES.getRes("giftico"+GameData.glist[i].id);
             this._group.addChild(giftObject);
             this.giftObject.push(giftObject);
             giftObject.addEventListener(egret.TouchEvent.TOUCH_TAP,this.giftClick,this);
             giftObject=null;
          }
        }
      //礼物是否可以点击
        var giftEnabled:boolean=true;
        var texture:string="giftico";
        if(this.tid==GameData.tid){//如果是自己给自己送礼
             giftEnabled=false;
             texture="gifticonull";
            //  WndManager.root.main.alert.show(GameData.textJson[7],[{texture:"ok_png",code:100}]);
         }else if(GameJudge.ownPartake==false){//如果自己没有坐下
              giftEnabled=false;
              texture="gifticonull";
         }
        for(var i=0;i<this.giftNumber;i++){
            console.log(texture+GameData.glist[i].id)
             this.giftObject[i].ico.texture=RES.getRes(texture+GameData.glist[i].id);
             this.giftObject[i].clickEnabled=giftEnabled;
        }
      //
       this._scroller.viewport.scrollH=0;
    }
    private giftClick(e:egret.TouchEvent):void{
         if(e.currentTarget.clickEnabled){//如果是自己给自己送礼
          if(GameData.jewel-e.currentTarget.jewel<0){
            // return;
             this.visible=false;
             WndManager.root.main.alert.show(GameData.textJson[9],[{texture:"ok_png",code:100}]);
          }else{ //成功送礼
            this.visible=false;
           GameData.jewel-=e.currentTarget.jewel;
           WndManager.root.main.spush.sendGift(this.tid,e.currentTarget.gid);
          }
         }     
     }
    private pageEvent(e:egret.TouchEvent):void{

        var value:number=Math.ceil(this._scroller.viewport.scrollH/77);
      //  console.log(value,this.giftNumber);
             if(e.currentTarget==this.page_left){
                 if(value>0){
                  value=this.giftNumber-(this.giftNumber-value)-1; 
                 }
             }else{
                  if(this.giftNumber>value+5){
                  value=this.giftNumber-(this.giftNumber-value)+1; 
                  }
             }
     //   console.log(value);
        this._scroller.viewport.scrollH=value*77;
    }
     private  head(url:string){
	       this.headUrl=url;
	      if(this.headDara!=null){
			  this.headDara.dispose();
			  this.headDara=null;
		  }
        //  RES.getResByUrl(url,this.loadComp,this,RES.ResourceItem.TYPE_IMAGE)
		if(this.loader!=null){
		    this.loader.removeEventListener(egret.Event.COMPLETE,this.imageComplete,this);
			this.loader=null;
		}
		 this.loader = new egret.URLLoader();
        //设置加载方式为纹理
         this.loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        //添加加载完成侦听
         this.loader.addEventListener(egret.Event.COMPLETE,this.imageComplete,this);
		    var request: egret.URLRequest = new egret.URLRequest(this.headUrl);
        //开始加载
         this.loader.load(request);
   }
   private imageComplete(e: egret.Event): void { 
	   this.loader.removeEventListener(egret.Event.COMPLETE,this.imageComplete,this);
     this.headDara= e.target.data;
     this.headBim.texture=this.headDara;
		 this.headBim.x=127;
		 this.headBim.y=20;
	   this.headBim.width=64;
	   this.headBim.height=64;
	   this.loader=null;

   }
   //踢人
   	private tirenClick(e:egret.TouchEvent):void{
      var event:ButtonEvent = new ButtonEvent(ButtonEvent.CLICK);
      event.name="tiren";
      event.code=this.tid;
      this.dispatchEvent(event);
    }
    		//点击关闭按钮
	 private closeClick(e:egret.TouchEvent):void{
      var event:ButtonEvent = new ButtonEvent(ButtonEvent.CLICK);
      event.name="close";
      this.dispatchEvent(event);
			}
    public set tirenEnabled(type:boolean){
     this.tirenButton.visible=type;
  }
   public get tirenEnabled():boolean{
	    return this.tirenButton.visible;
   }
   private angle:number=0;
   private gameNumber:number=0;
   private winNumber:number=0;
   private failNumber:number=0;
   private flatNumber:number=0;
   public hideRecordData(){
       this.gameNumberTxt.text="";
       this.stateNumberTxt.text="";
       this.maskMc.graphics.clear();
   }
   public showRecordData(total:number,winNumber:number,flatNumber:number,failNumber:number){
	  this.gameNumber=total;
    this.winNumber=winNumber;
    this.flatNumber=flatNumber;
	  this.failNumber=failNumber;
	 //
	  this.gameNumberTxt.text=this.gameNumber.toString();
 	  this.stateNumberTxt.text=this.winNumber.toString()+"/"+this.failNumber.toString()+"/"+this.flatNumber.toString();
	 //
	 this.angle=-1*((this.winNumber/this.gameNumber)*360);
   this.drawSector(this.maskMc,219,219,150,this.angle,-90,0xFF4F4F);  
   }
   private drawSector(mc:egret.Shape,x:number=200,y:number=200,r:number=100,angle:number=27,startFrom:number=270,color:any=0xff0000):void {  
    mc.graphics.clear();
	  mc.graphics.beginFill(color,1);  
     //remove this line to unfill the sector  
     /* the border of the secetor with color 0xff0000 (red) , you could replace it with any color  
     * you want like 0x00ff00(green) or 0x0000ff (blue). 
     */  
    // mc.graphics.lineStyle(0,0xff0000);  //自定义颜色  
     mc.graphics.lineStyle(2,color);   //使用传递进来的颜色  
     mc.graphics.moveTo(x,y);  
     angle=(Math.abs(angle)>360)?360:angle;  
     var n:number=Math.ceil(Math.abs(angle)/45);  
     var angleA:number=angle/n;  
     angleA=angleA*Math.PI/180;  
     startFrom=startFrom*Math.PI/180;  
     mc.graphics.lineTo(x+r*Math.cos(startFrom),y+r*Math.sin(startFrom));  
     for (var i=1; i<=n; i++) {  
         startFrom+=angleA;  
         var angleMid=startFrom-angleA/2;  
         var bx=x+r/Math.cos(angleA/2)*Math.cos(angleMid);  
         var by=y+r/Math.cos(angleA/2)*Math.sin(angleMid);  
         var cx=x+r*Math.cos(startFrom);  
         var cy=y+r*Math.sin(startFrom);  
         mc.graphics.curveTo(bx,by,cx,cy);  
     }  
     if (angle!=360) {  
         mc.graphics.lineTo(x,y);  
     }  
     mc.graphics.endFill();// if you want a sector without filling color , please remove this line. 

 } 
  	private removeThis(e:egret.Event):void{
		this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closeClick,this);
    this.tirenButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tirenClick,this);
   //  this.page_left.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.pageEvent,this);
 // this.page_right.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.pageEvent,this);
	  this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeThis,this);
    	if(this.loader!=null){
		    this.loader.removeEventListener(egret.Event.COMPLETE,this.imageComplete,this);
			this.loader=null;
		}
        console.log("移除用户数据窗口");
		}
 }