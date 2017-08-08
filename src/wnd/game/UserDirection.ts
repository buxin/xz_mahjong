/*/////////////////////////////////////////////////////////////////////////////////////
//公共事件

------------- 

//公共属性
direction://设置方向 0表示没有 1是东 2是西 3是南 4是北
-----------
eastPlace:number;//东边的方向设置0-4
//公共方法
timerPlay(timer:number);
-------
lightHide();隐藏光
---------
stop();//停止播放
/////////////////////////////////////////////////////////////////////////////////////*/
class UserDirection extends eui.Component{
 

public timerTxt: eui.BitmapLabel;
public bnumsTxt: eui.BitmapLabel;
private bg: egret.MovieClip;
private _timer:number=0;

  public constructor() {
		super();
      this.bg=MyUtils.createMovieClipByName("direction");
	  	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/userdirection.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
	   this.timerTxt.textAlign=egret.HorizontalAlign.CENTER;
	//	 this.bnumsTxt.textAlign=egret.HorizontalAlign.CENTER;
     this.bg.x=61;
     this.bg.y=61;
     this.addChildAt(this.bg,0);
			}
  //
  private eastPlaceValue:number=0;
  public set eastPlace(value:number){
      this.eastPlaceValue=value;
	  this.bg.rotation=value*-90;
  }
  public get eastPlace():number{
      return this.eastPlaceValue;
  }
  //倒计时播放
  private _timerPlay:boolean=false;
  public  timerPlay(timer:number){
         this._timer=timer;
         this.timerTxt.text=this._timer.toString();
         this._timerPlay=true;
  }
  public  timer(){
    if(this._timerPlay){
    if(this._timer>0){
       this._timer--
       this.timerTxt.text=this._timer.toString(); 
       if(4>this._timer){
          WndManager.root.main.soundGamePlay("s");
       }
    }else{
      this.timerPlay(10);
    }
    }
  }
  //
  private directionValue:number=0;
  public set direction(value:number){
        //console.log(value)
         this.timerPlay(10);
        this.directionValue=value;
        this.bg.gotoAndStop(this.directionValue+1);
  }
   public stop(){
     this._timerPlay=false;
     this._timer=0;
     this.bg.gotoAndStop(1);
  }
  public lightHide(){
  //  console.log("隐藏光")
    this.bg.gotoAndStop(1);
  }
	 public get direction():number{
        return this.directionValue;
  }
 }   