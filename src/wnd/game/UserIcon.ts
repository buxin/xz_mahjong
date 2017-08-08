/*/////////////////////////////////////////////////////////////////////////////////////
//公共事件
事件对象类型: ClickEvent
属性： ClickEvent.CLICK  当座位或者头像被点击的时候执行
      值 targetObject 当前事件对象
------------- 
       
-------------

//公共属性
place:number 头像所在位置（只读） 0的位置是自己  0-3 逆时针循序
---------
emptyCode:number 座位的位置
-----------
tid:number //tid设置
--------
head:string//设置用户头像
-------
banker:boolean//显示专家
---------
ready:boolean//显示准备
-------
leave:number//设置离线时间 -1是不离线
-----
score:number;//积分设置
-----
sitDownEnabled:boolean;//坐下状态是否激活
//公共方法
clear();//清除座位信息
------
speechPlay();//语音播放
----
speechStop();//语音停止
/////////////////////////////////////////////////////////////////////////////////////*/
class UserIcon extends eui.Component{

//
  private _place:number=0;
	private emptyBim:eui.Image;
	public nameTxt:eui.Label;
	private scoreTxt:eui.Label;
	public tid:number=0;
	private button:eui.Rect;
	private headContent:egret.Sprite=new egret.Sprite;
    private headBg: eui.Image;
    private masMc: eui.Image;
    public emptyCode:number=0;
	public  sex:string="n";
	//
    private bankerBim: eui.Image;
    private readyBim: eui.Image;
	private leaveBim: eui.Image;
	private leaveTimerTxt
	private scoreBg: eui.Image;
	private speech:egret.MovieClip;


	
  public constructor(place:number) {
		super();
		  this._place=place;
	  	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/usericon.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
			//
		    var r:egret.Rectangle=new egret.Rectangle(10,4,33,24)
            this.scoreBg.scale9Grid=r;
			this.headContent.addChild(this.headBim)
			this.addChildAt(this.headContent,2);
			this.headContent.mask=this.masMc;
			this.headBg.visible=false;
	//	this.score=5;
			//
			//
			this.speech=MyUtils.createMovieClipByName("lb");
			this.speech.visible=false;
			this.addChild(this.speech);
			//
			this.addChild(this.button);
			this.button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.buttonClick,this);
		  this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeThis,this);
    }
	private leaveTimer:number=0;
	public  set leave(value:number){
       this.leaveTimer=value;
	   if(value>0){
         this.leaveBim.visible=true;
		 this.leaveTimerTxt.visible=true;
		  this.leaveTimerTxt.text=this.leaveTimer.toString();
	   }else{
         this.leaveBim.visible=false;
         this.leaveTimerTxt.visible=false;
	   }
	}
	public  get leave():number{
		return this.leaveTimer;
      // return this.leaveBim.visible;
	} 
	public timers(){
		if(this.leaveTimer>0){
         this.leaveTimer--;
		 this.leaveTimerTxt.text=this.leaveTimer.toString();
		}
	}
	public  set banker(type:boolean){
      this.bankerBim.visible=type;
	}
	public  get banker():boolean{
       return this.bankerBim.visible;
	}
    public  set read(type:boolean){
      this.readyBim.visible=type;
	}
	public  get read():boolean{
       return this.bankerBim.visible;
	} 
	public  set score(value:number){
      this.scoreTxt.text=value.toString();
	  this.scoreBg.visible=true;
	  this.scoreBg.width=this.scoreTxt.textWidth+20;
	  this.scoreBg.x=44-this.scoreBg.width/2;
	}
	public  get score():number{
       return Number(this.scoreTxt.text);
	}
	public get place():number{
     return this._place;
	}
	public clear(){
        this.tid=0;
		this.emptyBim.visible=true;
		this.nameTxt.text="";
		this.headBg.visible=false;
		this.bankerBim.visible=false;
		 if(this.headDara!=null){
			  this.headDara.dispose();
			  this.headDara=null;
		  }
        //  RES.getResByUrl(url,this.loadComp,this,RES.ResourceItem.TYPE_IMAGE)
		if(this.loader!=null){
		    this.loader.removeEventListener(egret.Event.COMPLETE,this.imageComplete,this);
			this.loader=null;
		}
	}
	//
	 private headBim:egret.Bitmap=new egret.Bitmap;
      private headDara:egret.Texture=null;
      private headUrl:string="";
      private loader: egret.URLLoader;
	  public set head(url:string){
			 	this.headBg.visible=true;
				this.emptyBim.visible=false;
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
  private  _sitDownEnabled:boolean=true;
  public set sitDownEnabled(type:boolean){
      this._sitDownEnabled=type;
	  if(this._sitDownEnabled){
          this.emptyBim.texture=RES.getRes("position2_png");
	  }else  this.emptyBim.texture=RES.getRes("position0_png");
  }
   public get sitDownEnabled():boolean{
	    return this._sitDownEnabled;
   }
  public get head():string{
   return this.headUrl;
  }
 private imageComplete(e: egret.Event): void { 
	   this.loader.removeEventListener(egret.Event.COMPLETE,this.imageComplete,this);
     this.headDara= e.target.data;
     this.headBim.texture=this.headDara;
		 this.headBim.x=13;
		 this.headBim.y=12;
	   this.headBim.width=64;
	   this.headBim.height=64;
	   this.loader=null;

   }
 //
 public speechPlay(){
     this.speech.visible=true;
	 this.speech.play(-1);
 }
 public speechStop(){
	 this.speech.stop();
	 this.speech.visible=false;
 }
	//点击头像按钮
	private buttonClick(e:egret.Event):void{
      var event:ButtonEvent = new ButtonEvent(ButtonEvent.CLICK);
			event.targetObject=this;
      this.dispatchEvent(event);
		}
		//移除自己的时候
		private removeThis(e:egret.Event):void{
		this.button.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.buttonClick,this);
	  this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeThis,this);
		 if(this.headDara!=null){
			  this.headDara.dispose();
			  this.headDara=null;
		  }
        //  RES.getResByUrl(url,this.loadComp,this,RES.ResourceItem.TYPE_IMAGE)
		if(this.loader!=null){
		    this.loader.removeEventListener(egret.Event.COMPLETE,this.imageComplete,this);
			this.loader=null;
		}
		console.log("移除头像");
		}
 }