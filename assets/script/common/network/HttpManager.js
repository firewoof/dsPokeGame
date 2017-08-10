// /**
//  * Created by 玲英 on 2016/11/24.
//  */

// var HttpManager = HttpManager || {};


// var localUrl = {

//     //=======账号服务=======
//     acctLogin:"cis_acct/acct/login",
//     acctVCode:"cis_acct/acct/vcode",
//     acctHost:"cis_acct/acct/host"
// };

//     /**
//      * 找到对应key的value否则返回key
//      * @param {string} key
//      * @returns {*|String}
//      */
//  HttpManager.getUrl = function(key) {
//         var host = ServerAddr.getServerAddr(key);
        
//         var value = "http://" + host + "/" + localUrl[key];
//         return value != undefined ? value : key;
//     }


// // var CustomCryptico = {};
// // // RSA公钥加密
// // CustomCryptico.RSAEncrypt = function(plaintText){
// //     var modules = "00d0ab50b3bcd4bd44e3df493eef15baddef8fc0c5dfed5222882ee5108d75b66f7332695ab182231e9598a17e36148fccc2b3b7f231b906a8f95b355318f38019c7d2253d3eb80751836faa3ca12c4da1f66eade4999515e7723000464f4be061e6b0ae1c38abe2afc7278b17341590845945b95283a9839889a0cff6c5c7b1c5";
// //     var exponent="010001";
// //     var key = RSAUtils.getKeyPair(exponent, '', modules);
// //     cc.log("RSA加密前："+ plaintText);
// //     //cc.log("key："+ JSON.stringify(key));
// //     var encryptedBase64Str = RSAUtils.encryptedString(key, plaintText);

// //     return encryptedBase64Str;
// // }
// // // AES秘钥生成
// // CustomCryptico.generateAESKey = function(){
// //     var key = cs.NativeTool.generateAESKey();;
// //     cc.log("随机生成AESKey: "+ key);
// //     return key;
// // }

// // CustomCryptico.AESEncrypt = function(plaintText){
// //     if(HTTP_LOG_ENABLED) cc.log("加密前Str: "+ plaintText);
// //     var encryptedBase64Str = cs.NativeTool.AESEncryt(plaintText, DataPool.aesKey);
// //     return encryptedBase64Str;
// // }

// // CustomCryptico.AESDecrypt = function(encryptedBase64Str, aesKey){
// //     if(HTTP_LOG_ENABLED) cc.log("解密前Str: " + encryptedBase64Str);
// //     if(HTTP_LOG_ENABLED) cc.log("aesKey: " + aesKey);
// //     var decryptedStr = cs.NativeTool.AESDecryt(encryptedBase64Str, aesKey);
// //     if(HTTP_LOG_ENABLED) cc.log("解密后Str: " + decryptedStr); //
// //     return decryptedStr;
// // }

// // function reSetAccessToken ( acct ) { DataPool.accessToken = acct;
// //     cc.sys.localStorage.setItem("accessToken",acct);
// //     cc.log("刷新accessToken: " + acct);
// // }
// // function reSetAESKey ( key ) { DataPool.aesKey = key;
// //     cc.sys.localStorage.setItem("aesKey",key);
// //     cc.log("刷新AESKey: " + key);
// // }

// /**
//  * 交换秘钥
//  */
// function exchangeAesKey( _callBack, type )
// {
//     if(DataPool.aesKey == "" || DataPool.accessToken == ""){
//         cc.log("交换秘钥");
//         var aesKey = CustomCryptico.generateAESKey();
//         var req = {
//             auth: {ak: aesKey
//             }
//         }
//         if(type) req.auth.type = type;
//         var args = {
//             "urlKey":"keyExchange",
//             "sendData":req,
//             "successCallBack":function(data){
//                 reSetAccessToken(data.at);
//                 reSetAESKey(data.ak);

//                 _callBack();
//             },
//             "isAutoToken":false,
//             "encryptType":"RSA",
//             "tryCount": 3,
//             "showTips": true
//         };
//         HttpManager.sendRequest(args);
//     }
//     else{
//         _callBack();
//     }

// }

// /**
//  * 公共的 多余三个参数的 建议以 args拼装放进来
//  * @param argsOrUrlKey
//  * @param {Object} [sendData]
//  * @param [Function] [successCallBack]
//  var urlKey = args["urlKey"];
//  var sendData = args["sendData"];
//  var successCallBack = args["successCallBack"];
//  var errorCallBack = args["errorCallBack"];
//  var autoToken = args["autoToken"];
//  var encryptType = args["encryptType"];
//  var timeout = args["timeout"];
//  var timeoutCallBack = args["timeoutCallBack"];
//  */
// HttpManager.sendRequest = function(argsOrUrlKey, sendData, successCallBack, tryCount, showTips) {
//     var request = new HttpRequest();

//     if(typeof argsOrUrlKey != "string"){
//         request.setArgs(argsOrUrlKey);
//     }else{
//         var args =
//         {
//             "urlKey":argsOrUrlKey,
//             "sendData":sendData,
//             "successCallBack":successCallBack,
//             "tryCount":tryCount,
//             "showTips": showTips
//         };
//         request.setArgs(args);
//     }

//     request.send();
// };

// /**
//  * 获取request对象后, 自定义 最后send
//  */
// HttpManager.createRequest = function(argsOrUrlKey, sendData, successCallBack, tryCount, showTips) {
//     var request = new HttpRequest();

//     if(typeof argsOrUrlKey != "string"){
//         request.setArgs(argsOrUrlKey);
//     }else{
//         var args =
//         {
//             "urlKey":argsOrUrlKey,
//             "sendData":sendData,
//             "successCallBack":successCallBack,
//             "tryCount":tryCount,
//             "showTips": showTips
//         };
//         request.setArgs(args);
//     }

//     return request;
// };

// // Token刷新
// // function refreshToken(callBack)
// // {
// //     var timeStamp = cs._genCurSecs();
// //     var lastTimeStamp =  DataPool.doRefreshTokenTime || 0;
// //     cc.log("refreshToken", "begin", timeStamp, DataPool.doRefreshToken, DataPool.doRefreshTokenTime);
// //     if(DataPool.doRefreshToken && (timeStamp - lastTimeStamp) < 12)
// //     {
// //         if(callBack) {
// //             callBack();
// //         }
// //         cc.log("refreshToken", "return", timeStamp, DataPool.doRefreshToken, DataPool.doRefreshTokenTime);
// //         return;
// //     }

// //     cc.log("refreshToken", "request", timeStamp, DataPool.doRefreshToken, DataPool.doRefreshTokenTime);
// //     DataPool.doRefreshTokenTime = timeStamp;
// //     DataPool.doRefreshToken = true;

// //     var idFlag = Player.getInstance().getIdFlag();
// //     G_collectLog("刷新token, idflag: " + idFlag);
// //     var req = {
// //         auth: { idflag:idFlag }
// //     };
// //     var successCallBack = function(data){
// //         DataPool.doRefreshToken = undefined;
// //         DataPool.doRefreshTokenTime = undefined;

// //         G_collectLog("进入刷新token成功回调函数，新的token值：" + data.at);
// //         G_collectLog("旧的token值：" +  DataPool.accessToken);

// //         reSetAccessToken(data.at);
// //         if(callBack)
// //             callBack();
// //     };
// //     var args =
// //     {
// //         "urlKey":"refreshToken",
// //         "sendData":req,
// //         "successCallBack":successCallBack,
// //         "isAutoToken":false,
// //         "encryptType":"RSA",
// //         "timeout":"5",
// //         "tryCount":2
// //     };
// //     //cc.log("args: ", JSON.stringify(args));
// //     HttpManager.sendRequest(args);
// // }

// var MaxCollectNum = 100;
// function G_collectLog(content, tag)
// {
//     var timeStr = TimeHelper.formatSecs(cs.getCurSecs());
//     var str = timeStr + "  "+ (tag || "") + "  "+ content;

//     cc.log(str);

//     DataPool.logArr.unshift(str);
//     //缓冲下 每超过50条删一次
//     if(DataPool.logArr.length > (MaxCollectNum+50))
//     {
//         DataPool.logArr.splice(0, 50);
//     }
// }

// /**
//  * new Request，than you can customize the request
//  * @param argsOrUrlKey
//  * @param sendData
//  * @param successCallBack
//  * @returns {HttpXRequest}
//  */
// HttpManager.createRequest = function(argsOrUrlKey, sendData, successCallBack) {
//     var request = new HttpXRequest();

//     if(typeof argsOrUrlKey != "string"){
//         request.setArgs(argsOrUrlKey);
//     }else{
//         var args =
//         {
//             "urlKey":argsOrUrlKey,
//             "sendData":sendData,
//             "successCallBack":successCallBack
//         };
//         request.setArgs(args);
//     }
//     return request;
// };

// /**
//  * example...
//  * @param arg1 参数1--注释
//  * @param arg2 参数2--注释
//  * @param arg3 ......
//  */
// HttpManager.requestXXXXXX = function(arg1, arg2, arg3){
//     //参数对象 在里面组装
//     //.............
//     //.............
// };

// /**
//  * 保存用户姓名
//  * @param successCallBack
//  * @param realName
//  * @param phone
//  */
// HttpManager.requestSaveRealName = function(successCallBack, realName, phone){
//     var requestData = {
//         auth:{
//             "realName":realName,
//             "phone":phone
//         }
//     };
//     var urlKey = "saveRealName";
//     var tryCount = 3;
//     HttpManager.sendRequest(urlKey, requestData, successCallBack, tryCount);
// };