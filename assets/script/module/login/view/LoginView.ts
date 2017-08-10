/**
 * 主场景 controller
 */
import MainModule from '../../main/MainModule'
const {ccclass, property} = cc._decorator;
@ccclass
export default class LoginView extends cc.Component{
    //界面名字,全屏遮盖标记
    public static readonly viewName = "LoginView"
    public static readonly isCovered = true;

    @property(cc.Sprite)
    background: cc.Sprite;

    @property(cc.Button)
    loginBtn:cc.Button

    //

    onLoad () {
        //this.label.string = "update label";
        //Common.a()

        //UI.fun();
        // let clickEventHandler()=>{

        // } ;
        this.loginBtn.node.on('click', this.clickCallback, this);
        //this.label.string = "测试label";
    }

    clickCallback(event){
        //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 Button 组件
       var button = event.detail;
       //cc.director.preloadScene();
       cc.log("login。。。。。");
        cc.director.loadScene("mainScene")
        MainModule.getInstance().show()
    }

    onStartGame () {

    }

    update() {
        //this.label.string = "测试label";
    }
}