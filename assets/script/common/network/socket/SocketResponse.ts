enum ResponseTypes{
    LOGIN = "LOGIN"
}

/**
 * @type {string}
 * @data {json string}
 */
export default class SocketResponse{
    private static _instance:SocketResponse
    public handlers:object

    constructor(){

    }

    public static get instance() : SocketResponse { 
        if(!SocketResponse._instance){
            SocketResponse._instance = new SocketResponse();
        }
        return SocketResponse._instance;
    }

    /**
     * 分发
     */
    dispatchEvent = function(type, data) {
        var handler = this.handlers[type];
        if (handler) {
            handler(data, type);
        }
    }
};

SocketResponse.prototype.handlers = {};
/**
 * 登录认证成功
 */
SocketResponse.prototype.handlers[ResponseTypes.LOGIN] = function(data, type) {
    cc.log("认证成功::", JSON.stringify(data));
}

