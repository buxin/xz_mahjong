/*/////////////////////////////////////////////////////////////////////////////////////

//公共属性
-----------
ownPartake:boolean;//自己是否坐下（只读）
----------
userPartake:boolean;//是否有用户坐下（只读）
-------------
userFull:boolean;//是否4个位置已经全部坐满（只读）
//公共方法

/////////////////////////////////////////////////////////////////////////////////////*/
class GameJudge {
	public constructor() {
	}
    static get ownPartake():boolean{
     for(var i:number=0;i<GameData.userNumber;i++){
           if(GameData.plays[i].tid==GameData.tid){
                   return true;
            }
       }
      return false;
   }
    static get userPartake():boolean{
     for(var i:number=0;i<GameData.userNumber;i++){
           if(GameData.plays[i].tid!=0){
                   return true;
            }
       }
      return false;
   }
    static get userFull():boolean{
     for(var i:number=0;i<GameData.userNumber;i++){
           if(GameData.plays[i].tid==0){
                   return false;
            }
       }
      return true;
   }
   
}