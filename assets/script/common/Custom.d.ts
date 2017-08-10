
/**
 * cs 自定义命名空间
 */
declare namespace cs {
    /**************** 常量区 scope ****************/
    //服务器时区（协调世界时）
    export const SERVER_UTC = 8; //东区符号+ 西区符号-

    //自定义通用配色
    export const GRAY;
    export const RED;
    export const GREEN;
    export const YELLOW;
    export const BLACK;
    /**************** 常量区 end ****************/


    /**************** 枚举区 scope ****************/
    //请尽量以types结尾，表示这是枚举
   export enum LogTypes {
        REQUEST = "Request",
        NORMAL = "Normal"
    }
    /**************** 枚举区 end ****************/

    //时间
    /**
     * 获得相对精确的当前时间(1970至今的毫秒数)
     */
    function getCurTime() : number

    function getCurSecs ():number

    /**
     * 获得Date类型的日期
     */
    function getDate (milliSecs:number) : Date


    /**
     * 服务器所在的时区与本地时区偏差
     */
    function getServerOffsetSecs () : number

    /**
     * 得到凌晨的时间戳（s）
     */
    function getZeroSecs (milliSecs:number) : number

    /**
     * 格式化时间戳，方便输出日期---note:效率比较低下 不适合大量用
     * @param {*|Number} [secs]
     * @param {String} [format] for example "yy:MM:dd HH:mm:ss"
    */
    function formatSecs (secs:number, format ? :string) : string

    /**
     * 填充数字补0，比如1 ~ 9 => 01 ~ 09
     * @param num   --to pad num
     * @param n     --填充后的位数
     */
    function padNumber (num:number, n:number) : string

    /**
     * 深拷贝--仅限于js原生对象
     * @param obj --被拷贝对象
     */
    function deepClone (obj:any) 

    /**
     * 浅拷贝对象
     * @param obj
     */
    function shallowClone (obj)

    /**
     * 取min~max浮点数
     * @param min
     * @param max
     * @returns {Number}
     */
    function getRandomFloat (min : number,max : number) 

    /**
     * 取min~max的随机整数
     * @param min
     * @param max
     * @returns {Number}
     */
    function getRandomInteger (min : number, max : number) 

    /**
     * 快速排序
     * @param arrayA
     * @param compareFn
     * @returns {*}
     */
    function quickSort (array,compareFn)

    /**
     * 冒泡
     * @param arr
     * @param compareFn
     */
    function bubbleSort (arr,compareFn) 

        /**
     * 将对象字符串化写到文件里(默认是覆盖)
     * sample: cs.writeDataToFile("tradeData.json", {key1: "value1", key2: "value2"} );
     */
    function writeJsonToFile (filePath : string, jsonData : JSON)

    function writeStringToFile (filePath : string, str : string)

    /**
     * @param filePath 要打开的文件名( 可包含路径 )
     * @param callFunc (jsonData, err) 打开文件返回的json数据
     */
    function readJsonFromFile (filePath : string, callFunc)

    /**
     * 获取本地存储值
     * @param key 
     */
    function getItem (key:string) : string

    /**
     * 移除 localStorage 指定 item
     * @param key 
     */
    function removeItem (key:string)

    /**
     * 生成一个唯一id 附带设备标志，时间戳
     */
    function genUUID () : string

    /**
     * 注册change消息
     * @param selfObj 
     * @param varName 
     */
    function registerChangedSignal (selfObj, varName)

    /**
     * 添加消息监听
     * @param selfObj 
     * @param proName 
     * @param callback 
     */
    function addSignalListenner (selfObj, proName, callback)

    /**
     * 分发变更消息
     * @param selfObj 
     * @param varName 
     * @param value 
     */
    function dispatchChangedSignal (selfObj, varName, value)
}
