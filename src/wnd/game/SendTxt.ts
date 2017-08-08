/*/////////////////////////////////////////////////////////////////////////////////////
//公共事件
事件对象类型: ClickEvent
属性： ClickEvent.CLICK  当按钮被点击的时候执行
参数： name:点击的按钮昵称  
       值:close  点击的退出
			    write  点击的自己写入的文本
          txt  点击文本按钮
			 值:code 文本编号	
------------- 

//公共属性
-----------
writeText:string //用户输入的文本数据

//公共方法
UILayout();//UI布局
/////////////////////////////////////////////////////////////////////////////////////*/
class SendTxt extends eui.Component{


private closeButton: eui.Image;
private _scroller: eui.Scroller;
private txt: eui.EditableText;
private txtWnd: eui.Group;
public sendButton:eui.Rect;
public list:eui.Component[]=[];
  public constructor() {
		super();
	  	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/sendtxt.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
		var list:eui.Component;
		var txt:eui.Label;
		var line:egret.Shape;
		var l:number=GameData.userTextList.length;
    for(var i:number=0;i<l;i++){
        list=new  eui.Component();
				txt=new eui.Label();
				txt.width=511;
				txt.height=53;
				txt.text=GameData.userTextList[i].txt;
				list.addChild(txt);
        this.txtWnd.addChild(list);
				txt.textAlign=egret.HorizontalAlign.CENTER;
				txt.verticalAlign=egret.VerticalAlign.MIDDLE;
				txt.size=28;
				list.y=i*53;
				list.name="i"+i;
				if(i!=0){
				line=new egret.Shape();
				list.addChild(line);
			  line.graphics.lineStyle(2,0xDEBC37);
				line.graphics.moveTo(0,0);
				line.graphics.lineTo(511,0);
				line=null;
				}
				list.addEventListener(egret.TouchEvent.TOUCH_TAP,this.listClick,this);
				this.list.push(list);
				list=null;
				txt=null;
		}
		this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeClick,this);
		this.sendButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sendClick,this);
		 this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeThis,this);
    }
		//发送语音文本
		private listClick(e:egret.TouchEvent):void{
         var event:ButtonEvent = new ButtonEvent(ButtonEvent.CLICK);
         event.name="txt";
				 event.code=e.currentTarget.name.substr(1);
         this.dispatchEvent(event);
		}
		//发送文本 
		public sendClick(e:egret.TouchEvent):void{
			   var event:ButtonEvent = new ButtonEvent(ButtonEvent.CLICK);
         event.name="write";
         this.dispatchEvent(event);
			//	}
		}
		public get writeText():string{
			return this.txt.text;
		}
		//点击关闭按钮
		private closeClick(e:egret.Event):void{
      var event:ButtonEvent = new ButtonEvent(ButtonEvent.CLICK);
      event.name="close";
      this.dispatchEvent(event);
			}
	//移除自己的时候
		private removeThis(e:egret.Event):void{
			this.sendButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.sendClick,this);
		this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closeClick,this);
	  this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeThis,this);
		var l:number=this.list.length;
    for(var i:number=0;i<l;i++){
      this.list[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.listClick,this);
			this.list[i]=null;
		}
		 this.list=null;
		console.log("移除发送文本");
		}
 }