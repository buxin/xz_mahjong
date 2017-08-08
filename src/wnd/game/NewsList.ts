/*/////////////////////////////////////////////////////////////////////////////////////

//公共方法
size(width:number,height:number);//设置大小
------
setHeight(value:number);//设置高度
-------
show(data:any);//显示数据
-----
ruleOpen(str:string);//打开规则面板
-----
hide();//隐藏窗口
-------
watchShow(data:any);//显示观战数据
/////////////////////////////////////////////////////////////////////////////////////*/
class NewsList extends eui.Component{

  
private bg: eui.Image;
private title: eui.Label;
private _scroller: eui.Scroller;
private _group: eui.Group;
private newsListObject:NewsListObject;
private watchObject:WatchObject;

	
  public constructor() {
		super();
	 	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/newslist.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
	       this.visible=false;
		    var r:egret.Rectangle=new egret.Rectangle(23,89,408,524)
           this.bg.scale9Grid=r;
		   this.watchObject=new WatchObject();
				  //this.bg.height=6440;
   }
	public setHeight(value:number){
       this.bg.height=value;
			this._scroller.height=value-84-10;
	 }
	 public ruleOpen(str:string){
		  this.title.text="游戏规则";
		  var l:number=this.listObject.length;
		   for(var i=0;i<l;i++){
              this.listObject[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.listClick,this);
			  this.listObject[i]=null;
		   }
		   this.listObject=[];
		   this._group.removeChildren();
		   var txt:eui.Label=new eui.Label();
		   txt.width=438;
		   txt.textColor=0xffffff;
		   txt.size=20;
		   txt.text= str;
		   txt.y=8;
		   txt.lineSpacing=12;
		 //  console.log(str);
		   this._group.addChild(txt);
		    this.visible=true;
			this._scroller.viewport.scrollV=0;
	 }
	 private listObject:NewsListObject[]=[];
	 public show(data:any){
		   this.title.text="消息列表";
		   var l:number=this.listObject.length;
		   for(var i=0;i<l;i++){
              this.listObject[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.listClick,this);
			  this.listObject[i]=null;
		   }
		   this.listObject=[];
		   this._group.removeChildren();
	 	 // console.log(data)
		    l=data.length;
		   var _y:number=0;
			 for(i=l;i>0;i--){
				 this.newsListObject=new NewsListObject();
				 this._group.addChild(this.newsListObject);
				 this.newsListObject.y=_y*109;
				 _y++;
				 this.newsListObject.head=data[i-1].headimg;
				 if(data[i-1].type==1){
				 this.newsListObject.txt.textFlow = <Array<egret.ITextElement>>[
          {text: data[i-1].nick+"\n", style: {"textColor": 0xffffff,size:28}}
		 ,{text:"("+data[i-1].date+")\n", style: {"textColor": 0xffffff,size:22}}
         ,{text: data[i-1].nick+"进入房间", style: {"textColor": 0x51b051,size:22}}
        ];
				 }else{
			 this.newsListObject.txt.textFlow = <Array<egret.ITextElement>>[
		    {text:"房间号:", style: {"textColor": 0x51b051,size:28}}
		   ,{text:data[i-1].roomid, style: {"textColor": 0xBD1B05,size:28}}
		   ,{text:"未开局,退还", style: {"textColor": 0x51b051,size:28}}
		   ,{text:data[i-1].gold, style: {"textColor": 0xBD1B05,size:28}}
		   ,{text:"钻石.", style: {"textColor": 0x51b051,size:28}}
            ];
			this.newsListObject.txt.verticalAlign=egret.VerticalAlign.MIDDLE;
				 }
		         this.listObject.push(this.newsListObject);
				 this.newsListObject.name="i"+(i-1);
				 this.newsListObject.addEventListener(egret.TouchEvent.TOUCH_TAP,this.listClick,this);
				 this.newsListObject=null;
				// console.log(data[i-1]);
			 }
			  this.watchObject.y=_y*109-2;
			  this.watchObject.bg.height=90;
			  this._group.addChild(this.watchObject);
			  //
			   this.visible=true;
			  this._scroller.viewport.scrollV=0;
			  //
			  WndManager.root.main.spush.watchUser();
			  //
	 }
	 
	private listClick(e:egret.TouchEvent):void{
       var value:number=Number(e.currentTarget.name.substr(1));
	  // console.log(value);
	    GameData.newslistData.splice(value,1);
		this.show(GameData.newslistData);
	  // GameData.newslistData.split(value)
	}
	public hide(){
		 this._group.removeChildren();
		 this.visible=false;
	}
	public watchShow(data:any){
         this.watchObject.wnd.removeChildren();
		 var l:number=data.length;
		 var _x:number=0;
		 var _y:number=0;
		 var headImage:HeadImage;
		 for(var i=0;i<l;i++){
             headImage=new HeadImage();
			 headImage.head=data[i].headimg;
			 headImage.x=12+_x*86;
			 headImage.y=9+_y*79;
			 this.watchObject.wnd.addChild(headImage);
            _x++;
			 if(_x>=5){
				_x=0;
				_y++; 
			 }
		var nick:egret.TextField=new egret.TextField();
        nick.width=64;
        nick.height=20;
        nick.textColor=0xffffff;
        nick.textAlign = egret.HorizontalAlign.CENTER;
        nick.verticalAlign = egret.VerticalAlign.MIDDLE;
        nick.size=12;
        nick.text=data[i].nick;
		nick.y=headImage.y+64;
		nick.x=headImage.x;
        this.watchObject.wnd.addChild(nick);
		 }
		  this.watchObject.bg.height=9+_y*79+90;

	}
	
 }