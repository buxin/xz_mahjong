/*/////////////////////////////////////////////////////////////////////////////////////
//公共事件
事件对象类型: ClickEvent
属性： ClickEvent.CLICK  当按钮被点击的时候执行
参数： name:点击的按钮昵称  
       值:close  点击的退出
          emkji  点击表情按钮
			 值:codeStr 表情编号	
------------- 

//公共属性
-----------

//公共方法
UILayout();//UI布局
/////////////////////////////////////////////////////////////////////////////////////*/
class SendEmoji extends eui.Component{
  private closeButton: eui.Image;
	private ico:eui.Image[]=[];
private _group: eui.Group;

  public constructor() {
		super();
	  	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/sendemoji.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
		var ico:eui.Image;
		var l:number=GameData.userEmojiList.length;
		var _x:number=0;
		var _y:number=0;
		for(var i:number=0;i<l;i++){
			var button:string=GameData.userEmojiList[i].button;
			var num:number=GameData.userEmojiList[i].number;
	    for(var t:number=0;t<num;t++){
       ico=new eui.Image(RES.getRes(button+t));
			 ico.x=20+_x*101;
			 ico.y=20+_y*90;
			 this._group.addChild(ico);
			 this.ico.push(ico);
			 ico.name="i"+i+"0"+t;
			 ico.addEventListener(egret.TouchEvent.TOUCH_TAP,this.icoClick,this);
			 ico=null;
			 _x++;
			 if(_x>5){
				 _x=0;
				 _y++;
			 }
			}
				}
			this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeClick,this);
		  this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeThis,this)
    }
		//发送表情
		private icoClick(e:egret.TouchEvent):void{
         var event:ButtonEvent = new ButtonEvent(ButtonEvent.CLICK);
         event.name="emkji";
				 event.codeStr=e.currentTarget.name.substr(1);
         this.dispatchEvent(event);
		}
	//点击关闭按钮
		private closeClick(e:egret.Event):void{
      var event:ButtonEvent = new ButtonEvent(ButtonEvent.CLICK);
      event.name="close";
      this.dispatchEvent(event);
			}
	//移除自己的时候
		private removeThis(e:egret.Event):void{
		this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.closeClick,this);
	  this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeThis,this);
		var l:number=this.ico.length;
    for(var i:number=0;i<l;i++){
      this.ico[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.icoClick,this);
			this.ico[i]=null;
		}
		 this.ico=null;
		console.log("移除发送表情");
		}
 }