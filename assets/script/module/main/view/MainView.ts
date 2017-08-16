
/**
 *  主界面 controller
 */
import Model from "../model/MainModel"
import UIManager from "../../../common/UIManager"
const {ccclass, property} = cc._decorator;
@ccclass
export default class MainView extends BaseView {
    @property({
        default: null,
        type:cc.Sprite
    })
    background: cc.Sprite;

    @property({
        default: null,
        type: cc.Label
    })
    label: cc.Label;

    @property({
            default: null,
            type: cc.Button
    })
    button:cc.Button

    print(){
        cc.log("MainView script");
    }

    addSignalListenners (){
        this._model.addSignalListenner("isShowFPS", function(isShowFPS){
            cc.log("1111signal isShowFPS:"+isShowFPS);
            this.label.string = "isShowFPS:"+isShowFPS;
        }.bind(this))

        this._model.addSignalListenner("isShowFPS", function(isShowFPS){
            cc.log("2222signal isShowFPS:"+isShowFPS);
            //this.label.string = "isShowFPS:"+isShowFPS;
        }.bind(this))
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
}