/**
 * Created on 16-11-12.
 */
enum RequestTypes{    
    HEARTBEAT = "HEARTBEAT",            //心跳
    LOGIN = "LOGIN"                   //认证登录
}


/**
 * Request 模板
 */
export class Request{
	_type:RequestTypes
	_jsonData: object

    constructor(){
        this._jsonData = {};
    }

    get type () {
        return this._type;
    }

    set type (value) {
        this._type = value;
    }
    
    // set jsonData (jsonData) {
    //     this._jsonData = jsonData;
    // }
    
    appendData (props) {
        for(var key in props){
            this._jsonData[key] = props[key];
        }
    }
    
    toJson () {
        return JSON.stringify({action:this._type, data:this._jsonData})
    }
}


/**
 * SocketRequest
 */
export  default class  SocketRequest{
    private static _instance:SocketRequest

    constructor(){
        
    }

    public static get instance() : SocketRequest { 
        if(!SocketRequest._instance){
            SocketRequest._instance = new SocketRequest();
        }
        return SocketRequest._instance;
    }

    //心跳
    heartBeat () {
        var request = new Request();
        request._type = RequestTypes.HEARTBEAT;
    };
    
    /**
     * 发送请求
     * @param token
     */
    xxRequest (productId) {
        var request = new Request();
        request._type = RequestTypes.LOGIN;
        request._jsonData = {
            "pid":productId
        };
    };
}
