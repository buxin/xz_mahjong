/**
 *
 * @author 
 *
 */
class JssdkEvent  extends egret.Event{
    public static SENDSOUND:string="sendsound";
    public static SOUNDEND:string="soundend";
    private _code:string="";//事件的code
    private _name:string="";//事件的名称
	public constructor(type: string) {
		super(type);
	}
    public set code(value:string){
       this._code=value;
    }
   public get code():string{
      return  this._code; 
    }
  public set name(value:string){
       this._name=value;
    }
   public get name():string{
      return  this._name; 
    }
}