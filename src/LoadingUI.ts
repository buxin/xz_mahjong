//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends eui.Component {

 
private bg: eui.Rect;
private _group: eui.Group;
private txt: eui.Label;
private value:number=0;
private loadICO:eui.Image;
private mc:egret.MovieClip;

    public constructor(main:Main) {   
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this._int,this);
    }

 
 private _int(e:egret.Event):void{
		this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
     	this.skinName = "resource/wnd/load.exml";
    }
  private onComplete(e:eui.UIEvent):void{
      //this.loadComplete=true;
      //console.log("完成")
      var r:egret.Rectangle=new egret.Rectangle(8,2,229,16);
      this.loadICO.scale9Grid=r;
      this.mc=MyUtils.createMovieClipByName("load1");
      this.mc.y=31;
      this._group.addChild(this.mc);
      this.mc.play(-1);
      this.UILayout();
      this.main.loadGameGroup();
  }
     private QR:egret.Sprite;
    public setProgress(current:number, total:number):void {
        this.value=current / total;
       // console.log(this.value,"%")

        this.txt.text = Math.floor(100*this.value)+ "%";
        this.loadICO.width=250*this.value;

     //   if(this.loadComplete){
           // egret.Tween.removeTweens(this);
      //  egret.Tween.get(this).to({goto: current / total },1000);
      //  }
    }
    private v:string;
    public main:Main;
    public set goto(value:number){
       
     //  this._goto=value;
     //   console.log(this._goto);
     //   this.v=Math.floor(100 * this._goto).toString().split(".")[0];
      //  this.maskMc.width=this._goto*700;
      //  this.ico1.x=441- this._goto*200;
      // if(this.ico.y>185) this.ico.y=185;
      // this.lz.y=this.ico.y+507;
     //   this.txt.text = "Loading······"+this.v+ "%";
    } 
    public out(){
        
        if(this.mc!=null){
      this.mc.stop();
      this._group.removeChild(this.mc);
      this.mc=null;
        }
      this.visible=false;
      
    }
    public UILayout(){
          if(!egret.Capabilities.isMobile) {
         this._group.scaleX= this._group.scaleY=GameData.stageScale;
         this._group.x=GameData.stageWidth/2;
         this._group.y=GameData.stageHeight/2;
          }else{
         this._group.scaleX= this._group.scaleY=GameData.stageScale;
         this._group.rotation=90;
         this._group.x=GameData.stageWidth/2;
         this._group.y=GameData.stageHeight/2;
          }
         this.bg.width=GameData.stageWidth;
         this.bg.height=GameData.stageHeight;
       
    }
    public get goto():number{
        return 0;
    }
}