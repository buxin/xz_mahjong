/*/////////////////////////////////////////////////////////////////////////////////////
//公共事件
事件对象类型: CardsEvent
属性： CardsEvent.CLICK //牌点击事件
参数： name:点击的牌的编号  
       值:start 点了开始按钮
			    invitation 点了邀请按钮
-------------

//公共属性
-----------
startEnabled:boolean//是否显示开始按钮
//公共方法
switchButton(type:string);//切换按钮
type:"invitation" 显示邀请按钮
type:"start"  开始按钮
------------------

/////////////////////////////////////////////////////////////////////////////////////*/
class StartGame extends eui.Component{
//
public rtimeTxt: eui.Label;
public theOwnerTxt: eui.Label;
public otherTxt: eui.Label;
public rtypeTxt: eui.Label;
public ctimeTxt: eui.Label;
private startButton:eui.Image;
//
  public constructor() {
	  	super();
	  	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/startgame.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
		this.startButton.name="start";
		this.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startClick,this);
    this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeThis,this);
    }
		private startClick(e:egret.TouchEvent):void{
     var event:ButtonEvent = new ButtonEvent(ButtonEvent.CLICK);
      event.name=e.currentTarget.name;
      this.dispatchEvent(event);
		}
	//
	public set startEnabled(type:boolean){
       this.startButton.visible=type;
	}
	public get startEnabled():boolean{
      return this.startButton.visible;
	}
	public switchButton(type:string){
     if(type=="start"){
      this.startButton.texture=RES.getRes("buuton02_png");
			this.startButton.name="start";
		 }else{
      this.startButton.texture=RES.getRes("buuton03_png");
			this.startButton.name="invitation";
		 }
	}
		//
	//移除自己的时候
		private removeThis(e:egret.Event):void{
		this.startButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.startClick,this);
	  this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeThis,this);
		console.log("移除游戏内容");
		}
 }