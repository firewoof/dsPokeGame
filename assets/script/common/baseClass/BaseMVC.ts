
export class BaseController{
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

import Signal from "../utils/Signal"
export class BaseModel{
    protected _className:string
    protected _signalMap:object

    constructor (){
        this._signalMap = {}
    }

    public addSignalListenner(proName, callback){
        let signal = this._signalMap[proName + "ChangedSignal"];
        if(signal){
            signal.add(callback, this);
        }
    }

    public destroy(){
        Signal.clearAllSignal(this);
        this._signalMap = {};
    }
}