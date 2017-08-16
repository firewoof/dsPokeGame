export default class LoginModel extends BaseModel {
     _isShowFPS:boolean;

    constructor(){
        super("LoginModel")

        //把所有值赋值默认值
        this._isShowFPS = false;

        //
        this.registerSignals();
    }

    get isShowFPS () {
        return this._isShowFPS;
    };

    set isShowFPS (value) {
        this._isShowFPS = value;
    };

   /**
     * 注册属性变更信号
     */
    private registerSignals(){
        //cs.registerChangedSignal(this, "isShowFPS");
    }
}