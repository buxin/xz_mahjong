class MyUtils {
	public constructor() {
	}
	    //影片对象
    static createMovieClipByName(namse: string,_texture:string=""): egret.MovieClip {
        var spr1: egret.MovieClip = new egret.MovieClip();
        var data = RES.getRes(namse + "_json");
        if(_texture == "") {
            var texture = RES.getRes(namse + "_png");
        } else { 
            var texture = RES.getRes(_texture + "_png");
        }
        var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
        spr1 = new egret.MovieClip(mcDataFactory.generateMovieClipData(namse));
        return spr1;
    }
	  /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
    */
    //秒转分
     static secToTime ( secs:number ):string { 
     var m:number = Math.floor ( secs / 60 ); 
     var s:number = secs  - m * 60; 
     return  ("0" + m).substr(-2)+":"+("0" + s).substr(-2); 
    }
    //
    static createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    //
    static getMyParamer(param) {
        var oRequest = new Object();
        oRequest = MyUtils.GetRequest();
        return oRequest[param];
    }
    static GetRequest() {
        var url = document.location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if(url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for(var i = 0;i < strs.length;i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
}