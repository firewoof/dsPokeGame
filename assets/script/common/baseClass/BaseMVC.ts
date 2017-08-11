
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

export class BaseModel{
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

    public getChangedSignal(proName : string)
    {
        var signal = this._signalMap[proName + "ChangedSignal"];
        if(!signal){
            cc.log("changedSignal: "+ proName +" is not exists");
        }
        return signal;
    }

    public destroy():void
    {
        Signal.clearAllSignal(this);
        this._signalMap = {};
    }
}


export class BaseView {
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