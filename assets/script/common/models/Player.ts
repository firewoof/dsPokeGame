/**
 * 简单玩家对象(可用于其他玩家)
 */
export class SimplePlayer{
    protected _id;
    protected _nickName;

    constructor(){
        // createSetterGetter(this, "id", undefined, false);
        // createSetterGetter(this, "nickName", undefined, true);
        
    }

    get nickName() : string { 
        return this._nickName; 
    }

    set nickName(value) { 
        this._nickName = value; 
    }
}

/**
 * 玩家单例对象(当前玩家)
 */
export default class Player extends SimplePlayer{
    _className:string
    _signalMap:object

    private static instance : Player;

    public static getInstance() : Player { 
        if(!Player.instance){
            Player.instance = new Player();
        }
        return Player.instance;
    }

    constructor(){
        super();
        this._className = "Player";
        this._signalMap = {};

        cs.registerChangedSignal(this, "nickName");
    }

    set nickName(value) { 
        this._nickName = value; 
        cs.dispatchChangedSignal(this, "nickName", this._nickName);
    }

    initByJson() : void {
        
    }
}