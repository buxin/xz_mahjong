/*/////////////////////////////////////////////////////////////////////////////////////
//提示面板，类似于js alert()
//公共事件
事件对象类型: ClickEvent
属性： ClickEvent.CLICK  当按钮被点击的时候执行
参数： code:点击的按钮编号
------------
//公共属性
-----------

//公共方法
UILayout();//UI布局
----------
show(txt:string,buttonData:any) //设置内容
txt:文本内容
buttonData:按钮信息 [{texture:"按钮纹理",code:按钮返回的事件编号Number}...]
--------
close();//关闭
/////////////////////////////////////////////////////////////////////////////////////*/
class AlertWnd extends WinBase{


private bg: eui.Rect;
private _group: eui.Group;
private txt: eui.Label;
private button:egret.Bitmap[]=[];

//
  public constructor() {
		super();
	  	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/hint.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
     //
      this.visible=false;
      //
      this.UILayout();
    }
  public show(txt:string,buttonData:any){
      //清除以前的数据
       var l:number=this.button.length;
       for(var i:number=0;i<l;i++){
          this._group.removeChild(this.button[i]);
          this.button[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.click,this);
          this.button[i]=null;
       }
        this.button=[];
        //添加新数据
        this.txt.text=txt;
        this.visible=true;
        var button:egret.Bitmap;
         l=buttonData.length;
        for(i=0;i<l;i++){
           button=new egret.Bitmap(RES.getRes(buttonData[i].texture));
           button.name="i"+buttonData[i].code;
           button.anchorOffsetX=73;
           button.anchorOffsetY=32;
           button.x=391+i*160-(l*160/2);
           button.y=239;
           this._group.addChild(button);
           this.button.push(button);
           button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click,this);
           button.touchEnabled=true;
           button=null;
        }
      if(this.txt.numLines==1){
        this.txt.textAlign=egret.HorizontalAlign.CENTER;
      }else{
        this.txt.textAlign=egret.HorizontalAlign.LEFT;
      }
  }
  private click(e:egret.TouchEvent):void{
    //	egret.Tween.removeTweens(e.currentTarget);
//		e.currentTarget.scaleX=e.currentTarget.scaleY=GameData.stageScale/2;
	//	egret.Tween.get(e.currentTarget).to({scaleX:GameData.stageScale,scaleY:GameData.stageScale},800,egret.Ease.backOut);
		  var event:ButtonEvent = new ButtonEvent(ButtonEvent.CLICK);
      event.code=Number(e.currentTarget.name.substr(1));
      this.dispatchEvent(event);
  }
  public close(){
     this.visible=false;
  }
  public  UILayout(){
      this.bg.width=GameData.stageWidth;
      this.bg.height=GameData.stageHeight;
      this._group.scaleX=this._group.scaleY=GameData.stageScale;
      this._group.x=GameData.stageWidth*0.23;
      this._group.y=GameData.stageHeight*0.29;
  }
 }