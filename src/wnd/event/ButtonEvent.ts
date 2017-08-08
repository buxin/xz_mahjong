/**
 *
 * @author 
 *
 */
class ButtonEvent  extends egret.Event{
    public static CLICK:string="click";
    private _code:number=-1;//事件的code
    private _name:string="";//事件的名称
    private _timer:number=0;//时间
    private _codeStr:string="";
    private _targetObject:any;//指定事件对象
	public constructor(type: string) {
		super(type);
	}
     public set timer(value:number){
       this._timer=value;
    }
   public get timer():number{
      return  this._timer; 
    }
    public set code(value:number){
       this._code=value;
    }
   public get code():number{
      return  this._code; 
    }
   public set codeStr(str:string){
       this._codeStr=str;
    }
   public get codeStr():string{
      return  this._codeStr; 
    }
  public set name(value:string){
       this._name=value;
    }
   public get name():string{
      return  this._name; 
    }
  public set targetObject(value:any){
       this._targetObject=value;
    }
   public get targetObject():any{
      return  this._targetObject; 
    }
}