/**
 * 客户端日志界面
 */
import Player from '../../../common/models/Player'
export default class LogModel  {
    //静态变量
    //private static instance:LogModel;
    private static logs;
    private static maxCollectNum:100

    _type:cs.LogTypes   //日志类型
    _time:Number             //log time

    //#网络请求相关
    //_urlKey:"",       //请求的接口urlKey
    _content:string;      //
    _requestArgs:object;
    _processLogs:Array<any>;

    constructor () 
    {
        this._requestArgs = {};
        this._processLogs = [];
        this._type = cs.LogTypes.REQUEST;

        let logs = LogModel.logs.push(this);
        //缓冲下 每超过50条删一次
        if(logs.length > (LogModel.maxCollectNum+50))
        {
            logs.splice(0, 50);
        }
    }

    /**
     * 生成日志文件
     */
    public static generateLogFile (){
        var logs = LogModel.logs;
        var len = logs.length;
        var strArray = [];
        for(var i = len  - 1; i >= 0; i--){
            strArray.push("--------------------------------------------------------------");
            var logInfo = logs[i];
            var requestArgs = logInfo.getRequestArgs();
            var processLogs = logInfo.getProcessLogs();
            if(processLogs[0]) strArray.push(processLogs[0] + JSON.stringify(requestArgs["sendData"]));
            if(processLogs[1]) strArray.push(processLogs[1]);
            if(processLogs[2]) strArray.push(processLogs[2]);
            if(processLogs[3]) strArray.push(processLogs[3]);
            strArray.push(logInfo.getContent() || "");
        }
        var str = strArray.join("\r\n");

        var fileName = Player.instance.nickName + "_" + cs.getCurSecs()+".txt";
        cs.writeStringToFile(fileName, str);
        return fileName;
    }

    get type () {
        return this._type;
    }

    set type (type) {
        this._type = type;
    }

    get requestArgs () {
        return this._requestArgs;
        }

    set requestArgs (urlKey) {
        this._requestArgs = urlKey;
    }

    get content () {
        return this._content;
    }

    set content (content) {
        this._time = cs.getCurSecs();
        this._content = content;
    }

    pushLog (logStr) {
        let timeStr;
        if(this._processLogs.length == 0){
            timeStr = cs.formatSecs(cs.getCurSecs());
        }else{
            timeStr = cs.formatSecs(cs.getCurSecs(), "HH:mm:ss");
        }
        this._processLogs.push(timeStr + " " +logStr);
    }

    get processLogs () {
        return this._processLogs;
    }
};

