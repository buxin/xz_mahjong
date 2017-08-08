/*/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////*/
class HeadImage extends eui.Component{


private bg: eui.Image;
private maskMc: eui.Image;
private headBim:egret.Bitmap=new egret.Bitmap;
private headDara:egret.Texture=null;
 private loader: egret.URLLoader;
  private headUrl:string="";
  public constructor() {
		super();
	 	this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/headimage.exml";
	}
	private onComplete():void{
		this.init();
    }
  private init():void{
		  this.addChild(this.headBim);
		   this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeThis,this);
	 }
	  public set head(url:string){
		  this.headUrl=url;
	      if(this.headDara!=null){
			  this.headDara.dispose();
			  this.headDara=null;
		  }
        //  RES.getResByUrl(url,this.loadComp,this,RES.ResourceItem.TYPE_IMAGE)
		if(this.loader!=null){
		    this.loader.removeEventListener(egret.Event.COMPLETE,this.imageComplete,this);
			 this.loader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.imageError,this);
			this.loader=null;
		}
		 this.loader = new egret.URLLoader();
        //设置加载方式为纹理
         this.loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        //添加加载完成侦听
         this.loader.addEventListener(egret.Event.COMPLETE,this.imageComplete,this);
		 this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.imageError,this);
		 var request: egret.URLRequest = new egret.URLRequest(this.headUrl);
        //开始加载
         this.loader.load(request);
   }
  private imageError(e: egret.IOErrorEvent): void { 
      this.loader.removeEventListener(egret.Event.COMPLETE,this.imageComplete,this);
      this.loader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.imageError,this);
     this.loader=null;
  }
  public get head():string{
   return this.headUrl;
  }
 private imageComplete(e: egret.Event): void { 
	   this.loader.removeEventListener(egret.Event.COMPLETE,this.imageComplete,this);
	   this.loader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.imageError,this);
     this.headDara= e.target.data;
     this.headBim.texture=this.headDara;
		// this.headBim.x=21;
		// this.headBim.y=24;
	   this.headBim.width=64;
	   this.headBim.height=64;
	   this.headBim.mask=this.maskMc;
	   this.loader=null;

   }
			//移除自己的时候
		private removeThis(e:egret.Event):void{
	  this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeThis,this);
		 if(this.headDara!=null){
			  this.headDara.dispose();
			  this.headDara=null;
		  }
        //  RES.getResByUrl(url,this.loadComp,this,RES.ResourceItem.TYPE_IMAGE)
		if(this.loader!=null){
		    this.loader.removeEventListener(egret.Event.COMPLETE,this.imageComplete,this);
			this.loader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.imageError,this);
			this.loader=null;
		}
		console.log("移除消息对象");
		}
	
 }