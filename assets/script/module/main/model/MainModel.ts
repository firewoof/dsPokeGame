import {BaseController, BaseModel} from "../../../common/baseClass/BaseMVC"
export default class MainModel extends BaseModel {
    protected _isShowFPS:boolean;

    constructor(){
        super()
        this._className = "MainModel";

        this.registerSignals();
    }

    /**
     * 注册属性变更信号
     */
    private registerSignals(){
        cs.registerChangedSignal(this, "isShowFPS");
    }

    set isShowFPS(value:boolean){
        this._isShowFPS = value;
        cs.dispatchChangedSignal(this, "isShowFPS", this._isShowFPS);
    }

    get isShowFPS(){
       return this._isShowFPS
    }
}