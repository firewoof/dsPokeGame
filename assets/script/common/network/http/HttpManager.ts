/**
 * Created by 玲英 on 2016/11/24.
 */
import HttpRequest from "./HttpRequest"
export module HttpManager{

    export enum URLTypes{
        acctLogin = "cis_acct/acct/login",
        acctVCode = "cis_acct/acct/vcode",
        acctHost = "cis_acct/acct/host"
    }

   export function getUrl (key) {
        var host = this.getServerAddr(key);
        
        var value = "http://" + host + "/" + URLTypes[key];
        return value != undefined ? value : key;
    }

    export function createRequest (argsOrUrlKey, sendData, successCallBack, tryCount, showTips) {
        var request = new HttpRequest();
    
        if(typeof argsOrUrlKey != "string"){
            request.setArgs(argsOrUrlKey);
        }else{
            var args =
            {
                "urlKey":argsOrUrlKey,
                "sendData":sendData,
                "successCallBack":successCallBack,
                "tryCount":tryCount,
                "showTips": showTips
            };
            request.setArgs(args);
        }
    
        return request;
    }

    /**
     * 公共的 多余三个参数的 建议以 args拼装放进来
     * @param argsOrUrlKey
     * @param {Object} [sendData]
     * @param [Function] [successCallBack]
     var urlKey = args["urlKey"];
    var sendData = args["sendData"];
    var successCallBack = args["successCallBack"];
    var errorCallBack = args["errorCallBack"];
    var autoToken = args["autoToken"];
    var encryptType = args["encryptType"];
    var timeout = args["timeout"];
    var timeoutCallBack = args["timeoutCallBack"];
    */
    export function sendRequest (argsOrUrlKey, sendData, successCallBack, tryCount, showTips) {
        var request = new HttpRequest();

        if(typeof argsOrUrlKey != "string"){
            request.setArgs(argsOrUrlKey);
        }else{
            var args =
            {
                "urlKey":argsOrUrlKey,
                "sendData":sendData,
                "successCallBack":successCallBack,
                "tryCount":tryCount,
                "showTips": showTips
            };
            request.setArgs(args);
        }

        request.send();
    }
}


// var MaxCollectNum = 100;
// function G_collectLog(content, tag)
// {
//     var timeStr = cs.formatSecs(cs.getCurSecs());
//     var str = timeStr + "  "+ (tag || "") + "  "+ content;

//     cc.log(str);

//     LogModel.logArr.unshift(str);
//     //缓冲下 每超过50条删一次
//     if(DataPool.logArr.length > (MaxCollectNum+50))
//     {
//         DataPool.logArr.splice(0, 50);
//     }
// }