// var registerChangedSignal = function(selfObj, varName){
//     signalName = varName + "ChangedSignal";
//     selfObj._signalMap = selfObj._signalMap || {};
//     selfObj._signalMap[signalName] = new Signal((selfObj._className || "") + "-" + signalName);
//     cc.log("registerSignal", (selfObj._className || "") + "-" + signalName);
// }

// var addSignalListenner = function(selfObj, proName, callback){
//         let signal = selfObj._signalMap[proName + "ChangedSignal"];
//         if(signal){
//             signal.add(callback, selfObj);
//         }
// }

// var dispatchChangedSignal = function(selfObj, varName, value){
//     if(!selfObj._signalMap)
//         return;
//     let signalName = varName + "ChangedSignal";
//     let signal = selfObj._signalMap[signalName];
//     if(signal){
//         signal.dispatch(value)
//     }
// }

// var createSetterGetter = function(selfObj, varName, defaultValue, hasSignal, noSetter, noGetter){
//     cc.assert(selfObj != null, "selfObj is null");
//     var firstChar = varName.substring(0, 1);
//     var nameUpper = firstChar.toUpperCase() + varName.substring(1);
//     var nameLower = firstChar.toLowerCase() + varName.substring(1);
//     var propertyName = "_" + nameLower;
//     var signalName = null;
//     if(hasSignal) {
//         signalName = nameLower + "ChangedSignal";
//         selfObj[signalName] = new Signal((selfObj._className || "") + "-" + signalName);
//         cc.log("hasSignal", signalName, selfObj[signalName]);
//     }

//     //设置默认值
//     selfObj[propertyName] = defaultValue;

//     if(!noSetter){
//         //创建setter
//         selfObj["set" + nameUpper] = function(value) {
//             selfObj[propertyName] = value;
//             if(hasSignal) {
//                 selfObj[signalName].emit(value);
//             }
//         };
//     }

//     if(!noGetter){
//         selfObj["get" + nameUpper] = function(){
//             return selfObj[propertyName];
//         };
//     }
// };

// /**
//  * handler,封装域和函数对应，方便回调
//  */
// var handler = function(scope, method){
//     return function(){
//         //return method.call(scope,  [].slice.call(arguments));
//         var args = Array.prototype.slice.call(arguments);
//         return method.call(scope, arguments);
//     };
// };

// var ohandler = function(scope, method){
//     return function(){
//         //return method.call(scope,  [].slice.call(arguments));
//         var args = Array.prototype.slice.call(arguments);
//         return method.call(scope, args);
//     };
// };

// var isEmptyObject = function(obj){
//     for(k in obj){
//         if(obj[k])
//             return false;
//     }
//     return true;
// }