/**
 * 主场景 controller
 */
import MainController from "../controller/MainController"
import MainModel from "../model/MainModel"
import UIManager from "../../../common/UIManager"

const {ccclass, property} = cc._decorator;
@ccclass
export default class MainView extends cc.Component{
    private _controller:MainController
    private _model:MainModel

    @property(cc.Sprite)
    background: cc.Sprite;

    @property(cc.Label)
    label: cc.Label;

    @property({
            default: null,
            type: cc.Button
    })
    button:cc.Button

    print(){
        cc.log("MainView script");
    }

    public set controller(controlller){ 
        this._controller = controlller 
    }

    set model (model:MainModel){
        this._model = model;
        model.addSignalListenner("isShowFPS", function(isShowFPS){
            cc.log("signal isShowFPS:"+isShowFPS);
            this.label.string = "isShowFPS:"+isShowFPS;
        }.bind(this))
    }

    onDestroy(){
        //this._model.clearAllSignal(this);
    }

    onLoad () {
        //监听


        this.label.string = "update label";
        //Common.a()

        //UI.fun();
        // let clickEventHandler()=>{

        // } ;
        this.button.node.on('click', this.clickCallback, this);
        //this.label.string = "测试label";
    }

    clickCallback(event){
        //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 Button 组件
       var button = event.detail;
       this._model.isShowFPS = !this._model.isShowFPS;
    }

    onStartGame () {

    }

    update() {
        //this.label.string = "测试label";
    }
}