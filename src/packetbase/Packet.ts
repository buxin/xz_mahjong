/**
 *
 * @author 
 *
 */
class Packet implements PacketHead{
    
    pkt_len: number;
    pkt_type: number;
    pkt_base: string;
	public constructor()
	{
	}
	
    read(by: egret.ByteArray):void{
        this.pkt_len = by.readInt();
        this.pkt_type = by.readInt();
        this.pkt_base = by.readUTFBytes(this.pkt_len - 8);
    }
    
    write(): egret.ByteArray{
        var by: egret.ByteArray = new egret.ByteArray;
        this.pkt_len = 8 + CommonUtils.calcStringByte(this.pkt_base);
        by.writeInt(this.pkt_len);
        by.writeInt(this.pkt_type);
        by.writeUTFBytes(this.pkt_base);
        return by;
    }
 /*
     var pet: Packet = new Packet;
     pet.pkt_type = PKT_TYPE.CUST_LOGIN;
     pet.pkt_base = "3243242342";
     WndManager.root.spush.sendPkt( pet);
     */
}
