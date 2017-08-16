/*
signal.js
Copyright (c) 2011 Josh Tynjala
Released under the MIT license.

Based on as3-signals by Robert Penner
http://github.com/robertpenner/as3-signals
Copyright (c) 2009 Robert Penner
Released under the MIT license.
]] --
*/
class Signal {
    _traceName : string
    _listenersDic : Map<any,any> //key是getKey出来的字符串，value是listener
    _oneTimeListenersDic : Map<any,any>//key是getKey出来的字符串，value是listener
    _emitListenersArr
    _numListeners : number
    _numOneTimeListeners : number
    _newIndex : number

    constructor(traceName:string) {
        this._traceName = traceName;

        this.reset();
    }

    reset(){
        this._listenersDic = new Map()//[];
        this._oneTimeListenersDic = new Map()
        this._emitListenersArr = [];
        this._numListeners = 0;
        this._numOneTimeListeners = 0;        
        this._newIndex = 0;
    }

    isEmpty () {
        return this._numListeners <= 0;
    }

    /**
     * 注册
     * @param func 
     * @param scope 
     */
    add (func, scope) {
        if (func == null) {
            cc.error("Function passed to signal:add() must not non-nil.");
        }
        
        var obj = this.getListener(func, scope)
        if (obj.isNew) {
            this._listenersDic[obj.listener.key] = obj.listener;
            this._numListeners = this._numListeners + 1;
            this._emitListenersArr.push(obj.listener);
        }
        else
            obj.listener = null;

        return obj.listener;
    }

    addOnce (func, scope) {
        var listener = this.add(func, scope);
        if (listener) {
            this._oneTimeListenersDic[listener.key] = listener;
            this._numOneTimeListeners = this._numOneTimeListeners + 1;
        }
        return listener;
    }

    emit(value){
        this.dispatch(value);
    }

    dispatch (value) {
        if (this._numListeners <= 0) {
            return;
        }

        let t = null;
        let dispatchNum = null;
        if (this._numListeners == 1) {
            let listener = this.getOne();
            if (listener.scope) {
                listener.func.call(listener.scope, value);
            }
            else
                listener.func(value);
        }
        else {
            if (this._emitListenersArr.length == 0) {
                this._emitListenersArr = this.toArray(this._listenersDic);
                this._emitListenersArr.sort(this.listenerSorter);
            }
            for (let i = 0; i <  this._emitListenersArr.length; i++) {
                let listener =  this._emitListenersArr[i];            
                if (listener.scope)
                    listener.func.call(listener.scope, value);
                else
                    listener.func(value);

            }
        }

        if (this._numOneTimeListeners > 0) {
            for (let k in this._oneTimeListenersDic) {
                this.remove(this._oneTimeListenersDic[k]);
            }
        }

    }

    remove (func, scope?) {
        var listener = null;
        if(typeof(func) == "function") {
            listener = this.getListener(func, scope);
        }
        else {
            listener = func;
        }
        var isContains = this._listenersDic[listener.key] != null;
        if(isContains) {
            this._listenersDic[listener.key] = null;
            this._numListeners = this._numListeners - 1
            this._listenersDic[listener.key] = null;
        }

        if(this._oneTimeListenersDic[listener.key]) {
            this._oneTimeListenersDic[listener.key] = null;
            this._numOneTimeListeners = this._numOneTimeListeners - 1;
        }
    }

    removeAll () {
        this.reset();
    }

    getListener (func, scope){
        let key = this.getKey(func, scope);
        let listener = this._listenersDic[key];
        let isNew = false;
        let scopeFunc = null;
        if(!listener){
            this._newIndex = this._newIndex + 1;
            isNew = true;
            listener = {func: func, scope: scope, key: key, index: this._newIndex}
        }    
        return {listener : listener, isNew : isNew}
    }

    /**
     * 清除这个对象上面的所有Signal的事件绑定
     */
    public static clearAllSignal (obj:object){
        if(!obj || !obj["_signalMap"]){
            return;
        }
        let signalMap = obj["_signalMap"];  //约定-信号对象只放置在_signalMap对象上
        for(let k in signalMap) {
            var signal = obj[k];
            signal.removeAll();
            // if(typeof signal == "function" && signal._className == "Signal") {
            //     signal.removeAll();
            // }
        }
    }

    public toArray (dic){
        var result = [];
        for(let k in dic) {
            result.push(dic[k]);
        }
        return result;
    }

    public getOne () {
        for (let v in this._listenersDic) {
            return this._listenersDic[v];
        }
    }

    public listenerSorter (a, b) {
        return a.index - b.index;
    }

    public getKey (func, scope) {    
        let key = func.__signalSymbol;        
        if(!key || !this._listenersDic[key] || this._listenersDic[key].scope != scope){
            key = func.__signalSymbol = Symbol("singalSymbol");
        }
        cc.log(key.toString());
        return key;
    }
}

window["Signal"] = Signal;


