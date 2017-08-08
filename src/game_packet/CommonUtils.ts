/**
 *
 * @author 
 *
 */
class CommonUtils {
	public constructor() {
	}
	
    static by: egret.ByteArray = new egret.ByteArray;
	public static calcStringByte( str:string):number{
        CommonUtils.by.writeUTFBytes(str);
        var len = CommonUtils.by.length;
        CommonUtils.by.clear();
        return len;
	}
}
