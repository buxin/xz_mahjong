/*/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////*/
class EndButton extends eui.Component{


  

public dp: eui.Image;
public hp: eui.Image;
public wolTxt: eui.BitmapLabel;
public nickTxt: eui.Label;
public ico: eui.Image;
public tid:number=0;
  
  public constructor() {
		super();
	  	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/endbutton.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{

		}
 }