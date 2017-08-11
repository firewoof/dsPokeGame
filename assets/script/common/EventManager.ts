import Signal from "./utils/Signal"
class  EventManager{
    private static instance:EventManager
    private _eventSignal:object

    constructor(){
        this._eventSignal = {};
    }

    public static getInstance() : EventManager { 
        if(!EventManager.instance){
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    }

    add(event:string, handler, scope){
        var signal = this.getSignalByEvent(event)
        signal.add(handler, scope);
    }

    addOnce(event:string, handler, scope){
        var signal = this.getSignalByEvent(event)
        signal.addOnce(handler, scope);
    }

    remove(event:string, handler, scope){
        var signal = this._eventSignal[event];
        if (signal) {
            signal.remove(handler, scope);
            this.tryToRemoveSignal(event)
        }
    }

    isExists(event):boolean{
        return this._eventSignal[event] != null;
    }

    dispatch(event:string){
        var signal = this._eventSignal[event];
        if (signal) {
            signal.prototype.emit.call(this, arguments);
            this.tryToRemoveSignal(event)
        }
    }

    tryToRemoveSignal(event:string){
        var signal = this._eventSignal[event];
        if (signal && signal.isEmpty() ){
            this._eventSignal[event] = null;
        }
    }

    getSignalByEvent(event:string){
        var signal = this._eventSignal[event];
        if (!signal) {
            signal = new Signal("Event:" + event);
            this._eventSignal[event] = signal;
        }

        return signal;
    }

    destroy(){
        if (this._eventSignal) {
            for(let key in this._eventSignal) {
               let signal = this._eventSignal[key]
                signal.removeAll();
            }
            this._eventSignal = null;
        }
    }
}