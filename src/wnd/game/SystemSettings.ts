/*/////////////////////////////////////////////////////////////////////////////////////

//公共方法

/////////////////////////////////////////////////////////////////////////////////////*/
class SystemSettings extends eui.Component{

  
   private soundButton: eui.Rect;
   private soundIco: eui.Image;
   private dialectButton: eui.Rect;
   private dialectIco: eui.Rect;

  public constructor() {
		super();
	 	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/systemsettings.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
	   if(egret.localStorage.getItem("mjSetGameSound")!=null){
          GameData.gameSound=egret.localStorage.getItem("mjSetGameSound")=="true";
	   }
      if(egret.localStorage.getItem("mjSetDialectSound")!=null){
          GameData.dialectSound=egret.localStorage.getItem("mjSetDialectSound");
	   }
	    this.soundButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.begin,this);
      this.dialectButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.dialectClick,this);
	    this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeThis,this);
    //  console.log("?-------",GameData.gameSound, GameData.dialectSound)
		this.soundSelectChange();
	}
  private dialectClick(e:egret.TouchEvent):void{
    if(GameData.dialectSound==""){
      GameData.dialectSound="a";
    }else  GameData.dialectSound="";
    egret.localStorage.setItem("mjSetDialectSound",GameData.dialectSound);
   this.soundSelectChange();
   }
  private begin(e:egret.TouchEvent):void{
     GameData.gameSound=GameData.gameSound==false;
     egret.localStorage.setItem("mjSetGameSound",GameData.gameSound.toString());
   //  console.log(egret.localStorage.getItem("mjSetGameSound"))
	 this.soundSelectChange();
  }
  private soundSelectChange(){
	  if(GameData.gameSound){
          this.soundIco.x=402;
	  }else  this.soundIco.x=461;
     if(GameData.dialectSound==""){
         this.dialectIco.x=402;
	  }else  this.dialectIco.x=461;
  }
  //移除自己的时候
 private removeThis(e:egret.Event):void{
    this.soundButton.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.begin,this);
   this.dialectButton.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.dialectClick,this);
  this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeThis,this);
  }
 }