import SocketResponse from "./SocketResponse"
import SocketRequest from "./SocketRequest"
export class WebSocketManager{
    private static _instance:WebSocketManager

    _isWaitingConnect:boolean
    _socket:WebSocket
    
    public static get instance() : WebSocketManager { 
        if(!WebSocketManager._instance){
            WebSocketManager._instance = new WebSocketManager();
        }
        return WebSocketManager._instance;
    }

    constructor(){
        this._isWaitingConnect = false;
        
    }

    connect (url)
    {
        if(this.isWaitingConnect){
            return;
        }
        this._isWaitingConnect = true;
        let socket = this._socket = new WebSocket(url);
        socket.onopen = function(){
            cc.log("socet connect success");
            this._isWaitingConnect = false;
        }.bind(this)

        socket.onmessage = this.onMessage.bind(this)

        socket.onclose = this.onClose.bind(this)
    }

    onMessage(event){
        let resData = event.data;
        let type = resData["type"];
        let content = resData["data"];
        SocketResponse.instance.dispatchEvent(type, content)
    }

    onClose(){
        this._socket = null;
    }

    get isWaitingConnect()
    {
        return this._isWaitingConnect;
    }
}