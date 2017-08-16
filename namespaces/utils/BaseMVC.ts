/// <reference path="./../../creator.d.ts" />
class BaseController{
    protected _model

    public set model(model){
        this._model = model
    }

    public destroy(){
        if(this._model){
            this._model.destroy();
        }
    }
}

class BaseModel{
    protected _className:string
    protected _signalMap:object

    constructor (className:string){
        this._signalMap = {}
        this._className = className;
    }

    public addSignalListenner(proName : string, callback) : void
    {
        let signal:Signal = this._signalMap[proName + "ChangedSignal"];
        if(signal){
            signal.add(callback, this);
        }
    }

    public getChangedSignal(proName : string) : Signal
    {
        var signal = this._signalMap[proName + "ChangedSignal"];
        if(!signal){
            console.log("changedSignal: "+ proName +" is not exists");
        }
        return signal;
    }

    public registerChangedSignal(proName:string) : void 
    {
        cs.registerChangedSignal(this, proName);
    }

    /**
     * @param proName 属性名(不包含开头“_”下划线)
     * @param changeValue 默认可不传 表示值是以_开头的变量
     */
    public dispatchChangedSignal(proName:string, changeValue?) : void 
    {
        cs.dispatchChangedSignal(this, proName, changeValue || this["_"+proName]);
    }

    public destroy():void
    {
        Signal.clearAllSignal(this);
        this._signalMap = {};
    }

    /**
     * 偷懒用，一键生成 get set
     */
    printGetSetter(){
        let isCreateSetFunc = true
        let object = this;

        for (let prop in object) {
            let objProp = object[prop];
            //忽略函数和带"__"的变量
            if (objProp instanceof Function || prop.indexOf("__" ) == 0
                || prop == "_signalMap" || prop == "_className"
            ) 
            {
                continue;
            }

            let name = "";
            let valueName = "";
            if (prop.substr(0, 1) == "_") {
                //name = prop.substr(1, 1).toUpperCase() + prop.substr(2, prop.length);
                valueName = prop.substr(1, prop.length);
            } 

            let typeStr = "*";
            switch (typeof(objProp)) {
                case "number": typeStr = "Number"; break;
                case "string": typeStr = "String"; break;
                case "boolean": typeStr = "Boolean"; break;
                case "object":
                    if (objProp instanceof Array) typeStr = "Array";
                    else typeStr = "*|Object";
                    break;
                default: typeStr = "*"; break;
            }
            //console.log(cc.js.formatStr("/**\n * @returns {%s}\n */", typeStr));

            console.log(cc.js.formatStr("%s %s () {\n    return this.%s;\n};\n", "get", valueName, prop));
            if (isCreateSetFunc == undefined || isCreateSetFunc) {
                //console.log(cc.js.formatStr("/**\n * @param {%s} %s\n */", typeStr, valueName));
                console.log(cc.js.formatStr("%s %s (value) {\n    this.%s = value;\n};\n", "set", valueName, prop))
            }
        }
    }
}

class BaseView extends cc.Component{
    protected _controller
    protected _model

    public set controller(controlller){
        this._controller = controlller
    }

    set model (model){
        this._model = model;
        this.addSignalListenners()
    }

    onDestroy(){
        if(this._model)
            this._model.clearAllSignal(this);
    }

    addSignalListenners (){
        //noting to do
    }
}

window["BaseView"] = BaseView;
window["BaseModel"] = BaseModel;
window["BaseController"] = BaseController;