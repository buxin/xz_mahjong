/*/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////*/
class GiftObject extends eui.Component{


 
public ico: eui.Image;
public txt: eui.Label;
public jewel:number=0;
public gid:number=0;
public clickEnabled:boolean=true;
  public constructor() {
		super();
	  	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/giftobject.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{

		}
 }