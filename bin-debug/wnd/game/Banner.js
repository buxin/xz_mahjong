var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*/////////////////////////////////////////////////////////////////////////////////////
//公共事件
-------------

//公共属性
-----------

//公共方法
/////////////////////////////////////////////////////////////////////////////////////*/
var Banner = (function (_super) {
    __extends(Banner, _super);
    //
    function Banner() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/wnd/banner.exml";
        return _this;
    }
    Banner.prototype.onComplete = function () {
        this.init();
    };
    Banner.prototype.init = function () {
    };
    return Banner;
}(eui.Component));
__reflect(Banner.prototype, "Banner");
//# sourceMappingURL=Banner.js.map