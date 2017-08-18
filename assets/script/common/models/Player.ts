/**
 * 简单玩家对象(可用于其他玩家)
 */
export class SimplePlayer extends BaseModel{
    protected _id;
    protected _nickName;

    protected _status
    protected _chairId

    constructor(className){
        super(className || "BaseModel");

        //初始化
        this._id = null;
        this._nickName = null;
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

    private static _instance : Player;

    public static get instance() : Player { 
        if(!Player.instance){
            Player._instance = new Player();
        }
        return Player._instance;
    }

    constructor(){
        super("Player");

        this.registerChangedSignal("nickName");
    }

    set nickName(value) { 
        this._nickName = value; 
        this.dispatchChangedSignal("nickName");
    }

    initByJson() : void {
        
    }
}