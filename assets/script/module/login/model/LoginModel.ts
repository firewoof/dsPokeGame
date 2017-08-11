import { BaseModel, BaseView, BaseController } from "../../../common/baseClass/BaseMVC"
export default class LoginModel extends BaseModel {
    protected _isShowFPS:boolean;

    constructor(){
        super("LoginModel")

        //
        this.registerSignals();
    }

   /**
     * 注册属性变更信号
     */
    private registerSignals(){
        //cs.registerChangedSignal(this, "isShowFPS");
    }
}