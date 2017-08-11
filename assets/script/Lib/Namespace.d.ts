/**
 * 常量
 */
declare namespace cs {
    const SERVER_UTC = 8;
    /** GRAY */
    const GRAY: any;
    /** RED */
    const RED: any;
    /** GREEN */
    const GREEN: any;
    /** YELLOW */
    const YELLOW: any;
    /** BLACK */
    const BLACK: any;
}
/**
 * 枚举
 */
declare namespace cs {
    /**
     * 日志类型
     */
    enum LogTypes {
        REQUEST = "Request",
        NORMAL = "Normal",
    }
    /**
     * 本地存储 key
     */
    enum LSTypes {
        UUID = "UUID",
        NORMAL = "Normal",
    }
}
/**
 * cs 自定义命名空间
 */
declare namespace cs {
    /**
     * 获得相对精确的当前时间(1970至今的毫秒数)
     */
    function getCurTime(): number;
    function getCurSecs(): number;
    /**
     * 获得Date类型的日期
     */
    function getDate(milliSecs: number): Date;
    /**
     * 服务器所在的时区与本地时区偏差
     */
    function getServerOffsetSecs(): number;
    /**
     * 得到凌晨的时间戳（s）
     */
    function getZeroSecs(milliSecs: number): number;
    /**
     * 格式化时间戳，方便输出日期---note:效率比较低下 不适合大量用
     * @param {*|Number} [secs]
     * @param {String} [format] for example "yy:MM:dd HH:mm:ss"
    */
    function formatSecs(secs: number, format: string): string;
    /**
     * 深拷贝--仅限于js原生对象
     * @param obj --被拷贝对象
     */
    function deepClone(obj: any): any;
    /**
     * 取min~max浮点数
     * @param min
     * @param max
     * @returns {Number}
     */
    function getRandomFloat(min: number, max: number): number;
    /**
     * 取min~max的随机整数
     * @param min
     * @param max
     * @returns {Number}
     */
    function getRandomInteger(min: number, max: number): number;
    /**
     * 快速排序
     * @param arrayA
     * @param compareFn
     * @returns {*}
     */
    function quickSort(array: any, compareFn: any): any;
    /**
     * 冒泡
     * @param arr
     * @param compareFn
     */
    function bubbleSort(arr: any, compareFn: any): any;
    /**
     * 将对象字符串化写到文件里(默认是覆盖)
     * sample: cs.writeDataToFile("tradeData.json", {key1: "value1", key2: "value2"} );
     */
    function writeJsonToFile(filePath: string, jsonData: JSON): void;
    function writeStringToFile(filePath: string, str: string): void;
    /**
     * @param filePath 要打开的文件名( 可包含路径 )
     * @param callFunc (jsonData, err) 打开文件返回的json数据
     */
    function readJsonFromFile(filePath: string, callFunc: any): void;
    function setItem(key: string, value: string): void;
    function getItem(key: string): string;
    function removeItem(key: string): void;
    /**
     * 生成一个唯一id 附带设备标志，时间戳
     */
    function genUUID(): string;
    /**
     * 注册change消息
     * @param selfObj
     * @param varName
     */
    function registerChangedSignal(selfObj: any, varName: any): void;
    /**
     * 添加消息监听
     */
    function addSignalListenner(selfObj: any, proName: any, callback: any): void;
    /**
     * 分发变更消息
     * @param selfObj
     * @param varName
     * @param value
     */
    function dispatchChangedSignal(selfObj: any, varName: any, value: any): void;
}
declare namespace cs {
    enum PrefabSrc {
        loginView = "prefabs/loginView",
        mainView = "prefabs/mainView",
    }
}
declare class Signal {
    _traceName: string;
    _listenersDic: object;
    _oneTimeListenersDic: object;
    _emitListenersArr: any;
    _numListeners: number;
    _numOneTimeListeners: number;
    _newIndex: number;
    constructor(traceName: string);
    isEmpty(): boolean;
    add(func: any, scope: any): any;
    addOnce(func: any, scope: any): any;
    emit(value: any): void;
    dispatch(value: any): void;
    remove(func: any, scope?: any): void;
    removeAll(): void;
    getListener(func: any, scope: any): {
        listener: any;
        isNew: boolean;
    };
    /**
     * 清除这个对象上面的所有Signal的事件绑定
     */
    static clearAllSignal(obj: object): void;
    static toArray(dic: any): any[];
    static getOne(listeners: any): any;
    static listenerSorter(a: any, b: any): number;
    static getKey(func: any, scope: any): any;
}
