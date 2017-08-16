
// import "reflect-metadata";
// function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
//     let method = descriptor.value;
//     descriptor.value = function () {
//         let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
//         if (requiredParameters) {
//             for (let parameterIndex of requiredParameters) {
//                 if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
//                     throw new Error("Missing required argument.");
//                 }
//             }
//         }

//         return method.apply(this, arguments);
//     }
// }

export default class MainModel extends BaseModel {
    protected _isShowFPS:boolean;

    constructor(){
        super("MainModel")

        this.registerSignals();
    }

    /**
     * 注册属性变更信号
     */
    private registerSignals(){
        this.registerChangedSignal("isShowFPS");
    }

    //@configurable()
    set isShowFPS(value:boolean){ 
        this._isShowFPS = value;
        this.dispatchChangedSignal("isShowFPS");
    }

    get isShowFPS(){
       return this._isShowFPS
    }
}