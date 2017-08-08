/*/////////////////////////////////////////////////////////////////////////////////////
//公共事件
-------------

//公共属性
-----------

//公共方法
/////////////////////////////////////////////////////////////////////////////////////*/
class Banner extends eui.Component{


public roomIDTxt: eui.Label;
public stakeScoreTxt: eui.Label;
public typeTxt: eui.Label;
public gameTimeTxt: eui.Label;


 
//
  public constructor() {
		super();
	  	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/banner.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
   
    }

 }