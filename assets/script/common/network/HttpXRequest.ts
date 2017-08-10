// /**
//  * Created by 玲英 on 2016/11/28.
//  * 方便使用xMlHtpRequest的属性
//  */
// import LogModel from "../../module/log/model/LogModel"
// export default class HttpRequest{
//     _successCallBack;
//     _isAutoToken:true;
//     _encryptType:string       //"AES" or "RSA";
//     _sendData:object;
//     _url:string;
//     _reConnectTimes: 0;
//     _tryCount:1;
//     _showTips:false;
//     _args:object;
//     _logInfo:LogModel;
//     _request: XMLHttpRequest;
//     _tag;

//     _onreadystatechangeCallBack;
//     _onErrorCallBack;
//     _errorCallBack;
//     _onTimeoutCallBack;

//     constructor()
//     {
//         this._sendData = {};
//         this._args = {};
//         this._logInfo = new LogModel();
//         this._logInfo.type = cs.LogTypes.REQUEST;

//         this.initRequest();
//     }

//     initRequest ()
//     {
//         var request = this._request = new XMLHttpRequest();

//         //回调
//         request.onloadstart = this.onloadstart.bind(this);
//         request.ontimeout = this.ontimeout.bind(this);
//         request.onabort = this.onabort.bind(this);
//         request.onerror = this.onerror.bind(this);
//         request.onloadend = this.onloadend.bind(this);
//         request.onreadystatechange = this.onreadystatechange.bind(this);

//         //默认十秒超时
//         this.setTimeout(10);
//     }

//     setArgs(args)
//     {
//         var args = args || {};
//         this._args = args;

//         var urlKey = args["urlKey"];
//         var sendData = args["sendData"];
//         var isAutoToken = args["isAutoToken"];
//         var encryptType = args["encryptType"];
//         var timeout = args["timeout"];
//         var tryCount = args["tryCount"];
//         var showTips = args["showTips"];
        

//         var successCallBack = args["successCallBack"];
//         var errorCallBack = args["errorCallBack"];
//         var onSysErrorCallBack = args["onSysErrorCallBack"];
//         var onTimeoutCallBack = args["onTimeoutCallBack"];
//         var onreadystatechangeCallBack = args["onreadystatechangeCallBack"];
//         var onErrorCallBack = args["onErrorCallBack"];
//         //cc.log("args::", JSON.stringify(args));

//         if(urlKey != undefined) this.setUrlKey(urlKey);
//         if(tryCount != undefined) this.setTryCount(tryCount);
//         if(showTips != undefined) this.setShowTips(showTips);
//         if(sendData != undefined) this.setSendData(sendData);
//         if(isAutoToken != undefined) this.setAutoToken(isAutoToken);
//         if(encryptType != undefined) this.setEncryptType(encryptType);

//         if(successCallBack != undefined) this.setSuccessCallBack(successCallBack);
//         if(errorCallBack != undefined) this.setErrorCallBack(errorCallBack);

//         if(onErrorCallBack != undefined) this.setOnErrorCallBack(onErrorCallBack);
//         if(onTimeoutCallBack != undefined) this.setOnTimeoutCallBack(onTimeoutCallBack);
//         if(onreadystatechangeCallBack != undefined) this.setOnreadystatechangeCallBack(onreadystatechangeCallBack);
//         //if(onSysErrorCallBack != undefined) this.setOnSysErrorCallBack(onSysErrorCallBack);
//     }

//     getArgs (args)
//     {
//         return this._args || {};
//     }

//     setTimeout (secs)
//     {
//         if(secs > 0)
//         {
//             this._request.timeout = secs * 1000;
//         }
//     }

//     setUrl (url)
//     {
//         this._url = url;
//     }

//     getUrl (url ? : string) : string
//     {
//         return this._url;
//     }

//     setUrlKey (urlKey)
//     {
//         this._tag = "HttpRequest/Url: " + urlKey;
//         this.setUrl(HttpManager.getUrl(urlKey));
//         if(!this._args["urlKey"])
//             this._args["urlKey"] = urlKey;

//     }

//     setTryCount (tryCount)
//     {
//         this._tryCount = tryCount;
//         if(!this._args["tryCount"])
//             this._args["tryCount"] = tryCount;
//     }

//     setShowTips (showTips)
//     {
//         this._showTips = showTips;
//         if(!this._args["showTips"])
//             this._args["showTips"] = showTips;
//     }

//     send ()
//     {
//         //日志
//         this._logInfo.requestArgs = this._args;

//         var params = this.getParams();
//         //cc.log("params:: ", params);
//         if(this._isAutoToken && this._sendData && "" == this._sendData["acct"]) return;
//         this._request.open("POST", this.getUrl());
//         this._request.send(params);
//     }

//     setAutoToken (isAutoToken)
//     {
//         this._isAutoToken = isAutoToken == false ? isAutoToken : true;
//         if(!this._args["isAutoToken"])
//             this._args["isAutoToken"] = isAutoToken;
//     }

//     setEncryptType (encryptType)
//     {
//         if(!encryptType)
//             return;
//         this._encryptType = encryptType;
//         if(!this._args["encryptType"])
//             this._args["encryptType"] = encryptType;
//     }

//     setSendData (sendData)
//     {
//         this._sendData = sendData || {};
//         if(!this._args["sendData"])
//             this._args["sendData"] = sendData;
//     }

//     setSuccessCallBack (successCallBack)
//     {
//         if(!successCallBack)
//             return;
//         this._successCallBack = successCallBack;
//         if(!this._args["successCallBack"])
//             this._args["successCallBack"] = successCallBack;
//     }

//     setOnreadystatechangeCallBack (onreadystatechangeCallBack)
//     {
//         if(!onreadystatechangeCallBack)
//             return;
//         this._onreadystatechangeCallBack = onreadystatechangeCallBack;
//         if(!this._args["onreadystatechangeCallBack"])
//             this._args["onreadystatechangeCallBack"] = onreadystatechangeCallBack;
//     }

//     setErrorCallBack (errorCallBack)
//     {
//         if(!errorCallBack)
//             return;
//         this._errorCallBack = errorCallBack;
//         if(!this._args["errorCallBack"])
//             this._args["errorCallBack"] = errorCallBack;
//     }

//     setOnErrorCallBack (onErrorCallBack)
//     {
//         if(!onErrorCallBack)
//             return;
//         this._onErrorCallBack = onErrorCallBack;
//         if(!this._args["onErrorCallBack"])
//             this._args["onErrorCallBack"] = onErrorCallBack;
//     }

//     setOnTimeoutCallBack (onTimeoutCallBack)
//     {
//         if(!onTimeoutCallBack)
//             return;
//         this._onTimeoutCallBack = onTimeoutCallBack;
//         if(!this._args["onTimeoutCallBack"])
//             this._args["onTimeoutCallBack"] = onTimeoutCallBack;
//     }

//     /**
//      * 预备参数
//      */
//     getParams ()
//     {
//         //预备好参数
//         var paramsArray = [];
//         var sendData = this._sendData || {};
//         var encryptType = this._encryptType;
//         var isAutoToken = this._isAutoToken;

//         // 自动添加Token
//         // if(isAutoToken){
//         //     sendData["acct"] = DataPool.accessToken;
//         // }
//         //自动加uuid
//         sendData["uuid"] = cs.genUUID();

//         for (var key in sendData)
//         {
//             var val = sendData[key];
//             // if(val != null && typeof(val) == "object")
//             // {
//             //     val = JSON.stringify(val);
//             //     if(key == "auth"){
//             //         cc.log("加密类型: "+ encryptType);
//             //         if(encryptType == "AES") {
//             //             val = CustomCryptico.AESEncrypt(val);
//             //         }
//             //         else
//             //         {
//             //             cc.log("RSA 加密");
//             //             val = CustomCryptico.RSAEncrypt(val);
//             //             paramsArray.push("rauth"+ "=" +val);
//             //             continue;
//             //         }
//             //     }
//             // }
//             paramsArray.push(key+ "=" +val);
//         }
//         var params = paramsArray.join("&");

//         return params;
//     }

//     onloadstart ()
//     {
//         cc.log("xmlHttp.onloadstart");
//         G_collectLog("................start......................", this._tag);
//         G_collectLog("sendData: " + this._url + " "+ JSON.stringify(this._sendData), this._tag);
//         this._logInfo.pushLog(this._url);
//     }

//     ontimeout ()
//     {
//         var request = this._request;
//         cc.log("xmlHttp.timeout: " + request.timeout);
//         G_collectLog("xmlHttp.timeout: " + request.timeout, this._tag);

//         //testSeverLog(this._tag + ", timeout:"+request.timeout);
//         this._logInfo.pushLog("reConnectTimes:"+this._reConnectTimes+"  timeout" + request.timeout);

//         this.reConnect(this._onTimeoutCallBack);
//     }

//     onabort ()
//     {
//         cc.log("xmlHttp.onabort");
//         G_collectLog("xmlHttp.onabort", this._tag);
//         this._logInfo.pushLog("onabort....");
//     }

//     onerror ()
//     {
//         cc.log("xmlHttp.onerror");
//         G_collectLog("xmlHttp.onerror", this._tag);
//         //testSeverLog(this._tag + ", onerror....");
//         this._logInfo.pushLog("onerror....");

//         this.reConnect(this._onErrorCallBack);
//     }

//     onload ()
//     {
//         cc.log("xmlHttp...url::", this._url);
//         cc.log("xmlHttp.onload");
//     }

//     onloadend ()
//     {
//         cc.log("xmlHttp.onloadend:" + this._tag);
//         this._logInfo.pushLog("http onloadend....");
//     }

//     checkVersion (data){
//         //TODO
//     }

//     bigVersionUpdate (data)
//     {
//         //TODO
//     }

//     onreadystatechange ()
//     {
//         var request = this._request;
//         var tag = this._tag;
//         if(request.readyState == 4)
//         {
//             cc.log(request.statusText);
//             //G_collectLog("xmlHttp.statusText: "+request.statusText, tag);
//             //cc.log("request.status::",request.status);
//             if(request.status != 200){
//                 this._logInfo.pushLog("request status:"+request.status);
//                 //弹出日志上报
//                 this.caseFirsNON200(request.status)
//             }
//             switch (request.status) {
//                 case 200:
//                     this.case200Handler(request)
//                     break;
//                 case 404:
//                     if(this._errorCallBack) {
//                         this._errorCallBack();
//                     }
//                     ////testSeverLog(tag + ", case 404:...找不到页面.");
//                     break;
//                 case 500:
//                     //MainController.showAutoDisappearAlertByText("您的网络似乎不稳定...");
//                     //testSeverLog(tag + ", case 500:...服务器内部错误");
//                     break;
//                 case 504:
//                     if(this._onTimeoutCallBack) this._onTimeoutCallBack();
//                     //testSeverLog(tag + ", case 504: Gateway Time-out");
//                     break;
//                 case 502:
//                     //testSeverLog(tag + ", case 502");
//                     break;
//                 default:
//                     G_collectLog("请求完成但相应状态异常，状态码xmlHttp.status: " + request.status, tag);
//                     cc.log("请求完成但相应状态异常，状态码xmlHttp.status: " + request.status);
//                     break;
//             }
//         }
//     }

//     /**
//      * 第一次 非200的日志上报反馈界面（非主场景）
//      */
//     caseFirsNON200 (status){
//         // if(cc.director.getRunningScene() instanceof MainScene){
//         //     return;
//         // }
//     }

//     //正常返回处理
//     case200Handler (request){
//         //HttpXRequest.isFirstRequestSuccess = true;    //第一个成功的请求
//         if(this._onreadystatechangeCallBack){
//             this._onreadystatechangeCallBack(request.responseText);
//         }

//         if(request.responseText.length>0){
//             var info = JSON.parse(request.responseText);
//             //G_collectLog("info.status == " + info.status, tag);
//              cc.log("data::" + JSON.stringify(info));
//         }
//         else
//         {
//             cc.log("返回数据为空");
//             return;
//         }
//     }

//     reConnect (handler)
//     {
//         this._reConnectTimes += 1;
//         if(this._reConnectTimes < this._tryCount)
//         {
//             //Todo
//             this.initRequest();
//             this.send();
//         }
//         else
//         {
//             if (handler) {
//                 handler();
//             }
//             if (this._showTips) 
//             {
//                 MainController.getInstance().showNetworkConnectFailLayer("NET_NOT_AVAILABLE");
//             }
//         }
//     }

// }