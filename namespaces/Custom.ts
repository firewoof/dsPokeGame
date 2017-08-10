
/**
 * cs 自定义命名空间
 */
//// <reference path="./../../../creator.d.ts" />
namespace cs {
    /**************** 常量区 scope ****************/
    //服务器时区（协调世界时）
    export const SERVER_UTC = 8; //东区符号+ 西区符号-

    //自定义通用配色
    /** GRAY */
    export const GRAY = cc.color(143, 162, 176);
    /** RED */
    export const RED = cc.color(217, 73, 47);
    /** GREEN */    
    export const GREEN = cc.color(35, 141, 90);
    /** YELLOW */
    export const YELLOW = cc.color(252, 187, 12);
    /** BLACK */
    export const BLACK = cc.color(21, 25, 26);
    /**************** 常量区 end ****************/


    /**************** 枚举区 scope 请尽量以types结尾，表示这是枚举****************/
    /**
     * 日志类型
     */
    export enum LogTypes {
        REQUEST = "Request",
        NORMAL = "Normal"
    }

    /**
     * 本地存储 key
     */
    export enum LSTypes {
        UUID = "UUID",
        NORMAL = "Normal"
    }
    /**************** 枚举区 end ****************/

    //时间
    /**
     * 获得相对精确的当前时间(1970至今的毫秒数)
     */
    export function getCurTime() : number
    {
        let date = new Date();
        let time = date.getTime();
        return time; //+ fixedTime ;//加上修正时间差(涉及与服务器对时)
    }

    export function getCurSecs ():number
    {
        return this.getCurTime()/1000;
    }

    /**
     * 获得Date类型的日期
     */
    export function getDate (milliSecs:number) : Date
    {
        milliSecs = milliSecs || cs.getCurTime();
        let date = new Date(milliSecs);
        date.setUTCHours(cs.SERVER_UTC);
        return date;
    }

    /**
     * 服务器所在的时区与本地时区偏差
     */
    export function getServerOffsetSecs () : number
    {
        if(this._serverOffsetSecs == undefined){
            //将本地现在时间换算成0时区时间
            let date = new Date();
            let localZoneOffset = date.getTimezoneOffset();
            this._serverOffsetSecs = (localZoneOffset + SERVER_UTC * 60) * 60;
            cc.log("_serverOffsetSecs::",this._serverOffsetSecs);
            cc.log("_serverOffsetmin::",this._serverOffsetSecs/60);
        }
        return this._serverOffsetSecs;
    }

    /**
     * 得到凌晨的时间戳（s）
     */
    export function getZeroSecs (milliSecs:number) : number
    {
        let curDate = cs.getDate(milliSecs);
        curDate.setHours(0);
        curDate.setMinutes(0);
        curDate.setSeconds(0);
        curDate.setMilliseconds(0);

        return (curDate.getTime() / 1000 - cs.getServerOffsetSecs());
    }

    /**
     * 格式化时间戳，方便输出日期---note:效率比较低下 不适合大量用
     * @param {*|Number} [secs]
     * @param {String} [format] for example "yy:MM:dd HH:mm:ss"
    */
    export function formatSecs (secs:number, format:string)
    {
        secs = secs || this.getCurSecs();
        let locDate = new Date(secs * 1000);
        format = format || "yy:MM:dd HH:mm:ss";
        var str = format.replace("yy", locDate.getFullYear().toString());
        str = str.replace("MM", padNumber(locDate.getMonth()+1, 2));
        str = str.replace("dd", padNumber(locDate.getDate(), 2));
        str = str.replace("HH", padNumber(locDate.getHours(), 2));
        str = str.replace("mm", padNumber(locDate.getMinutes(), 2));
        str = str.replace("ss", padNumber(locDate.getSeconds(), 2));
        return str;
    }

    /**
     * 填充数字补0，比如1 ~ 9 => 01 ~ 09
     * @param num   --to pad num
     * @param n     --填充后的位数
     */
    function padNumber (num:number, n:number) {
        let rNum = num.toString();
        let len = rNum.length;
        while(len < n) {
            rNum = "0" + num;
            len++;
        }
        return rNum;
    }

    /**
     * 深拷贝--仅限于js原生对象
     * @param obj --被拷贝对象
     */
    export function deepClone (obj:any) {
        let value;
        if (typeof obj === "object" && Object.prototype.toString.call(obj) === '[object Object]' ){
            value = new obj.constructor();
            for(let key in obj){
                value[key] = this.deepClone(obj[key]);
            }
        }else if(typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Array]'){
            value = [];
            for(let i = 0; i < obj.length; i++){
                value.push(this.deepClone(obj[i]))
            }
        }else{
            value = obj;
        }
        return value;
    }

    /**
     * 浅拷贝对象
     * @param obj
     */
    function shallowClone (obj) {
        let value;
        if (typeof obj === "object" && Object.prototype.toString.call(obj) === '[object Object]' ){
            value = new obj.constructor();
            for(let key in obj){
                value[key] = obj[key];
            }
        }else if(typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Array]'){
            value = [];
            for(let i = 0; i < obj.length; i++){
                value.push(obj[i])
            }
        }else{
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
    export function getRandomFloat (min : number,max : number) {
        let range = max - min;
        let rand = Math.random();
        return (min + Math.round(rand * range));
    }

    /**
     * 取min~max的随机整数
     * @param min
     * @param max
     * @returns {Number}
     */
    export function getRandomInteger (min : number, max : number) {
        let range = max - min;
        let rand = Math.random();
        return Math.floor(min + Math.round(rand * range));
    }

    /**
     * 快速排序
     * @param arrayA
     * @param compareFn
     * @returns {*}
     */
    export function quickSort (array,compareFn)
    {
        function sort(prev, numsize){
            let nonius = prev;
            let j = numsize -1;
            let flag = array[prev];
            if ((numsize - prev) > 1) {
                while(nonius < j){
                    for(; nonius < j; j--){
                        if (compareFn(flag,array[j])>0) {
                            array[nonius++] = array[j];//a[i] = a[j]; i += 1;
                            break;
                        };
                    }
                    for( ; nonius < j; nonius++){
                        if (compareFn(flag,array[nonius])>0){
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

    /**
     * 冒泡
     * @param arr
     * @param compareFn
     */
    export function bubbleSort (arr,compareFn) {
        var i = arr.length, j;
        var tempExchangeVal;
        while (i > 0) {
            for (j = 0; j < i - 1; j++) {
                if (compareFn(arr[j], arr[j + 1])>0) {
                    tempExchangeVal = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tempExchangeVal;
                }
            }
            i--;
        }
        return arr;
    }

    /**
     * 将对象字符串化写到文件里(默认是覆盖)
     * sample: cs.writeDataToFile("tradeData.json", {key1: "value1", key2: "value2"} );
     */
    export function writeJsonToFile (filePath : string, jsonData : JSON)
    {
        if(cc.sys.isNative){
            cs.GameFileUtils.writeStringToFile(jsb.fileUtils.getWritablePath() +  filePath, JSON.stringify(jsonData));
        }
    };

    export function writeStringToFile (filePath : string, str : string)
    {
        if(cc.sys.isNative){
            cs.GameFileUtils.writeStringToFile(jsb.fileUtils.getWritablePath() +  filePath, str);
        }
    };

    /**
     * @param filePath 要打开的文件名( 可包含路径 )
     * @param callFunc (jsonData, err) 打开文件返回的json数据
     */
    export function readJsonFromFile (filePath : string, callFunc)
    {
        if(cc.sys.isNative){
            let isFileExists = jsb.fileUtils.isFileExist(jsb.fileUtils.getWritablePath() + filePath);
            if(!isFileExists){
                cc.log("readJsonFromFile ::"+ filePath + "not exists");
                return;
            }
            cc.loader.loadJson(jsb.fileUtils.getWritablePath() + filePath,function(err,jsonData){
                try{
                    if(!err){
                        callFunc(jsonData, err);
                    }else{
                        cc.log(err);
                        callFunc(undefined, err);
                    }
                }catch(e){
                    cc.log(e.stack);
                }
            });
        }        
    }

    export function setItem (key:string, value:string){
        if(value == null){
            cc.sys.localStorage.removeItem(key);
        }else{
            cc.sys.localStorage.setItem(key, value);
        }
    }

    export function getItem (key:string) : string {
        return cc.sys.localStorage.getItem(key);
    }

    export function removeItem (key:string){
        cc.sys.localStorage.removeItem(key);
    } 

    /**
     * 生成一个唯一id 附带设备标志，时间戳
     */
    export function genUUID () : string {
        if(this.uuid){
            return this.uuid;
        }
        let uuid = cs.getItem(cs.LSTypes.UUID);
        if(!uuid){
            let SOS = "WB";
            if(cc.sys.os == cc.sys.OS_ANDROID){
                SOS = "DR";
            }else if(cc.sys.os == cc.sys.OS_IOS){
                SOS = "AP"
            }else if(cc.sys.os == cc.sys.OS_WINDOWS){
                SOS = "WD"
            }
            uuid = SOS + cs.getRandomInteger(1000000,9999999) +"_"+ cs.formatSecs(cs.getCurSecs(),"yyMMddHHmmss");
            cs.setItem(cs.LSTypes.UUID, uuid);
        }
        this.uuid = uuid;
        return this.uuid;
    }

    /**
     * 注册change消息
     * @param selfObj 
     * @param varName 
     */
    export function egisterChangedSignal (selfObj, varName)
    {
        let signalName = varName + "ChangedSignal";
        selfObj._signalMap = selfObj._signalMap || {};
        selfObj._signalMap[signalName] = new Signal((selfObj._className || "") + "-" + signalName);
        cc.log("registerSignal", (selfObj._className || "") + "-" + signalName);
    }

    /**
     * 添加消息监听
     */
    export function  addSignalListenner (selfObj, proName, callback)
    {
            let signal = selfObj._signalMap[proName + "ChangedSignal"];
            if(signal){
                signal.add(callback, selfObj);
            }
    }

    /**
     * 分发变更消息
     * @param selfObj 
     * @param varName 
     * @param value 
     */
    export function  dispatchChangedSignal (selfObj, varName, value)
    {
        if(!selfObj._signalMap)
            return;
        let signalName = varName + "ChangedSignal";
        let signal = selfObj._signalMap[signalName];
        if(signal){
            signal.dispatch(value)
        }
    }
}

// class ComponentEx extends cc.Component{
//     protected _controller
//     protected _model

//     public set controller(controlller){
//         this._controller = controlller
//     }
//}