var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Packet = (function () {
    function Packet() {
    }
    Packet.prototype.read = function (by) {
        this.pkt_len = by.readInt();
        this.pkt_type = by.readInt();
        this.pkt_base = by.readUTFBytes(this.pkt_len - 8);
    };
    Packet.prototype.write = function () {
        var by = new egret.ByteArray;
        this.pkt_len = 8 + CommonUtils.calcStringByte(this.pkt_base);
        by.writeInt(this.pkt_len);
        by.writeInt(this.pkt_type);
        by.writeUTFBytes(this.pkt_base);
        return by;
    };
    return Packet;
}());
__reflect(Packet.prototype, "Packet", ["PacketHead"]);
//# sourceMappingURL=Packet.js.map