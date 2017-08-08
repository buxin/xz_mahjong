var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NotityWnd = (function (_super) {
    __extends(NotityWnd, _super);
    function NotityWnd(root) {
        var _this = _super.call(this) || this;
        _this.msgLabel = new eui.Label();
        _this.msgLabel.x = 0;
        _this.msgLabel.y = 0;
        _this.addChild(_this.msgLabel);
        _this.root = root;
        return _this;
    }
    NotityWnd.prototype.show = function (msg) {
        var sp = new egret.Sprite;
        this.addChild(sp);
        var txt = new egret.TextField;
        txt.text = msg;
        txt.size = 45;
        this.addChild(txt);
        txt.textColor = 0xffffff;
        txt.x = 1820;
        txt.stroke = 0;
        txt.strokeColor = 0x18388D;
        txt.y = 1080 / 2;
        var nX = (1820 - txt.width) / 2;
        txt.bold = true;
        var self = this;
        sp.graphics.beginFill(0x000000, 1);
        sp.graphics.drawRoundRect(0, 0, txt.width + 40, txt.height + 10, 10, 10);
        sp.graphics.endFill();
        sp.x = txt.x - 20;
        sp.y = txt.y - 5;
        egret.Tween.get(txt).to({ x: nX }, 400).wait(1000).to({ x: -1820 }, 400).call(function () {
            self.removeChild(txt);
        }, this);
        egret.Tween.get(sp).to({ x: nX - 20 }, 400).wait(1000).to({ x: -1820 - 20 }, 400).call(function () {
            self.removeChild(sp);
        }, this);
    };
    NotityWnd.prototype.onTweenComplete = function () {
        this.visible = false;
    };
    return NotityWnd;
}(eui.Component));
NotityWnd.MOVE_HORIZONTAL = "MOVE_HORIZONTAL";
__reflect(NotityWnd.prototype, "NotityWnd");
//# sourceMappingURL=NotityWnd.js.map