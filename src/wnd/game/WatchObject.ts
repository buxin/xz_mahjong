/*/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////*/
class WatchObject extends eui.Component{


public bg: eui.Rect;
public wnd: eui.Group;

	

  public constructor() {
		super();
	 	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/watchobject.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{

  }
	
 }