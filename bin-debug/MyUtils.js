var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MyUtils = (function () {
    function MyUtils() {
    }
    //影片对象
    MyUtils.createMovieClipByName = function (namse, _texture) {
        if (_texture === void 0) { _texture = ""; }
        var spr1 = new egret.MovieClip();
        var data = RES.getRes(namse + "_json");
        if (_texture == "") {
            var texture = RES.getRes(namse + "_png");
        }
        else {
            var texture = RES.getRes(_texture + "_png");
        }
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        spr1 = new egret.MovieClip(mcDataFactory.generateMovieClipData(namse));
        return spr1;
    };
    /**
  * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
  * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
  */
    //秒转分
    MyUtils.secToTime = function (secs) {
        var m = Math.floor(secs / 60);
        var s = secs - m * 60;
        return ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
    };
    //
    MyUtils.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    //
    MyUtils.getMyParamer = function (param) {
        var oRequest = new Object();
        oRequest = MyUtils.GetRequest();
        return oRequest[param];
    };
    MyUtils.GetRequest = function () {
        var url = document.location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
    return MyUtils;
}());
__reflect(MyUtils.prototype, "MyUtils");
//# sourceMappingURL=MyUtils.js.map