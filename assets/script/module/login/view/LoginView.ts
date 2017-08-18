/**
 * login controller
 */
import Model from '../model/LoginModel'
import MainModule from '../../main/MainModule'
import PokerSheetOutLeft from "../../pokerBattle/view/PokerSheetOutLeft"
import SelfCardsView from "../../pokerBattle/view/SelfCardsView"

const {ccclass, property} = cc._decorator;
@ccclass
export default class LoginView extends BaseView{

    //界面名字,全屏遮盖标记
    public static readonly viewName = "LoginView"
    public static readonly isCovered = true;

    @property(cc.Sprite)
    background: cc.Sprite;

    @property(cc.Button)
    loginBtn:cc.Button;

    //

    onLoad () {
        this.loginBtn.node.on('click', this.clickCallback, this);
        //this.label.string = "测试label";

      let model = new Model();
      model.printGetSetter()

      //资源加载只能异步
      var srcPrefab = cs.PrefabSrc.pokerSheetOutLeft;
      cc.loader.loadRes(srcPrefab, cc.Prefab, function(err, prefab) {
        if (err) {
            console.error(err);
            return;
        }
        let pokerSheet =  cc.instantiate(prefab);
        this.node.addChild(pokerSheet);

        cc.log("instantiate prefab pokerSheet");
    }.bind(this))


    }

    addSignalListenners (){
        //TODO
    }

    clickCallback(event){
        //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 Button 组件
       let button = event.detail;
       //cc.director.preloadScene();
       cc.log("login。。。。。");
        cc.director.loadScene("mainScene")
        MainModule.getInstance().show()
    }
}