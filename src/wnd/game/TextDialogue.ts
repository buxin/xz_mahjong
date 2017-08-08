/*/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////*/
class TextDialogue extends eui.Component{

public bg: eui.Image;
public txt: eui.Label;
public border: eui.Image;



  public constructor() {
		super();
	  	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/textdialogue.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
    this.border.scale9Grid=new egret.Rectangle(14,5,191,33);
	  //this.txt.mask=this.maskMc;
		}
		
 }