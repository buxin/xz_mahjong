class NotityWnd extends eui.Component{

	private msgLabel:eui.Label;

	public static MOVE_HORIZONTAL:string = "MOVE_HORIZONTAL";

	private twMove:egret.Tween;

	private root:eui.UILayer;

	public constructor(root:eui.UILayer) {
		super();
		this.msgLabel = new eui.Label();
		this.msgLabel.x = 0;
		this.msgLabel.y = 0;
		this.addChild(this.msgLabel);
		this.root = root;
	}

	public show(msg:string):void{
       
        var sp = new egret.Sprite;
        this.addChild(sp);

        var txt: egret.TextField = new egret.TextField;
        txt.text = msg;
        txt.size = 45;
        this.addChild(txt);
        txt.textColor = 0xffffff;
        txt.x = 1820;
        txt.stroke = 0;
        txt.strokeColor = 0x18388D;
        txt.y = 1080/2;
        var nX = (1820 - txt.width) / 2;
        txt.bold = true;
        var self = this;

        sp.graphics.beginFill(0x000000, 1);
        sp.graphics.drawRoundRect(0, 0, txt.width + 40, txt.height + 10, 10, 10);
        sp.graphics.endFill();
        
        sp.x = txt.x - 20;
        sp.y = txt.y - 5;
        
        
        egret.Tween.get(txt).to({ x: nX },400).wait(1000).to({ x: -1820 },400).call(() => { 
            self.removeChild(txt);
        }, this);

        egret.Tween.get(sp).to({ x: nX-20 }, 400).wait(1000).to({ x: -1820-20 }, 400).call(() => {
            self.removeChild(sp);
        }, this);
	}

	 private onTweenComplete():void {
		 this.visible = false;
    }
}