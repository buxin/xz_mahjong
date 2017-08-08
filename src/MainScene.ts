	class MainScene extends eui.UILayer{

		private bg:eui.Image;
		public notifyWnd:NotityWnd;
		public wndmanager: WndManager;

		private soundPlay: Boolean = true;//声音是否播放
		private soundChannel: egret.SoundChannel;//音效频道
		private musicChannel: egret.SoundChannel;//背景音频道
		private soundHorseRun: egret.Sound;
		private musicBg:egret.Sound;

		public static screen_width:number = 640;
    	public static screen_height:number = 1036;

		public static SCALE_STAGE:number = 0.6;

		public main:Main;

		public soundImg:eui.Image=new eui.Image();

		public wndSlideOpenDelay:boolean = true;

		public firstLayer:WinBase;
		public static phone:string="";
		public  gameWnd:GameWnd;
   
	

		public constructor(main:Main) {
			super();
			this.main = main;
			this.addEventListener(egret.Event.ADDED_TO_STAGE,this._int,this);
		}

		private _int(e: egret.Event): void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE,this._int,this);

				//界面层
			this.firstLayer = new WinBase();
			this.addChild(this.firstLayer);
			//弹窗层
			WndManager.root = this;
        	this.wndmanager = new WndManager;
        	this.addChild(this.wndmanager);
			RES.getResByUrl("resource/bg1.mp3", this.onSoundLoadOK1, this);
		//	console.log("1123");
			//this.onSoundLoadOK();
			this.notifyWnd = new NotityWnd(this);
			this.addChild(this.notifyWnd);
			//egret.setTimeout(()=>{
			  this.addListener();
			//},this,1500)

    	}
		public musicPlayI:number=0;
		public musicPlay(){
		  if(this.bgPlay){
			 if( this.musicChannel!=null)   this.musicChannel.stop();	 
				this.musicChannel = this.musicBg.play(0,1);
				this.musicPlayI++;
		  }
		  if(this.musicPlayI>5) this.bgPlay=false;
		}
		private bgPlay:boolean=false;
		public soundImg2:eui.Image=new eui.Image();
     	private onSoundLoadOK1(data)
		{
			//
		    this.musicBg=data;
            this.bgPlay=true;
            WndManager.root.main._jssdk.init();
		}
	  private onSoundLoadOK2(data)
		{
			if(this.musicChannel !=null) this.musicChannel.stop();
		    this.musicBg=data;
			if(GameData.bgSoundPlay){
			this.musicChannel = this.musicBg.play(0,99);
			}
		}
	  private soundEvent1(e:egret.TouchEvent):void
		{
			this.soundPlay = this.soundPlay==false;
           
			if(this.soundPlay)
			{
			//	this.soundImg.alpha=1;
				this.soundImg.texture=RES.getRes("bt3_png");
				 //egret.Tween.get(this.soundImg,{ loop: true }).to({ scaleX: 0.8,scaleY: 0.8 },800).to({ scaleX: 1,scaleY: 1 },800); 
				this.musicChannel = this.musicBg.play(0,99);	
				//this.bgMusic.play();
			
			}
			else{
				    this.soundImg.texture=RES.getRes("bt31_png");
				   if(this.musicChannel!=null) this.musicChannel.stop();
				  	 
			}
			
		}
	  private addListener():void
		{
		   /**
			* 
            RoomCodeInputWnd //房间密卡输入界面

			* 
		   */
	     //   WndManager.switchWnd(RoomCodeInputWnd, WIN_OPERATOR.WIN_OPEN_NEW);
		    WndManager.switchWnd(GameWnd, WIN_OPERATOR.WIN_OPEN_NEW);
			WndManager.root.main.addSocketPush();
		}
   
		private bgMusic;
		private onSoundLoadOK():void
		{
			this.bgMusic = document.getElementById("bgMusic");
		}

		private soundEvent(e:egret.TouchEvent):void
		{
			this.soundPlay = !this.soundPlay;

			if(this.soundPlay)
			{
				 egret.Tween.get(this.soundImg,{ loop: true }).to({ rotation: 360 },1000); 
				//this.musicChannel = this.musicBg.play(0,0);	
				this.bgMusic.play();
			}
			else{
				    egret.Tween.removeTweens(this.soundImg);
					this.soundImg.rotation=0;
					this.bgMusic.pause();
				//	this.musicChannel.stop();	 
			}
			
		}

	
	

	}