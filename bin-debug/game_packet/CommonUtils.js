var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var CommonUtils = (function () {
    function CommonUtils() {
    }
    CommonUtils.calcStringByte = function (str) {
        CommonUtils.by.writeUTFBytes(str);
        var len = CommonUtils.by.length;
        CommonUtils.by.clear();
        return len;
    };
    return CommonUtils;
}());
CommonUtils.by = new egret.ByteArray;
__reflect(CommonUtils.prototype, "CommonUtils");
//# sourceMappingURL=CommonUtils.js.map