/*/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////*/
class EatList extends eui.Component{


  public bg: eui.Image;

  
  public constructor() {
		super();
	  	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/eatlist.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
    this.bg.scale9Grid=new egret.Rectangle(11,11,133,72);
		}
 }