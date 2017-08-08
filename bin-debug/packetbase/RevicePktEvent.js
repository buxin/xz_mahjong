var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var RevicePktEvent = (function (_super) {
    __extends(RevicePktEvent, _super);
    function RevicePktEvent(type, bubbles, cancelable) {
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    return RevicePktEvent;
}(egret.Event));
__reflect(RevicePktEvent.prototype, "RevicePktEvent");
//# sourceMappingURL=RevicePktEvent.js.map