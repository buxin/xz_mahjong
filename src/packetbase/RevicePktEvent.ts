/**
 *
 * @author 
 *
 */
class RevicePktEvent extends egret.Event{
    
    constructor(type: string, bubbles?: boolean, cancelable?: boolean){
        super(type,bubbles,cancelable);
	}
	
    pkt: any;
}
