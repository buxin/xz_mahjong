/*/////////////////////////////////////////////////////////////////////////////////////
文本,表情,花牌提示
//公共事件

//公共属性
zhnum:number 正花设置
------
yhnum:number 野花设置

//公共方法
setTextDialogue(txt:string) //设置聊天文本内容
-------------
addAnimation(movieClipData:egret.MovieClipData,x:number,y:number,time:number);添加动画内容
movieClipData:动画资源
x:动画X坐标
y:动画Y坐标
time:播放时间(毫秒)
--------------

/////////////////////////////////////////////////////////////////////////////////////*/
class TextEmoji extends eui.Component{

//
  private _place:number=0;
	private textDialogue:TextDialogue;
	private textDialogueTxt:eui.Label;
private yhnumBim: eui.Image;
private zhnumBim: eui.Image;
private yhnumTxt: eui.BitmapLabel;
private zhnumTxt: eui.BitmapLabel;

	
  public constructor(place:number) {
		super();
		 this._place=place;
	 	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/textemoji.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
           this.textDialogue=new TextDialogue();
			this.textDialogue.y=-32;
			if(this._place==1){
			this.textDialogue.x=-154;
			this.textDialogue.bg.scaleX=-1;
			}else{
				this.textDialogue.x=28;
			}
			this.addChild(this.textDialogue);
			this.textDialogueTxt=this.textDialogue.txt;
			this.textDialogueTxt.multiline = false;
            this.textDialogueTxt.wordWrap = false;
			this.textDialogue.visible=false;
			//
			var xy:any=[{bim0x:141-20,bim0y:16+55,txt0x:181-20,txt0y:18+55,bim1x:142-20,bim1y:55+45,txt1x:181-20,txt1y:58+45}
			,{bim0x:-15+20,bim0y:-92+210,txt0x:25+20,txt0y:-89+210,bim1x:-12+20,bim1y:-53+200,txt1x:23+20,txt1y:-51+200}
			,{bim0x:63+15,bim0y:90-30,txt0x:103+15,txt0y:92-30,bim1x:63+15,bim1y:90-40+40,txt1x:103+15,txt1y:93-40+40}
			,{bim0x:-5,bim0y:123,txt0x:34,txt0y:125,bim1x:-5,bim1y:152,txt1x:33,txt1y:154}]
			this.zhnumBim.x=xy[this._place].bim0x;
			this.zhnumBim.y=xy[this._place].bim0y;
		    this.zhnumTxt.x=xy[this._place].txt0x;
		    this.zhnumTxt.y=xy[this._place].txt0y;
			this.yhnumBim.x=xy[this._place].bim1x;
			this.yhnumBim.y=xy[this._place].bim1y;
			this.yhnumTxt.x=xy[this._place].txt1x;
			this.yhnumTxt.y=xy[this._place].txt1y;

			this.zhnumBim.visible=false;
			this.zhnumTxt.visible=false;
			this.yhnumBim.visible=false;
			this.yhnumTxt.visible=false;
			this.zhnumTxt.scaleX=this.zhnumTxt.scaleY=this.yhnumTxt.scaleX=this.yhnumTxt.scaleY=0.8;
    }
	private zhnumValue:number=0;
    public set zhnum(value:number){
          this.zhnumValue=value;
		  if(value==0){
		    this.zhnumBim.visible=false;
			this.zhnumTxt.visible=false; 
		  }else{
			this.zhnumBim.visible=true;
			this.zhnumTxt.visible=true;
			this.zhnumTxt.text="x"+value.toString();
		  }
	}
	public get zhnum():number{
		 return this.zhnumValue;
	}
	private yhnumValue:number=0;
    public set yhnum(value:number){
          this.yhnumValue=value;
		  if(value==0){
		    this.yhnumBim.visible=false;
			this.yhnumTxt.visible=false; 
		  }else{
			this.yhnumBim.visible=true;
			this.yhnumTxt.visible=true;
			this.yhnumTxt.text="x"+value.toString();
		  }
	}
	public get yhnum():number{
		 return this.yhnumValue;
	}
	public get place():number{
     return this._place;
	}
	private txtStr:string="";
	private txtI:number=0;
	public setTextDialogue(txt:string){
		egret.Tween.removeTweens(this);
	  	this.txtStr=txt;
		this.txtI=txt.length;
		var txtWidth:number=0;
     	this.textDialogue.visible=true;
		this.textDialogue.border.x=0;
	    this.textDialogueTxt.x=7;
		this.textDialogueTxt.text=txt;
		this.textDialogue.border.width=Math.min(218,this.textDialogueTxt.textWidth+30);
			if(this.textDialogueTxt.numLines>1){
				  egret.Tween.get(this).wait(1500).to({txtPlay:this.txtI},this.txtI*200).call(this.textDialogueClose,this)
			}else{
			    if(this.textDialogue.bg.scaleX==-1){
		         this.textDialogue.border.x=218-this.textDialogue.border.width;
				  this.textDialogueTxt.x=this.textDialogue.border.x+7;
		        }
			    egret.Tween.get(this).to({endPlay:3000},3000).call(this.textDialogueClose,this)	
			}
	}
	private set txtPlay(value:number){
    this.textDialogueTxt.text=this.txtStr.substr(Math.floor(value));
	}
	private get txtPlay(){
    return 0;
	}
	private set endPlay(value:number){
	}
	private get endPlay(){
		 return 0;
	}
	private textDialogueClose(){
		this.textDialogue.visible=false;
	}
	//
   //
   public addAnimation(movieClipData:egret.MovieClipData,x:number,y:number,time:number){
	  var mc:egret.MovieClip=new egret.MovieClip();
	  mc.movieClipData=movieClipData;
	  mc.x=x;
	  mc.y=y;
	  this.addChild(mc);
	  mc.play(-1);
      egret.setTimeout(()=>{
		  this.removeChild(mc);
		  mc=null;
	  },this,time)
   }
	
 }