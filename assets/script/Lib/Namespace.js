var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 常量
 */
var cs;
(function (cs) {
    //服务器时区（协调世界时）
    cs.SERVER_UTC = 8; //东区符号+ 西区符号-
    //自定义通用配色
    /** GRAY */
    cs.GRAY = cc.color(143, 162, 176);
    /** RED */
    cs.RED = cc.color(217, 73, 47);
    /** GREEN */
    cs.GREEN = cc.color(35, 141, 90);
    /** YELLOW */
    cs.YELLOW = cc.color(252, 187, 12);
    /** BLACK */
    cs.BLACK = cc.color(21, 25, 26);
})(cs || (cs = {}));
window["cs"] = cs;
// let sgn = function (target: Function, key: string, value: any){
//         return {
//             value: function (...args: any[]) {
//                 var a = args.map(a => JSON.stringify(a)).join();
//                 var result = value.value.apply(this, args);
//                 var r = JSON.stringify(result);
//                 console.log(`Call: ${key}(${a}) => ${r}`);
//                 return result;
//             }
//         };
// }
// window.sgn = sgn; 
/**
 * 枚举
 */
var cs;
(function (cs) {
    /**
     * 日志类型
     */
    var LogTypes;
    (function (LogTypes) {
        LogTypes["REQUEST"] = "Request";
        LogTypes["NORMAL"] = "Normal";
    })(LogTypes = cs.LogTypes || (cs.LogTypes = {}));
    /**
     * 本地存储 key
     */
    var LSTypes;
    (function (LSTypes) {
        LSTypes["UUID"] = "UUID";
        LSTypes["NORMAL"] = "Normal";
    })(LSTypes = cs.LSTypes || (cs.LSTypes = {}));
})(cs || (cs = {}));
/**
 * cs 自定义命名空间
 */
/// <reference path="./../creator.d.ts" />
var cs;
(function (cs) {
    //时间
    /**
     * 获得相对精确的当前时间(1970至今的毫秒数)
     */
    function getCurTime() {
        var date = new Date();
        var time = date.getTime();
        return time; //+ fixedTime ;//加上修正时间差(涉及与服务器对时)
    }
    cs.getCurTime = getCurTime;
    function getCurSecs() {
        return this.getCurTime() / 1000;
    }
    cs.getCurSecs = getCurSecs;
    /**
     * 获得Date类型的日期
     */
    function getDate(milliSecs) {
        milliSecs = milliSecs || cs.getCurTime();
        var date = new Date(milliSecs);
        date.setUTCHours(cs.SERVER_UTC);
        return date;
    }
    cs.getDate = getDate;
    /**
     * 服务器所在的时区与本地时区偏差
     */
    function getServerOffsetSecs() {
        if (this._serverOffsetSecs == undefined) {
            //将本地现在时间换算成0时区时间
            var date = new Date();
            var localZoneOffset = date.getTimezoneOffset();
            this._serverOffsetSecs = (localZoneOffset + cs.SERVER_UTC * 60) * 60;
            cc.log("_serverOffsetSecs::", this._serverOffsetSecs);
            cc.log("_serverOffsetmin::", this._serverOffsetSecs / 60);
        }
        return this._serverOffsetSecs;
    }
    cs.getServerOffsetSecs = getServerOffsetSecs;
    /**
     * 得到凌晨的时间戳（s）
     */
    function getZeroSecs(milliSecs) {
        var curDate = cs.getDate(milliSecs);
        curDate.setHours(0);
        curDate.setMinutes(0);
        curDate.setSeconds(0);
        curDate.setMilliseconds(0);
        return (curDate.getTime() / 1000 - cs.getServerOffsetSecs());
    }
    cs.getZeroSecs = getZeroSecs;
    /**
     * 格式化时间戳，方便输出日期---note:效率比较低下 不适合大量用
     * @param {*|Number} [secs]
     * @param {String} [format] for example "yy:MM:dd HH:mm:ss"
    */
    function formatSecs(secs, format) {
        secs = secs || this.getCurSecs();
        var locDate = new Date(secs * 1000);
        format = format || "yy:MM:dd HH:mm:ss";
        var str = format.replace("yy", locDate.getFullYear().toString());
        str = str.replace("MM", padNumber(locDate.getMonth() + 1, 2));
        str = str.replace("dd", padNumber(locDate.getDate(), 2));
        str = str.replace("HH", padNumber(locDate.getHours(), 2));
        str = str.replace("mm", padNumber(locDate.getMinutes(), 2));
        str = str.replace("ss", padNumber(locDate.getSeconds(), 2));
        return str;
    }
    cs.formatSecs = formatSecs;
    /**
     * 填充数字补0，比如1 ~ 9 => 01 ~ 09
     * @param num   --to pad num
     * @param n     --填充后的位数
     */
    function padNumber(num, n) {
        var rNum = num.toString();
        var len = rNum.length;
        while (len < n) {
            rNum = "0" + num;
            len++;
        }
        return rNum;
    }
    /**
     * 深拷贝--仅限于js原生对象
     * @param obj --被拷贝对象
     */
    function deepClone(obj) {
        var value;
        if (typeof obj === "object" && Object.prototype.toString.call(obj) === '[object Object]') {
            value = new obj.constructor();
            for (var key in obj) {
                value[key] = this.deepClone(obj[key]);
            }
        }
        else if (typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Array]') {
            value = [];
            for (var i = 0; i < obj.length; i++) {
                value.push(this.deepClone(obj[i]));
            }
        }
        else {
            value = obj;
        }
        return value;
    }
    cs.deepClone = deepClone;
    /**
     * 浅拷贝对象
     * @param obj
     */
    function shallowClone(obj) {
        var value;
        if (typeof obj === "object" && Object.prototype.toString.call(obj) === '[object Object]') {
            value = new obj.constructor();
            for (var key in obj) {
                value[key] = obj[key];
            }
        }
        else if (typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Array]') {
            value = [];
            for (var i = 0; i < obj.length; i++) {
                value.push(obj[i]);
            }
        }
        else {
            value = obj;
        }
        return value;
    }
    /**
     * 取min~max浮点数
     * @param min
     * @param max
     * @returns {Number}
     */
    function getRandomFloat(min, max) {
        var range = max - min;
        var rand = Math.random();
        return (min + Math.round(rand * range));
    }
    cs.getRandomFloat = getRandomFloat;
    /**
     * 取min~max的随机整数
     * @param min
     * @param max
     * @returns {Number}
     */
    function getRandomInteger(min, max) {
        var range = max - min;
        var rand = Math.random();
        return Math.floor(min + Math.round(rand * range));
    }
    cs.getRandomInteger = getRandomInteger;
    /**
     * 快速排序
     * @param arrayA
     * @param compareFn
     * @returns {*}
     */
    function quickSort(array, compareFn) {
        function sort(prev, numsize) {
            var nonius = prev;
            var j = numsize - 1;
            var flag = array[prev];
            if ((numsize - prev) > 1) {
                while (nonius < j) {
                    for (; nonius < j; j--) {
                        if (compareFn(flag, array[j]) > 0) {
                            array[nonius++] = array[j]; //a[i] = a[j]; i += 1;
                            break;
                        }
                        ;
                    }
                    for (; nonius < j; nonius++) {
                        if (compareFn(flag, array[nonius]) > 0) {
                            array[j--] = array[nonius];
                            break;
                        }
                    }
                }
                array[nonius] = flag;
                sort(0, nonius);
                sort(nonius + 1, numsize);
            }
        }
        sort(0, array.length);
        return array;
    }
    cs.quickSort = quickSort;
    /**
     * 冒泡
     * @param arr
     * @param compareFn
     */
    function bubbleSort(arr, compareFn) {
        var i = arr.length, j;
        var tempExchangeVal;
        while (i > 0) {
            for (j = 0; j < i - 1; j++) {
                if (compareFn(arr[j], arr[j + 1]) > 0) {
                    tempExchangeVal = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tempExchangeVal;
                }
            }
            i--;
        }
        return arr;
    }
    cs.bubbleSort = bubbleSort;
    /**
     * 将对象字符串化写到文件里(默认是覆盖)
     * sample: cs.writeDataToFile("tradeData.json", {key1: "value1", key2: "value2"} );
     */
    function writeJsonToFile(filePath, jsonData) {
        if (cc.sys.isNative) {
            cs.GameFileUtils.writeStringToFile(jsb.fileUtils.getWritablePath() + filePath, JSON.stringify(jsonData));
        }
    }
    cs.writeJsonToFile = writeJsonToFile;
    ;
    function writeStringToFile(filePath, str) {
        if (cc.sys.isNative) {
            cs.GameFileUtils.writeStringToFile(jsb.fileUtils.getWritablePath() + filePath, str);
        }
    }
    cs.writeStringToFile = writeStringToFile;
    ;
    /**
     * @param filePath 要打开的文件名( 可包含路径 )
     * @param callFunc (jsonData, err) 打开文件返回的json数据
     */
    function readJsonFromFile(filePath, callFunc) {
        if (cc.sys.isNative) {
            var isFileExists = jsb.fileUtils.isFileExist(jsb.fileUtils.getWritablePath() + filePath);
            if (!isFileExists) {
                cc.log("readJsonFromFile ::" + filePath + "not exists");
                return;
            }
            cc.loader.loadJson(jsb.fileUtils.getWritablePath() + filePath, function (err, jsonData) {
                try {
                    if (!err) {
                        callFunc(jsonData, err);
                    }
                    else {
                        cc.log(err);
                        callFunc(undefined, err);
                    }
                }
                catch (e) {
                    cc.log(e.stack);
                }
            });
        }
    }
    cs.readJsonFromFile = readJsonFromFile;
    function setItem(key, value) {
        if (value == null) {
            cc.sys.localStorage.removeItem(key);
        }
        else {
            cc.sys.localStorage.setItem(key, value);
        }
    }
    cs.setItem = setItem;
    function getItem(key) {
        return cc.sys.localStorage.getItem(key);
    }
    cs.getItem = getItem;
    function removeItem(key) {
        cc.sys.localStorage.removeItem(key);
    }
    cs.removeItem = removeItem;
    /**
     * 生成一个唯一id 附带设备标志，时间戳
     */
    function genUUID() {
        if (this.uuid) {
            return this.uuid;
        }
        var uuid = cs.getItem(cs.LSTypes.UUID);
        if (!uuid) {
            var SOS = "WB";
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                SOS = "DR";
            }
            else if (cc.sys.os == cc.sys.OS_IOS) {
                SOS = "AP";
            }
            else if (cc.sys.os == cc.sys.OS_WINDOWS) {
                SOS = "WD";
            }
            uuid = SOS + cs.getRandomInteger(1000000, 9999999) + "_" + cs.formatSecs(cs.getCurSecs(), "yyMMddHHmmss");
            cs.setItem(cs.LSTypes.UUID, uuid);
        }
        this.uuid = uuid;
        return this.uuid;
    }
    cs.genUUID = genUUID;
    /**
     * 注册change消息
     * @param selfObj
     * @param varName
     */
    function registerChangedSignal(selfObj, varName) {
        var signalName = varName + "ChangedSignal";
        selfObj._signalMap = selfObj._signalMap || {};
        selfObj._signalMap[signalName] = new Signal((selfObj._className || "") + "-" + signalName);
        cc.log("registerSignal", (selfObj._className || "") + "-" + signalName);
    }
    cs.registerChangedSignal = registerChangedSignal;
    /**
     * 添加消息监听
     */
    function addSignalListenner(selfObj, proName, callback) {
        var signal = selfObj._signalMap[proName + "ChangedSignal"];
        if (signal) {
            signal.add(callback, selfObj);
        }
    }
    cs.addSignalListenner = addSignalListenner;
    /**
     * 分发变更消息
     * @param selfObj
     * @param varName
     * @param value
     */
    function dispatchChangedSignal(selfObj, varName, value) {
        if (!selfObj._signalMap)
            return;
        var signalName = varName + "ChangedSignal";
        var signal = selfObj._signalMap[signalName];
        if (signal) {
            signal.dispatch(value);
        }
    }
    cs.dispatchChangedSignal = dispatchChangedSignal;
})(cs || (cs = {}));
var cs;
(function (cs) {
    var PrefabSrc;
    (function (PrefabSrc) {
        PrefabSrc["loginView"] = "prefabs/loginView";
        PrefabSrc["mainView"] = "prefabs/main/mainView";
    })(PrefabSrc = cs.PrefabSrc || (cs.PrefabSrc = {}));
})(cs || (cs = {}));
/// <reference path="./../../creator.d.ts" />
var BaseController = (function () {
    function BaseController() {
    }
    Object.defineProperty(BaseController.prototype, "model", {
        set: function (model) {
            this._model = model;
        },
        enumerable: true,
        configurable: true
    });
    BaseController.prototype.destroy = function () {
        if (this._model) {
            this._model.destroy();
        }
    };
    return BaseController;
}());
var BaseModel = (function () {
    function BaseModel(className) {
        this._signalMap = {};
        this._className = className;
    }
    BaseModel.prototype.addSignalListenner = function (proName, callback) {
        var signal = this._signalMap[proName + "ChangedSignal"];
        if (signal) {
            signal.add(callback, this);
        }
    };
    BaseModel.prototype.getChangedSignal = function (proName) {
        var signal = this._signalMap[proName + "ChangedSignal"];
        if (!signal) {
            console.log("changedSignal: " + proName + " is not exists");
        }
        return signal;
    };
    BaseModel.prototype.registerChangedSignal = function (proName) {
        cs.registerChangedSignal(this, proName);
    };
    /**
     * @param proName 属性名(不包含开头“_”下划线)
     * @param changeValue 默认可不传 表示值是以_开头的变量
     */
    BaseModel.prototype.dispatchChangedSignal = function (proName, changeValue) {
        cs.dispatchChangedSignal(this, proName, changeValue || this["_" + proName]);
    };
    BaseModel.prototype.destroy = function () {
        Signal.clearAllSignal(this);
        this._signalMap = {};
    };
    /**
     * 偷懒用，一键生成 get set
     */
    BaseModel.prototype.printGetSetter = function () {
        var isCreateSetFunc = true;
        var object = this;
        for (var prop in object) {
            var objProp = object[prop];
            //忽略函数和带"__"的变量
            if (objProp instanceof Function || prop.indexOf("__") == 0
                || prop == "_signalMap" || prop == "_className") {
                continue;
            }
            var name_1 = "";
            var valueName = "";
            if (prop.substr(0, 1) == "_") {
                //name = prop.substr(1, 1).toUpperCase() + prop.substr(2, prop.length);
                valueName = prop.substr(1, prop.length);
            }
            var typeStr = "*";
            switch (typeof (objProp)) {
                case "number":
                    typeStr = "Number";
                    break;
                case "string":
                    typeStr = "String";
                    break;
                case "boolean":
                    typeStr = "Boolean";
                    break;
                case "object":
                    if (objProp instanceof Array)
                        typeStr = "Array";
                    else
                        typeStr = "*|Object";
                    break;
                default:
                    typeStr = "*";
                    break;
            }
            //console.log(cc.js.formatStr("/**\n * @returns {%s}\n */", typeStr));
            console.log(cc.js.formatStr("%s %s () {\n    return this.%s;\n};\n", "get", valueName, prop));
            if (isCreateSetFunc == undefined || isCreateSetFunc) {
                //console.log(cc.js.formatStr("/**\n * @param {%s} %s\n */", typeStr, valueName));
                console.log(cc.js.formatStr("%s %s (value) {\n    this.%s = value;\n};\n", "set", valueName, prop));
            }
        }
    };
    return BaseModel;
}());
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BaseView.prototype, "controller", {
        set: function (controlller) {
            this._controller = controlller;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseView.prototype, "model", {
        set: function (model) {
            this._model = model;
            this.addSignalListenners();
        },
        enumerable: true,
        configurable: true
    });
    BaseView.prototype.onDestroy = function () {
        if (this._model)
            this._model.clearAllSignal(this);
    };
    BaseView.prototype.addSignalListenners = function () {
        //noting to do
    };
    return BaseView;
}(cc.Component));
window["BaseView"] = BaseView;
window["BaseModel"] = BaseModel;
window["BaseController"] = BaseController;
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
var Signal = (function () {
    function Signal(traceName) {
        this._traceName = traceName;
        this.reset();
    }
    Signal.prototype.reset = function () {
        this._listenersDic = new Map(); //[];
        this._oneTimeListenersDic = new Map();
        this._emitListenersArr = [];
        this._numListeners = 0;
        this._numOneTimeListeners = 0;
        this._newIndex = 0;
    };
    Signal.prototype.isEmpty = function () {
        return this._numListeners <= 0;
    };
    /**
     * 注册
     * @param func
     * @param scope
     */
    Signal.prototype.add = function (func, scope) {
        if (func == null) {
            cc.error("Function passed to signal:add() must not non-nil.");
        }
        var obj = this.getListener(func, scope);
        if (obj.isNew) {
            this._listenersDic[obj.listener.key] = obj.listener;
            this._numListeners = this._numListeners + 1;
            this._emitListenersArr.push(obj.listener);
        }
        else
            obj.listener = null;
        return obj.listener;
    };
    Signal.prototype.addOnce = function (func, scope) {
        var listener = this.add(func, scope);
        if (listener) {
            this._oneTimeListenersDic[listener.key] = listener;
            this._numOneTimeListeners = this._numOneTimeListeners + 1;
        }
        return listener;
    };
    Signal.prototype.emit = function (value) {
        this.dispatch(value);
    };
    Signal.prototype.dispatch = function (value) {
        if (this._numListeners <= 0) {
            return;
        }
        var t = null;
        var dispatchNum = null;
        if (this._numListeners == 1) {
            var listener = this.getOne();
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
            for (var i = 0; i < this._emitListenersArr.length; i++) {
                var listener = this._emitListenersArr[i];
                if (listener.scope)
                    listener.func.call(listener.scope, value);
                else
                    listener.func(value);
            }
        }
        if (this._numOneTimeListeners > 0) {
            for (var k in this._oneTimeListenersDic) {
                this.remove(this._oneTimeListenersDic[k]);
            }
        }
    };
    Signal.prototype.remove = function (func, scope) {
        var listener = null;
        if (typeof (func) == "function") {
            listener = this.getListener(func, scope);
        }
        else {
            listener = func;
        }
        var isContains = this._listenersDic[listener.key] != null;
        if (isContains) {
            this._listenersDic[listener.key] = null;
            this._numListeners = this._numListeners - 1;
            this._listenersDic[listener.key] = null;
        }
        if (this._oneTimeListenersDic[listener.key]) {
            this._oneTimeListenersDic[listener.key] = null;
            this._numOneTimeListeners = this._numOneTimeListeners - 1;
        }
    };
    Signal.prototype.removeAll = function () {
        this.reset();
    };
    Signal.prototype.getListener = function (func, scope) {
        var key = this.getKey(func, scope);
        var listener = this._listenersDic[key];
        var isNew = false;
        var scopeFunc = null;
        if (!listener) {
            this._newIndex = this._newIndex + 1;
            isNew = true;
            listener = { func: func, scope: scope, key: key, index: this._newIndex };
        }
        return { listener: listener, isNew: isNew };
    };
    /**
     * 清除这个对象上面的所有Signal的事件绑定
     */
    Signal.clearAllSignal = function (obj) {
        if (!obj || !obj["_signalMap"]) {
            return;
        }
        var signalMap = obj["_signalMap"]; //约定-信号对象只放置在_signalMap对象上
        for (var k in signalMap) {
            var signal = obj[k];
            signal.removeAll();
            // if(typeof signal == "function" && signal._className == "Signal") {
            //     signal.removeAll();
            // }
        }
    };
    Signal.prototype.toArray = function (dic) {
        var result = [];
        for (var k in dic) {
            result.push(dic[k]);
        }
        return result;
    };
    Signal.prototype.getOne = function () {
        for (var v in this._listenersDic) {
            return this._listenersDic[v];
        }
    };
    Signal.prototype.listenerSorter = function (a, b) {
        return a.index - b.index;
    };
    Signal.prototype.getKey = function (func, scope) {
        var key = func.__signalSymbol;
        if (!key || !this._listenersDic[key] || this._listenersDic[key].scope != scope) {
            key = func.__signalSymbol = Symbol("singalSymbol");
        }
        cc.log(key.toString());
        return key;
    };
    return Signal;
}());
window["Signal"] = Signal;
