/*/////////////////////////////////////////////////////////////////////////////////////
//公共方法

/////////////////////////////////////////////////////////////////////////////////////*/
class SpeechHint extends eui.Component{

public timerText: eui.Label;

  
  public constructor() {
		super();
	 	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/speechhint.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{

  }
	    
 }